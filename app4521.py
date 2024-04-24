import requests
import mysql.connector as ms

'''coach assigns workouts to clients
workouts saved to db
clients see what workouts assigned to them'''
mydb45 = ms.connect(
        host = "127.0.0.1",
        user = "root",
        password = "Admin1234",
        database = "db_proj4710",
    )
mycur=mydb45.cursor()

types = 'cardio'
api_url = 'https://api.api-ninjas.com/v1/exercises?type={}'.format(types)

response = requests.get(api_url, headers={'X-Api-Key': 'TY3SQ0ut2XkUDB6RzXQfWA==ZKGr3kCA9EYvDJIx'}).json()
#if response.status_code == requests.codes.ok:
j=0
for i in response:
    ex=response[j]['name']
    print(response[j]['name'])
    mycur.execute("insert into Exercise(eName, type) values (%s, %s)", (ex, types))
    j+=1

#user uses findEx table
#coach usses assign table
'''else:
    print("Error:", response.status_code, response.text)'''




#ideas of distributed: messaging between coach and client, 
#track from diff devices watch, phone, etc.