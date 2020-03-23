CREATE TABLE [dbo].[Users]
(
	[UserId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [FirstName] VARCHAR(50) NOT NULL, 
    [LastName] VARCHAR(50) NOT NULL, 
    [UserName] VARCHAR(50) NOT NULL, 
    [Password] VARCHAR(MAX) NOT NULL, 
    [Token] VARCHAR(MAX) NULL, 
    [Email] VARCHAR(50) NOT NULL, 
    [RoleId] INT NOT NULL, 
    [Created] DATETIME NOT NULL, 
    [Updated] DATETIME NULL, 
    [isActive] BIT NOT NULL DEFAULT 1, 
    [LanguageId] INT NOT NULL DEFAULT 1, 
    CONSTRAINT [FK_Users_Roles] FOREIGN KEY (RoleId) REFERENCES T_REF_Roles(RoleId),
    CONSTRAINT [FK_Users_Languages] FOREIGN KEY (LanguageId) REFERENCES T_REF_Languages(LanguageId)
)
