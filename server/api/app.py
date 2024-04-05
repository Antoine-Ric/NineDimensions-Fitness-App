from flask import Flask, jsonify, request, session, make_response
from flask_mysqldb import MySQL
from bcrypt import hashpw, gensalt, checkpw
from flask_cors import CORS
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)
load_dotenv()

app.secret_key = os.getenv('APP_SECRET_KEY')
HOSTNAME = os.getenv('MYSQL_HOST')
HOST_USERNAME = os.getenv('MYSQL_USER')
HOST_PASSWORD = os.getenv('MYSQL_PASSWORD')
HOST_DATABASE = os.getenv('MYSQL_DB')
CURSOR_CLASS = os.getenv('MYSQL_CURSORCLASS')

app.config['MYSQL_HOST'] = HOSTNAME
app.config['MYSQL_USER'] = HOST_USERNAME
app.config['MYSQL_PASSWORD'] = HOST_PASSWORD
app.config['MYSQL_DB'] = HOST_DATABASE
app.config['MYSQL_CURSORCLASS'] = CURSOR_CLASS

mysql = MySQL(app)
app = Flask(__name__)

@app.route('/api/test', methods=['GET'])
def get_data():
    data = {'message': 'This is a test message from the server!'}
    return jsonify(data)

@app.route('/api/account/login', methods=['POST'])
def login():
    try:
        conn = mysql.connection
        member = request.get_json()
        Email, password = member.get("Email"), member.get("Password")
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Member WHERE Email = %s", (Email,))
        verifiedUser = cursor.fetchone()
    except Exception as e:
        conn.rollback()
        return jsonify({'status_code': 500, 'message': f'Error: {str(e)}'}), 500

    if verifiedUser is None:
        return jsonify({'status_code': 404, 'message': 'User not found'}), 404

    verifiedPassword = verifiedUser.get("Password")
    verifiedName = verifiedUser.get("Firstname")
    verifiedID = verifiedUser.get("ID")
    verifiedEmail = verifiedUser.get("Email")

    if verifiedPassword == password:
        session['ID'] = verifiedID
        session['Email'] = verifiedEmail
        return jsonify({
            'status_code': 200,
            'FirstName': verifiedName,
            'message': 'Login Successful',
            'ID': verifiedID
        }), 200
    else:
        return jsonify({
            'status_code': 401,
            'message': 'Invalid Credentials'
        }), 401


@app.route('/api/account/logout', methods=['GET'])
def logout():
    session.pop('ID', None)
    session.pop('Email', None)
    return jsonify({'status_code': 200, 'message': 'Logout Successful'}), 200


@app.route('/api/account/check-auth', methods=['GET'])
def is_authenticated():
    if 'ID' in session:
        return jsonify({'isAuthenticated': True, 'user': session['ID'], 'email': session['Email']})
    else:
        return jsonify({'isAuthenticated': False}), 401


@app.route('/api/account/info/<USERID>', methods=['GET'])
def getInfo(USERID):
    if 'ID' not in session or session['ID'] != USERID:
        return jsonify({'message': 'User not authenticated or incorrect user ID'}), 401

    conn = mysql.connection
    cursor = conn.cursor()

    try:
        cursor.execute(
            "SELECT Firstname, Lastname, Email, ID FROM Member WHERE ID = %s", (USERID,))
        user_info = cursor.fetchone()

        if user_info:
            return jsonify({
                'status_code': 200,
                'user': {
                    'ID': user_info['ID'],
                    'Firstname': user_info['Firstname'],
                    'Lastname': user_info['Lastname'],
                    'Email': user_info['Email']
                },
                'message': 'User info retrieved successfully'
            }), 200
        else:
            return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        conn.rollback()
        return jsonify({'message': f'Error: {str(e)}'}), 500
    finally:
        cursor.close()

@app.route('/api/account/signup', methods=['POST'])
def signup():
    try:
        conn = mysql.connection
        new_member = request.get_json()
        
        # Extracting values from the JSON payload
        email = new_member.get("email")
        password = new_member.get("password")
        firstname = new_member.get("firstname")
        lastname = new_member.get("lastname")
        userName = new_member.get("userName")
        selectedGoals = new_member.get("selectedGoals")
        selectedActivityLevel = new_member.get("selectedActivityLevel")
        selectedSex = new_member.get("selectedSex")
        birthDate = new_member.get("birthDate")
        weight = new_member.get("weight")
        height = new_member.get("height")
        goalWeight = new_member.get("goalWeight")

        # Check if the email already exists in the database
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Member WHERE Email = %s", (email,))
        existing_user = cursor.fetchone()

        if existing_user:
            return jsonify({'status_code': 409, 'message': 'Email already exists'}), 409

        # If email is not already in use, proceed with registration
        hashed_password = hashpw(password.encode('utf-8'), gensalt())

        cursor.execute("INSERT INTO Member (Firstname, Lastname, Email, Password, UserName, SelectedGoals, SelectedActivityLevel, SelectedSex, BirthDate, Weight, Height, GoalWeight) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                       (firstname, lastname, email, hashed_password, userName, selectedGoals, selectedActivityLevel, selectedSex, birthDate, weight, height, goalWeight))
        conn.commit()
        new_member_id = cursor.lastrowid
    except Exception as e:
        conn.rollback()
        return jsonify({'status_code': 500, 'message': f'Error: {str(e)}'}), 500

    return jsonify({'status_code': 201, 'message': 'User registered successfully', 'ID': new_member_id}), 201

if __name__ == "__main__":
    app.run(debug=True)
