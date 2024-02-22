from flask import Flask, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/api/test',methods=['GET'])
def get_data():
    data = {'message': 'This is a test message from the server!'}
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
