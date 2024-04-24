import datetime
import pdb
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
        Email, password, isCoach = member.get(
            "Email"), member.get("Password"), member.get("isCoach")
        cursor = conn.cursor()
        table_name = "Coach" if isCoach else "Member"
        cursor.execute(
            "SELECT * FROM {} WHERE Email = %s".format(table_name), (Email,))
        verifiedUser = cursor.fetchone()
        if verifiedUser is None:
            return jsonify({'status_code': 404, 'message': 'User not found'}), 404

        hashed_password_from_db = verifiedUser.get("Password").encode('utf-8')
        if checkpw(password.encode('utf-8'), hashed_password_from_db):
            verifiedName = verifiedUser.get("FullName").split(' ')[0]
            verifiedID = verifiedUser.get("ID")
            verifiedEmail = verifiedUser.get("Email")
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
    except Exception as e:
        conn.rollback()
        print("my exception", e)
        return jsonify({'status_code': 500, 'message': f'Error: {str(e)}'}), 500


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
            formatd = f"{dob.day}/{dob.month}/{dob.year}"

            age = today.year - dob.year - \
                ((today.month, today.day) < (dob.month, dob.day))

            names = user_info['FullName'].split(' ')
            firstname = names[0]
            lastname = names[1] if len(names) > 1 else ''

            return jsonify({
                'status_code': 200,
                'user': {
                    'Firstname': firstname,
                    'Lastname': lastname,
                    'Email': user_info['Email'],
                    'Gender': user_info['Gender'],
                    'Age': age,
                    'birthday': formatd,
                    'Height': user_info['Height'],
                    'Weight': user_info['Weight'],
                    'message': 'User info retrieved successfully'}
            }), 200
        else:
            return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        conn.rollback()
        print("my exception", e)
        return jsonify({'message': f'Error: {str(e)}'}), 500
    finally:
        cursor.close()


@app.route('/api/account/signup', methods=['POST'])
def signup():
    try:
        new_member = request.get_json()
        email = new_member.get("email")
        password = new_member.get("password")
        fullname = new_member.get("fullName")
        goalname = new_member.get("selectedGoals")[0]
        gender = new_member.get("gender")
        birthDate = new_member.get("birthDate")
        weight = float(new_member.get("weight"))
        height = float(new_member.get("height"))
        goalWeight = float(new_member.get("goalWeight"))

        gender = 'M' if gender == "Male" else 'F'
        new_member_id = generate_unique_id()

        conn = mysql.connection
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Member WHERE Email = %s", (email,))
        if cursor.fetchone():
            return jsonify({'status_code': 409, 'message': 'Email already exists'}), 409

        hashed_password = hashpw(password.encode('utf-8'), gensalt())
        goal_mapping = {
            "Lose Weight": ("loseWeight", 1),
            "Gain Weight": ("gainWeight", 2),
            "Gain Muscle": ("gainMuscle", 3),
            "Manage Stress": ("manageStress", 4),
        }

        goal_table, goalnum = goal_mapping[goalname]

        cursor.execute(
            "SELECT ID FROM Coach WHERE activityLevel = %s", (str(goalnum),))
        available_coaches = cursor.fetchall()

        if not available_coaches:
            conn.rollback()

            return jsonify({'status_code': 404, 'message': 'No available coach for this goal'}), 404
        pdb.set_trace() 
        print("coach id: ")
        coach_id = random.choice(available_coaches)['ID']

        cursor.execute("INSERT INTO Member (ID, FullName, Gender, DateOfBirth, Height, Weight, GoalWeight, Email, Password, CoachID) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                       (new_member_id, fullname, gender, birthDate, height, weight, goalWeight, email, hashed_password, coach_id))

        cursor.execute("INSERT INTO {} (MemberID, CoachID) VALUES (%s, %s)".format(goal_table), (new_member_id, coach_id))

        conn.commit()
    except Exception as e:
        conn.rollback()
        print("my exception:  ", e)
        return jsonify({'status_code': 500, 'message': str(e)}), 500
    session['ID'] = new_member_id
    session['Email'] = email
    return jsonify({'status_code': 201, 'message': 'User registered successfully', 'ID': new_member_id}), 201


@app.route('/api/coach/signup', methods=['POST'])
def coach_signup():
    try:
        conn = mysql.connection
        coach_data = request.get_json()

        full_name = coach_data.get("fullName")
        gender = coach_data.get("gender")[0]
        activity_level = coach_data.get("activityLevel")
        birth_date = coach_data.get("birthDate")
        email = coach_data.get("email")
        password = coach_data.get("password")

        new_coach_id = generate_unique_id()
        print("unique id: ", new_coach_id)

        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Coach WHERE Email = %s", (email,))
        existing_coach = cursor.fetchone()

        if existing_coach:
            return jsonify({'status_code': 409, 'message': 'Email already exists'}), 409

        hashed_password = hashpw(password.encode('utf-8'), gensalt())
        print("hashed pass", hashed_password)

        if activity_level == 1:
            cursor.execute(
                "INSERT INTO loseWeight(CoachID) VALUES (%s)", (new_coach_id,))
        elif activity_level == 2:
            cursor.execute(
                "INSERT INTO gainWeight(CoachID) VALUES (%s)", (new_coach_id,))
        elif activity_level == 3:
            cursor.execute(
                "INSERT INTO gainMuscle(CoachID) VALUES (%s)", (new_coach_id,))
        elif activity_level == 4:
            cursor.execute(
                "INSERT INTO manageStress(CoachID) VALUES (%s)", (new_coach_id,))
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


@app.route('/api/coaches/names', methods=['GET'])
def get_coach_names():
    try:
        conn = mysql.connection
        cursor = conn.cursor()
        cursor.execute("SELECT FullName FROM Coach")
        result = cursor.fetchall()

        return jsonify(result), 200
    except Exception as e:
        print("Exception:", e)
        return jsonify({'message': 'Error retrieving coach names', 'error': str(e)}), 500


def generate_unique_id():
    timestamp = int(time.time() * 1000)
    random_number = random.randint(0, 9999)
    unique_id = f'{timestamp}-{random_number:04}'
    random_chars = ''.join(random.choices(
        string.ascii_letters + string.digits, k=15))
    unique_id = f'{timestamp}-{random_chars}'[:15]
    return unique_id


@app.route('/api/coach/<coachID>/trainees', methods=['GET'])
def getTrainees(coachID):
    if 'ID' not in session or session['ID'] != coachID:
        return jsonify({'message': 'User not authenticated or incorrect user ID'}), 401

    conn = mysql.connection
    cursor = conn.cursor()

    try:
        cursor.execute(
            "SELECT FullName, Email, DateOfBirth FROM Member WHERE CoachID = %s", (coachID,))
        trainees = cursor.fetchall()

        if not trainees:
            return jsonify({'message': 'No trainees found'}), 404

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
            print("trauinines: ", trainees_list)
        return jsonify(trainees_list), 200
    except Exception as e:
        conn.rollback()
        return jsonify({'status_code': 500, 'message': f'Error fetching trainees: {str(e)}'}), 500


@app.route('/api/exercises', methods=['GET'])
def get_exercises():
    try:
        conn = mysql.connection
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Exercises")
        exercises = cursor.fetchall()
        return jsonify(exercises), 200
    except Exception as e:
        return jsonify({'status_code': 500, 'message': f'Error fetching exercises: {str(e)}'}), 500
    finally:
        cursor.close()


@app.route('/api/foods', methods=['GET'])
def get_foods():
    try:
        conn = mysql.connection
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM FoodItems")
        foods = cursor.fetchall()
        return jsonify(foods), 200
    except Exception as e:
        return jsonify({'status_code': 500, 'message': f'Error fetching foods: {str(e)}'}), 500
    finally:
        cursor.close()


if __name__ == "__main__":
    app.run(debug=True)
