CREATE TABLE [dbo].[Users]
(
	[UserId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [FirstName] VARCHAR(50) NOT NULL, 
    [LastName] VARCHAR(50) NOT NULL, 
    [Username] VARCHAR(50) NOT NULL, 
    [Password] VARCHAR(50) NOT NULL, 
    [Token] VARCHAR(50) NULL, 
    [Email] VARCHAR(50) NULL, 
    [RoleId] INT NOT NULL, 
    CONSTRAINT [FK_Users_Roles] FOREIGN KEY (RoleId) REFERENCES T_REF_Roles(RoleId)
)
