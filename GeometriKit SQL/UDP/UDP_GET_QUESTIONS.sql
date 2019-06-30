USE [geometrikit]
GO

/****** Object:  StoredProcedure [dbo].[UDP_GET_QUESTIONS]    Script Date: 5/1/2019 10:52:06 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




ALTER PROCEDURE [dbo].[UDP_GET_QUESTIONS] @subjectID AS INT
AS 
--EXEC UDP_GET_QUESTIONS 5
SELECT  Q.[questionID]
      , Q.[bookName]
      , Q.[page]
      , Q.[questionNumber]
      , Q.[authorID]
      , Q.[content]
      , Q.[picture]
      , Q.[rank]

     
  FROM [dbo].[Questions] Q INNER JOIN [dbo].[QuestionsSubjects] QS
  ON  Q.[questionID] = QS.[questionID]
  WHERE QS.[subjectID] = @subjectID
  GROUP BY  Q.[questionID],
       Q.[bookName],
       Q.[page],
       Q.[questionNumber],
       Q.[authorID],
       Q.[content],
       Q.[picture],
       Q.[rank]
GO
