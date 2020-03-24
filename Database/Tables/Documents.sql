CREATE TABLE [dbo].[Documents]
(
	[DocumentId] INT NOT NULL PRIMARY KEY, 
    [Title] VARCHAR(MAX) NOT NULL, 
    [Created] DATETIME NOT NULL, 
    [Content] VARBINARY(MAX) NOT NULL, 
    [Type] VARCHAR(10) NOT NULL
)
