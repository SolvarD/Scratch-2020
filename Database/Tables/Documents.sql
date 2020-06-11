CREATE TABLE [dbo].[Documents]
(
	[DocumentId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Title] VARCHAR(MAX) NULL, 
    [Created] DATETIME NOT NULL, 
    [documentBase64] VARCHAR(MAX) NULL, 
    [Type] VARCHAR(MAX) NULL
)
