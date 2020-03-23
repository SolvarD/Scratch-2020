CREATE TABLE [dbo].[T_REF_Dictionary]
(
	[DictionaryId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [LanguageId] INT NOT NULL, 
    [Key] VARCHAR(50) NOT NULL, 
    [Label] VARCHAR(MAX) NOT NULL, 
    [Created] DATETIME NOT NULL, 
    CONSTRAINT [FK_T_REF_Dictionary_Languages] FOREIGN KEY (LanguageId) REFERENCES [T_REF_Languages](LanguageId)
)
