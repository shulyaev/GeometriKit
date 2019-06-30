USE [geometrikit]
GO

/****** Object:  StoredProcedure [dbo].[UDP_GET_SUBJECTS]    Script Date: 4/21/2019 9:50:19 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [dbo].[UDP_GET_SUBJECTS] @classID as INT
AS
--EXEC UDP_GET_SUBJECTS @classID =1


	IF OBJECT_ID('tempdb..#TEMP_FOR_GROUPBY') IS NOT NULL
	DROP TABLE #TEMP_FOR_GROUPBY
  SELECT S.[subjectID]
      ,S.[subjectName]
      ,S.[questionnaire]
      ,S.[color]
	  ,S.[picture]
INTO #TEMP_FOR_GROUPBY
FROM
	(SELECT [questionID]
	FROM [QuestionsAndClasses] 
	WHERE classID = @classID) QC
INNER JOIN
[dbo].[Questions] Q
ON Q.[questionID] = QC.[questionID]

INNER JOIN [dbo].[Subjects] S
ON S.[subjectID] =Q.[subjectID]


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


