USE [geometrikit]
GO

/****** Object:  StoredProcedure [dbo].[UDP_GET_QUESTIONS]    Script Date: 4/23/2019 10:03:53 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[UDP_INSERT_QUESTIONSUBJECT] @questionID as int, @subjectID AS INT
AS


INSERT INTO [dbo].[QuestionsSubjects] (questionID,subjectID)
VALUES (@questionID, @subjectID)

GO



