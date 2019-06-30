USE [geometrikit]
GO

/****** Object:  StoredProcedure [dbo].[UDP_CREATE_GROUP]    Script Date: 5/7/2019 9:46:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/**********************8
insert into [dbo].[Students](userID, groupID, classID, studentRating)
values(999,2,2,4)

select * from [dbo].[QuestionsAndClasses]
select * from [dbo].[Groups]
select questionID from [dbo].[Questions]
SELECT * FROM students
EXEC [UDP_DELETE_TEACHER_GROUP] 2
************************/
ALTER PROCEDURE [dbo].[UDP_DELETE_TEACHER_GROUP] @groupID INT
AS 
 
DELETE FROM [dbo].[Groups]
WHERE groupID = @groupID

DELETE FROM [dbo].[QuestionsAndClasses]
WHERE [classID]= @groupID

UPDATE [dbo].[Students]
SET [groupID] = NULL
WHERE  groupID=@groupID

GO


