USE [geometrikit]
GO

/****** Object:  StoredProcedure [dbo].[UDP_GET_SUBJECTS]    Script Date: 5/1/2019 10:33:29 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[UDP_GET_SUBJECTS_WITOUT_CLASS_FILTER] 
AS
--EXEC UDP_GET_SUBJECTS_WITOUT_CLASS_FILTER


	IF OBJECT_ID('tempdb..#TEMP_FOR_GROUPBY') IS NOT NULL
	DROP TABLE #TEMP_FOR_GROUPBY
  SELECT S.[subjectID]
      ,S.[subjectName]
      ,S.[questionnaire]
      ,S.[color]
	  ,S.[picture]
INTO #TEMP_FOR_GROUPBY
FROM [dbo].[Questions] Q
INNER JOIN [dbo].[QuestionsSubjects] QS
ON Q.[questionID] = QS.[questionID]
INNER JOIN [dbo].[Subjects] S
ON S.[subjectID] =QS.[subjectID]
	

SELECT [subjectID]
      ,[subjectName]
      ,[questionnaire]
      ,[color]
	  ,[picture]
FROM #TEMP_FOR_GROUPBY
GROUP BY [subjectName],[subjectID]  ,[questionnaire]
      ,[color]
	  ,[picture]
GO


