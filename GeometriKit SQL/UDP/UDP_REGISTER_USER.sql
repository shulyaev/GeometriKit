USE [geometrikit]
GO

/****** Object:  StoredProcedure [dbo].[UDP_INSERT_NEW_QUESTION]    Script Date: 4/28/2019 10:14:33 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[UDP_REGISTER_USER]		@userID INT, @firstName VARCHAR(255), @lastName VARCHAR(255), @userName VARCHAR(255), @password VARCHAR(255), @permissionID INT, @schoolID INT, @profilePicture VARCHAR(MAX)
											
											
AS
INSERT INTO [dbo].[Users] (userID, firstName, lastName, userName, password, permissionID, schoolID, profilePicture)
VALUES (@userID, @firstName, @lastName, @userName, @password, @permissionID, @schoolID, @profilePicture)

