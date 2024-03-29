from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from bcrypt import checkpw
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'ADDYOUROWNPASSWORD'
app.config['MYSQL_DB'] = 'ADDDATABASENAME'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)


@app.route('/api/test', methods=['GET'])
def get_data():
    data = {'message': 'This is a test message from the server!'}
    return jsonify(data)

# This is just a test until we setup the database, going to change the raw sql to use the ORM later
@app.route('/api/account/login', methods=['POST'])
def login():
    try:
        conn = mysql.connection
        user = request.get_json()
        Email, password = user.get("Email"), user.get("Password")
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Users WHERE Email = %s", (Email,))
        verifiedUser = cursor.fetchone()
    except Exception as e:
        conn.rollback()
        return jsonify({'success': False, 'message': f'Error: {str(e)}'}), 500

    if verifiedUser is None:
        return jsonify({'success': False, 'message': 'User not found'}), 404

    verifiedPassword = verifiedUser.get("Password")
    verifiedEmail = verifiedUser.get("Email")

    if verifiedPassword == password:
        return jsonify({
            'success': True,
            'username': verifiedEmail,
            'message': 'Login Successfull'
        }), 200
    else:
        return jsonify({
            'success': False,
            'message': 'Invalid Credentials'
        }), 401




if __name__ == '__main__':
    app.run(debug=True)