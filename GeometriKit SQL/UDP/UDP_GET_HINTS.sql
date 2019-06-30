USE [geometrikit]
GO

/****** Object:  StoredProcedure [dbo].[UDP_INSERT_NEW_QUESTION]    Script Date: 4/28/2019 10:14:33 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[UDP_GET_HINTS]		@questionID INT
											
											
AS
SELECT hintID, questionID, content, rank, teacherID, type
FROM [dbo].[Hints]
WHERE questionID = @questionID
ORDER BY [rank]  DESC 

GO


