USE [geometrikit]
GO

/****** Object:  StoredProcedure [dbo].[UDP_GET_QUESTIONS_BY_SUBJECT]    Script Date: 4/23/2019 10:17:52 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[UDP_GET_QUESTIONS_BY_SUBJECT] @subjectID as INT, @groupID INT
--EXEC UDP_GET_QUESTIONS_BY_SUBJECT 1,1
AS

SELECT  Q.[questionID]
      , Q.[bookName]
      , Q.[page]
      , Q.[questionNumber]
      , Q.[authorID]
      , Q.[content]
      , Q.[picture]
      , Q.[rank]
      , S.[color]  
FROM [dbo].[Questions] Q INNER JOIN [dbo].[QuestionsAndClasses] QC
ON  Q.[questionID] = QC.[questionID]
INNER JOIN  (SELECT * FROM QuestionsSubjects 
			WHERE subjectID = 1) QS
ON QS.questionID= Q.questionID
INNER JOIN [dbo].[Subjects] S ON S.subjectID = @subjectID


  WHERE  QC.[classID] = @GroupID  
GO


