USE [geometrikit]
GO

/****** Object:  StoredProcedure [dbo].[UDP_GET_SUBJECTS]    Script Date: 5/7/2019 10:14:02 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[UDP_TEACHER_GET_SUBJECTS] @classID as INT
AS
--EXEC UDP_GET_SUBJECTS @classID =1

SELECT S.subjectID, S.subjectName, S.questionnaire, S.color, S.picture

FROM [dbo].[Subjects] S
INNER JOIN [dbo].[QuestionsSubjects] QS
ON S.subjectID = QS.subjectID
GROUP BY S.subjectID, S.subjectName, S.questionnaire, S.color, S.picture

