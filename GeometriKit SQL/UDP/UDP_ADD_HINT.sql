USE [geometrikit]
GO

/****** Object:  StoredProcedure [dbo].[UDP_GET_HINTS]    Script Date: 5/9/2019 12:04:07 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[UDP_ADD_HINT] @questionID AS INT, @content AS NVARCHAR(MAX), @rank AS INT, @teacherID AS INT, @type AS NVARCHAR(255)
									
											
AS
INSERT INTO  [dbo].[Hints] (questionID, content, rank, teacherID, type)
VALUES(@questionID, @content, @rank, @teacherID, @type)


GO


