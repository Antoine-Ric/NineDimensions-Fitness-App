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
Password varchar(100) NOT NULL,
CoachID char(15),
FOREIGN KEY (CoachID) REFERENCES Coach(ID)
);


INSERT INTO Coach (
    ID,
    FullName,
    Email,
    Password,
    DateOfBirth
) VALUES (
    'C001',
    'Alice Brown',
    'alice@example.com',
    'password123',
    '1980-04-01'
);
INSERT INTO Member (
    ID,
    FullName,
    Activity,
    Gender,
    DateOfBirth,
    Height,
    Weight,
    GoalWeight,
    Email,
    Password,
    CoachID
) VALUES (
    'M001',
    'Bob Green',
    1,
    'M',
    '1992-08-12',
    175.0,
    80.0,
    70.0,
    'bob@example.com',
    'password456',
    'C001'  -- References the existing coach, Alice Brown
);


INSERT INTO Member (
    ID,
    FullName,
    Activity,
    Gender,
    DateOfBirth,
    Height,
    Weight,
    GoalWeight,
    Email,
    Password,
    CoachID
) VALUES (
    'F001',
    'Rood Vilmont',
    1,
    'M',
    '1992-08-12',
    175.0,
    80.0,
    70.0,
    'rood@example.com',
    'password456',
    'C001'  -- References the existing coach, Alice Brown
);


-- Inserting the first new member
INSERT INTO Member (
    ID,
    FullName,
    Activity,
    Gender,
    DateOfBirth,
    Height,
    Weight,
    GoalWeight,
    Email,
    Password,
    CoachID
) VALUES (
    'F002',
    'Jane Doe',
    2,  -- Assuming '2' might represent a different activity level
    'F',
    '1990-05-15',
    165.0,
    68.0,
    60.0,
    'jane.doe@example.com',
    'password789',
    'C001'  -- Same coach as before
);

-- Inserting the second new member
INSERT INTO Member (
    ID,
    FullName,
    Activity,
    Gender,
    DateOfBirth,
    Height,
    Weight,
    GoalWeight,
    Email,
    Password,
    CoachID
) VALUES (
    'F003',
    'John Smith',
    3,  -- Assuming '3' might represent another activity level
    'M',
    '1988-12-22',
    180.0,
    90.0,
    80.0,
    'john.smith@example.com',
    'password123',
    'C001'  -- Same coach as before
);




create role Manager;
#create role memberSupervisor;

grant insert, select, update, delete on fitnessapp.* to 'coach';
grant update on fitnessapp.* to 'reg_Mem';
#grant update on db_proj4710.* to 'prem_Mem';

create user 'coach1'@'localhost' identified by 'coach1pass';
create user 'coach2'@'localhost' identified by 'coach2pass';
create user 'coach3'@'localhost' identified by 'coach3pass';

grant 'coach' to 'coach1'@'localhost';
grant 'coach' to 'coach2'@'localhost';
grant 'coach' to 'coach3'@'localhost';

show grants for 'Manager';
show grants for 'memberSupervisor';

show grants for 'coach2'@'localhost';


select current_role();
