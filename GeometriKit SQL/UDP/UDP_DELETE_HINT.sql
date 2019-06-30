USE [geometrikit]
GO

/****** Object:  StoredProcedure [dbo].[UDP_GET_HINTS]    Script Date: 5/9/2019 12:04:07 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO




CREATE PROCEDURE [dbo].[UDP_DELETE_HINT]		@hintID INT
									
											
AS
DELETE FROM [dbo].[Hints]
WHERE hintID = @hintID


GO


