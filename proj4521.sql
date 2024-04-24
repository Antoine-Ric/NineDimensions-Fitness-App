create database fitnessapp;
use fitnessapp;

create table loseWeight(
MemberID varchar(15),
CoachID varchar(15)
); 
create table gainWeight(
MemberID varchar(15),
CoachID varchar(15)
); 
create table gainMuscle(
MemberID char(15),
CoachID char(15)
);
create table manageStress(
CoachID varchar(15),
MemberID varchar(15)
); 
create table Coach(
ID varchar(15) PRIMARY KEY,
FullName varchar(100) NOT NULL,
Email varchar(255) UNIQUE NOT NULL,
Password varchar(100) NOT NULL,
DateOfBirth DATE,
Gender char(1),
activityLevel integer
);

create table Member(
ID varchar(15) PRIMARY KEY,
FullName varchar(100) NOT NULL,
Activity integer,
Gender char(1),
DateOfBirth DATE,
Height float,
Weight float,
GoalWeight float,
Email varchar(255) UNIQUE NOT NULL,
Password varchar(255) NOT NULL,
CoachID char(15),
FOREIGN KEY (CoachID) REFERENCES Coach(ID)
);


CREATE TABLE FoodItems (
    FoodID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100),
    Calories INT
);
INSERT INTO FoodItems (Name, Calories) VALUES
('Oatmeal with Honey', 215),
('Greek Yogurt with Berries', 190),
('Scrambled Eggs and Toast', 350),
('Pancakes with Maple Syrup', 400),
('Avocado Toast', 250),
('Grilled Chicken Salad', 350),
('Turkey and Cheese Sandwich', 400),
('Vegetable Stir Fry', 300),
('Tomato Soup with a Roll', 280),
('Fish Tacos', 450),
('Spaghetti with Meat Sauce', 500),
('Grilled Salmon with Vegetables', 470),
('Beef Stir Fry', 550),
('Chicken Parmesan', 600),
('Vegetable Pizza', 400);

CREATE TABLE Breakfast (
    memberID VARCHAR(15) PRIMARY KEY,
    FoodID INT,
    FOREIGN KEY (FoodID) REFERENCES FoodItems(FoodID)
);

CREATE TABLE Lunch (
    memberID VARCHAR(15) PRIMARY KEY,
    FoodID INT,
    FOREIGN KEY (FoodID) REFERENCES FoodItems(FoodID)
);

CREATE TABLE Dinner (
    memberID VARCHAR(15) PRIMARY KEY,
    FoodID INT,
    FOREIGN KEY (FoodID) REFERENCES FoodItems(FoodID)
);

CREATE TABLE Exercises (
    ExerciseID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    Category VARCHAR(50),
    DurationMinutes INT,
    CaloriesBurned INT,
    Description TEXT
);

CREATE TABLE MemberExercises (
    MemberExerciseID INT AUTO_INCREMENT PRIMARY KEY,
    MemberID VARCHAR(15),
    ExerciseID INT,
    Date DATE,
    FOREIGN KEY (MemberID) REFERENCES Member(ID),
    FOREIGN KEY (ExerciseID) REFERENCES Exercises(ExerciseID)
);

INSERT INTO Exercises (Name, Category, DurationMinutes, CaloriesBurned, Description) 
VALUES 
('Running', 'Cardio', 30, 300, 'Run at a moderate pace for 30 minutes.'),
('Cycling', 'Cardio', 45, 400, 'Bike ride for 45 minutes at a steady pace.'),
('Weightlifting', 'Strength Training', 60, 200, 'Perform weightlifting exercises for 60 minutes.'),
('Yoga', 'Flexibility', 60, 150, 'Practice yoga poses and stretches for 60 minutes.'),
('Swimming', 'Cardio', 45, 500, 'Swim laps for 45 minutes at a moderate intensity.'),
('Jump Rope', 'Cardio', 15, 200, 'Jump rope for 15 minutes continuously.'),
('Push-ups', 'Strength Training', 15, 100, 'Perform push-ups for 15 minutes.'),
('Sit-ups', 'Strength Training', 20, 80, 'Perform sit-ups for 20 minutes.'),
('Plank', 'Core', 5, 50, 'Hold a plank position for 5 minutes.'),
('Stretching', 'Flexibility', 10, 50, 'Perform stretching exercises for 10 minutes.');


INSERT INTO Coach(ID,FullName,Email,Password,
DateOfBirth,
Gender,
activityLevel
)values('1713885713953-n','Coach Parallel','Email@mail.com','$12$lqEzaLYZTeeFUVPl/XGLsOAjLyf5i6H1R51PrbbI4P24VRggiKQQO','2024-04-10','M',3);


INSERT INTO Member (ID, FullName, Activity, Gender, DateOfBirth, Height, Weight, GoalWeight, Email, Password, CoachID) 
VALUES 
('123456789', 'test user', 3, 'M', '1990-05-15', 175.5, 80.0, 75.0, 'test@example.com', '$12$lqEzaLYZTeeFUVPl/XGLsOAjLyf5i6H1R51PrbbI4P24VRggiKQQO', '1713885713953-n');


INSERT INTO gainMuscle (MemberID, CoachID) VALUES ('123456789', '1713885713953-n');
select * from Coach;
SELECT * FROM Member;



create role coach;
create role reg_Mem;
#create role prem_Mem;

grant insert, select, update, delete on fitnessapp.* to 'coach';
grant update on fitnessapp.* to 'reg_Mem';
#grant update on db_proj4710.* to 'prem_Mem';

create user 'coach1'@'localhost' identified by 'coach1pass';
create user 'coach2'@'localhost' identified by 'coach2pass';
create user 'coach3'@'localhost' identified by 'coach3pass';

grant 'coach' to 'coach1'@'localhost';
grant 'coach' to 'coach2'@'localhost';
grant 'coach' to 'coach3'@'localhost';

show grants for 'coach';
show grants for 'reg_Mem';
show grants for 'prem_Mem';

show grants for 'coach2'@'localhost';


select current_role();

