USE [geometrikit]
GO





CREATE PROCEDURE [dbo].[UDP_GET_ASSIGNED_CLASSES] @questionID AS INT, @teacherID AS INT
AS 
--EXEC [UDP_GET_ASSIGNED_CLASSES] 

IF OBJECT_ID('tempdb..#TEMP_GROUPS') IS NOT NULL
DROP TABLE #TEMP_GROUPS
SELECT	G.teacherID,
		G.[groupID],
		G.questionnaire, 
		G.grade, 
		S.[schoolName],
		assigned = 'false'
INTO #TEMP_GROUPS
FROM (SELECT * FROM [dbo].[Groups] WHERE [teacherID] = @teacherID) G
INNER JOIN [dbo].[School] S
ON S.[schoolID] = G.[schoolID]
FULL OUTER JOIN (SELECT * FROM [dbo].[QuestionsAndClasses] WHERE questionID =  @questionID ) QC
ON QC.[classID] = G.groupID


UPDATE #TEMP_GROUPS
SET assigned = 'ture'
WHERE [questionID] = NULL
     
SELECT teacherID,
		[groupID],
		questionnaire, 
		grade, 
		schooName,
		assigned

FROM #TEMP_GROUPS

--INSERT INTO [dbo].[Groups](groupID, teacherID, questionnaire, grade, schoolID)