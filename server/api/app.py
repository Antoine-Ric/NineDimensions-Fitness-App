import datetime
from flask import Flask, jsonify, request, session, make_response
from flask_mysqldb import MySQL
from bcrypt import hashpw, gensalt, checkpw
from flask_cors import CORS
import os
from dotenv import load_dotenv
import time
import random
import string
load_dotenv()


app = Flask(__name__)
CORS(app)

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


@app.route('/api/test', methods=['GET'])
def get_data():
    data = {'message': 'This is a test message from the server!'}
    return jsonify(data)


@app.route('/api/account/login', methods=['POST'])
def login():
    try:
        conn = mysql.connection
        member = request.get_json()
        Email, password,isCoach = member.get("Email"), member.get("Password"),member.get("isCoach")
        cursor = conn.cursor()
        if isCoach == 1:
            table_name = "Coach"
        elif isCoach == 0:
            table_name = "Member"
        cursor.execute(
            f"SELECT * FROM {table_name} WHERE Email = %s", (Email,))
        verifiedUser = cursor.fetchone()
    except Exception as e:
        conn.rollback()
        return jsonify({'status_code': 500, 'message': f'Error: {str(e)}'}), 500

    if verifiedUser is None:
        return jsonify({'status_code': 404, 'message': 'User not found'}), 404

    verifiedPassword = verifiedUser.get("Password")
    verifiedName = verifiedUser.get("FullName").split(' ')[0]
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
            "SELECT FullName, Email,Gender,DateOfBirth, Height,Weight FROM Member WHERE ID = %s", (USERID,))
        user_info = cursor.fetchone()

        if user_info:
            dob = user_info['DateOfBirth']
            today = datetime.date.today()

            # Calculate age
            age = today.year - dob.year - \
                ((today.month, today.day) < (dob.month, dob.day))

            # Splitting FullName into Firstname and Lastname
            names = user_info['FullName'].split(' ')
            firstname = names[0]
            # Handling cases where there might be no lastname
            lastname = names[1] if len(names) > 1 else ''

            # Preparing response
            return jsonify({
                'status_code': 200,
                'user': {
                    'Firstname': firstname,
                    'Lastname': lastname,
                    'Email': user_info['Email'],
                    'Gender': user_info['Gender'],
                    'Age': age,
                    'Height': user_info['Height'],
                    'Weight': user_info['Weight'],
                    'message': 'User info retrieved successfully'}
            }), 200
        else:
            return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        conn.rollback()
        print("my exception",e)
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
        fullname = new_member.get("fullname")
        userName = new_member.get("userName")
        selectedGoals = new_member.get("selectedGoals")
        selectedActivityLevel = new_member.get("selectedActivityLevel")
        gender = new_member.get("setGender")
        birthDate = new_member.get("birthDate")
        weight = new_member.get("weight")
        height = new_member.get("height")
        goalWeight = new_member.get("goalWeight")

        if gender == "Male":
            gender = 'M'
        elif gender == "Female":
            gender = 'F'

        # Generate a unique ID for the new member
        new_member_id = generate_unique_id()
        print("unique id: ", new_member_id)

        # Check if the email already exists in the database
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Member WHERE Email = %s", (email,))
        existing_user = cursor.fetchone()

        if existing_user:
            return jsonify({'status_code': 409, 'message': 'Email already exists'}), 409

        # If email is not already in use, proceed with registration
        hashed_password = hashpw(password.encode('utf-8'), gensalt())

        cursor.execute("INSERT INTO Member (ID, FullName, Email, Password, UserName, SelectedGoals, SelectedActivityLevel, Gender, DateOfBirth, Weight, Height, GoalWeight) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                       (new_member_id, fullname, email, hashed_password, userName, selectedGoals, selectedActivityLevel, gender, birthDate, weight, height, goalWeight))
        conn.commit()
    except Exception as e:
        conn.rollback()
        return jsonify({'status_code': 500, 'message': f'Error: {str(e)}'}), 500

    session['ID'] = new_member_id
    session['Email'] = email
    return jsonify({'status_code': 201, 'message': 'User registered successfully', 'ID': new_member_id}), 201


@app.route('/api/coach/signup', methods=['POST'])
def coach_signup():
    try:
        conn = mysql.connection
        coach_data = request.get_json()

        # Extracting values from the JSON payload
        full_name = coach_data.get("fullName")
        agender = coach_data.get("gender") 
        activity_level = coach_data.get("activityLevel")
        birth_date = coach_data.get("birthDate")
        email = coach_data.get("email")
        password = coach_data.get("password")
        gender = ""

        if agender == "Male":
            gender = 'M'
        elif agender == "Female":
            gender = 'F'



        # Generate a unique ID for the new coach
        new_coach_id = generate_unique_id()
        print("unique id: ", new_coach_id)

        # Check if the email already exists in the database
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Coach WHERE Email = %s", (email,))
        existing_coach = cursor.fetchone()

        if existing_coach:
            return jsonify({'status_code': 409, 'message': 'Email already exists'}), 409

        # If email is not already in use, proceed with registration
        hashed_password = hashpw(password.encode('utf-8'), gensalt())
        print("hashed pass", hashed_password)

        # Determine the ID based on the activity level
        if activity_level == 1:
            cursor.execute("INSERT INTO loseWeight(CoachID) VALUES (%s)", (new_coach_id,))
        elif activity_level == 2:
            cursor.execute("INSERT INTO gainWeight(CoachID) VALUES (%s)", (new_coach_id,))
        elif activity_level == 3:
            cursor.execute("INSERT INTO gainMuscle(CoachID) VALUES (%s)", (new_coach_id,))
        elif activity_level == 4:
            cursor.execute("INSERT INTO manageStress(CoachID) VALUES (%s)", (new_coach_id,))
        else:
            return jsonify({'status_code': 400, 'message': 'Invalid activity level'}), 400

        cursor.execute("INSERT INTO Coach (ID, FullName, Gender, activityLevel, DateOfBirth, Email, Password) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                       (new_coach_id, full_name, gender, activity_level, birth_date, email, hashed_password))
        conn.commit()
    except Exception as e:
        conn.rollback()
        print("exception: ", e)
        return jsonify({'status_code': 500, 'message': f'Error: {str(e)}'}), 500
    session['ID'] = new_coach_id
    session['Email'] = email
    return jsonify({'status_code': 201, 'message': 'Coach registered successfully', 'ID': new_coach_id}), 201


def generate_unique_id():
    timestamp = int(time.time() * 1000)
    random_number = random.randint(0, 9999) 
    unique_id = f'{timestamp}-{random_number:04}' 
    random_chars = ''.join(random.choices(string.ascii_letters + string.digits, k=15))
    unique_id = f'{timestamp}-{random_chars}'[:15]
    return unique_id


@app.route('/api/coach/<coachID>/trainees', methods=['GET'])
def getTrainees(coachID):
    if 'ID' not in session or session['ID'] != coachID:
        return jsonify({'message': 'User not authenticated or incorrect user ID'}), 401

    conn = mysql.connection
    cursor = conn.cursor()

    try:
        # Execute the SQL query to fetch trainees under this coach
        cursor.execute(
            "SELECT FullName, Email, DateOfBirth FROM Member WHERE CoachID = %s", (coachID,))
        trainees = cursor.fetchall()

        # If there are no trainees found, return a 404
        if not trainees:
            return jsonify({'message': 'No trainees found'}), 404

        # Convert fetched data into a list of dictionaries to send as JSON
        trainees_list = []
        for trainee in trainees:
            dob = trainee['DateOfBirth']
            today = datetime.date.today()
            age = today.year - dob.year - \
                ((today.month, today.day) < (dob.month, dob.day))

            trainees_list.append({
                'Fullname': trainee['FullName'],
                'Email': trainee['Email'],
                'Age': age
            })
            print("trauinines: ",trainees_list)
        return jsonify(trainees_list), 200
    except Exception as e:
        # Rollback in case of exception
        conn.rollback()
        return jsonify({'status_code': 500, 'message': f'Error fetching trainees: {str(e)}'}), 500

if __name__ == "__main__":
    app.run(debug=True)
