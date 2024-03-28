import mysql.connector as ms

try:
    connection = ms.connect(
        host = "127.0.0.1",
        user = "root",
        password = "Admin1234",
        database = "db_proj4710",
    )
    if connection.is_connected():
        print("Sucess!")
    
except _mysql_connector.Error as e:
    print("Error", e)


    
