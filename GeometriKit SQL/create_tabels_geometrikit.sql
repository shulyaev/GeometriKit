
CREATE TABLE Users (
    userID				int  PRIMARY KEY,--IDENTITY(1,1)
	firstName			varchar(255) NOT NULL,
	lastName			varchar(255) NOT NULL,
	userName			varchar(255) NOT NULL,
	password			varchar(255) NOT NULL,
	permissionID		int,
	schoolID			int,
	profilePicture		varchar(MAX) NULL,
 
);


CREATE TABLE [STATISTICS] (
    userID				int  NULL,
	questionID			INT  NULL,
	hintID				INT  NULL,
	success				INT  NULL,
	used				INT  NULL,
	time				INT	 NULL,
);


CREATE TABLE Permissions (
	permissionID	int  PRIMARY KEY,
	permissionName	varchar(255) NOT NULL
	);
CREATE TABLE TestNdebug (
	[log]	nvarchar(max) NOT NULL
	);
CREATE TABLE QuestionsSubjects (
				questionID  INT , 
				subjectID INT)


CREATE TABLE Students(
	 userID				int  PRIMARY KEY,
	 groupID			int,
	 classID			int,
	 studentRating		int
	 );

CREATE TABLE Questions(
	questionID				int IDENTITY(1,1) PRIMARY KEY,
	bookName				varchar(255) NULL,
	page					int NULL,
	questionNumber			int NULL,
	authorID				int NOT NULL,
	content					varchar(255) NOT NULL,
	picture					varchar(MAX) NULL,
	rank					int,
	subjectID				int
);
CREATE TABLE Groups(
	groupID					int IDENTITY(1,1) PRIMARY KEY,	
	teacherID				int,
	questionnaire			int
);

CREATE TABLE Classes(
	classID					int IDENTITY(1,1) PRIMARY KEY,	
	grade					varchar(255),	
	classNum				int,
	schoolID				int
);

CREATE TABLE School(
	schoolID				int IDENTITY(1,1) PRIMARY KEY,
	schoolName				varchar(255)
);

CREATE TABLE QuestionsAndClasses(
	classID					INT,
	questionID				INT
);


CREATE TABLE Theorems(
	theoremID				int IDENTITY(1,1) PRIMARY KEY,
	theoremName				varchar(max),
	subjectID				int,
	content					varchar(max)
);


CREATE TABLE Hints(
	hintID int IDENTITY(1,1) PRIMARY KEY,
	questionID	 int,
	content varchar(max) null,
	picture varchar(max) null	,
rank	int,
teacherID	int
);

CREATE TABLE QuestionStatus(

	studentID				int,
	questionID				int,
	statusID				int,
	usedHints				int
);


CREATE TABLE Subjects(
subjectID int IDENTITY(1,1) PRIMARY KEY,
subjectName	varchar(255),
questionnaire	int,
color	varchar(255)
);


CREATE TABLE Status(
statusID int IDENTITY(1,1) PRIMARY KEY,

statusName	varchar(255)
);


CREATE TABLE tPassword(
tpassword	varchar(255)
);



