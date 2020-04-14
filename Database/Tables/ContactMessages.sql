CREATE TABLE [dbo].[ContactMessages]
(
	[ContactMessageId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [FirstName] VARCHAR(50) NOT NULL, 
    [LastName] VARCHAR(50) NOT NULL, 
    [Email] VARCHAR(MAX) NOT NULL, 
    [Message] VARCHAR(MAX) NOT NULL
)
