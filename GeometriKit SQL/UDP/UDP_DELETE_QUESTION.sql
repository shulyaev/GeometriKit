USE [geometrikit]
GO

/****** Object:  StoredProcedure [dbo].[UDP_INSERT_NEW_QUESTION]    Script Date: 4/28/2019 10:14:33 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


ALTER PROCEDURE [dbo].[UDP_DELETE_QUESTION] @questionID INT
											
											
AS
DELETE FROM [dbo].[Questions]
WHERE questionID = @questionID

DELETE FROM [dbo].[QuestionsAndClasses]
WHERE questionID = @questionID

DELETE FROM [dbo].[QuestionsSubjects]
WHERE questionID = @questionID

DELETE FROM [dbo].[Hints]
WHERE questionID = @questionID



