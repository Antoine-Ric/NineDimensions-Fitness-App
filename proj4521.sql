#drop database db_proj4710;
create database db_proj4710;
use db_proj4710;
create role coach;
create role reg_Mem;
create role prem_Mem;

grant insert, select, update, delete on db_proj4710.* to 'coach';
grant update on db_proj4710.* to 'reg_Mem';
grant update on db_proj4710.* to 'prem_Mem';

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


Create Table Coach(
ID char(15) PRIMARY KEY,
Email varchar(255) UNIQUE NOT NULL,
Password varchar(100) NOT NULL,
Firstname varchar(50) NOT NULL,
Lastname varchar(50),
DateOfBirth DATE,
Gender char(1)
);

CREATE TABLE Member(
ID char(15) PRIMARY KEY,
CoachID char(15),
Email varchar(255) UNIQUE NOT NULL,
Password varchar(100) NOT NULL,
Firstname varchar(50) NOT NULL,
Lastname varchar(50),
DateOfBirth DATE,
Gender char(1),
Height float,
Weight float,
Goal   varchar(255),
FOREIGN KEY (CoachID) REFERENCES Coach(ID)
);

Create Table Exercise(eName VarChar(225) Primary Key, duration int, type VarChar(225));
Create Table findEx(m_MemID Varchar(8), foreign key(m_MemID) references member(ID), e_eName VarChar(225), foreign key(e_eName) references Exercise(eName), Primary Key(m_MemID, e_eName));
Create Table Assign(a_EMPLID varchar(15), a_eName VarChar(225), Primary Key(a_EMPLID, a_eName), foreign key(a_EMPLID) references Coach(ID), foreign key(a_eName) references Exercise(eName));
show tables;
