USE [geometrikit]
GO

/****** Object:  StoredProcedure [dbo].[UDP_GET_QUESTIONS]    Script Date: 4/23/2019 10:03:53 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[UDP_INSERT_HINT] @questionID as int, @content as NVARCHAR(MAX),@rank AS INT, @type AS NVARCHAR(250),  @teacherID AS INT
AS


INSERT INTO [dbo].[Hints] (questionID, content, rank, teacherID, type)
VALUES (@questionID, @content,@rank, @type,  @teacherID)

GO

