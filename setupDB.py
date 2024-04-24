import mysql.connector as ms

try:
    mydb = ms.connect(
        host = "127.0.0.1",
        user = "root",
        password = "Admin1234",
        database = "db_proj4710",
    )
    if mydb.is_connected():
        print("Sucess!")
    
except ms.Error as e:
    print("Error", e)


    
