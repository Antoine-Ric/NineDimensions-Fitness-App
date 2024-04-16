#drop database db_proj4710;
create database fitnessapp;
use fitnessapp;

create table Coach(
ID char(15) PRIMARY KEY,
FullName varchar(100) NOT NULL,
Email varchar(255) UNIQUE NOT NULL,
Password varchar(100) NOT NULL,
DateOfBirth DATE
);

create table Member(
ID char(15) PRIMARY KEY,
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


Create Table Exercise(eName VarChar(225) Primary Key, instructions VarChar(1000), type VarChar(225));
Create Table findEx(m_MemID Varchar(8), foreign key(m_MemID) references member(ID), e_eName VarChar(225), foreign key(e_eName) references Exercise(eName), Primary Key(m_MemID, e_eName));
Create Table Assign(a_EMPLID varchar(15), a_eName VarChar(225), Primary Key(a_EMPLID, a_eName), foreign key(a_EMPLID) references Coach(ID), foreign key(a_eName) references Exercise(eName));

create table loseWeight(
ID integer PRIMARY KEY,
MemberID char(15),
CoachID char(15)
);
create table gainWeight(
ID integer PRIMARY KEY,
MemberID char(15),
CoachID char(15)
);
create table gainMuscle(
ID integer PRIMARY KEY,
MemberID char(15),
CoachID char(15)
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
