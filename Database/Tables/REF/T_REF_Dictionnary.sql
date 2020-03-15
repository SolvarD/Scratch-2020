CREATE TABLE [dbo].[T_REF_Dictionnary]
(
	[DictionnaryId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [LanguageId] INT NOT NULL, 
    [Key] VARCHAR(50) NOT NULL, 
    [Label] VARCHAR(MAX) NOT NULL, 
    CONSTRAINT [FK_T_REF_Dictionnary_Languages] FOREIGN KEY (LanguageId) REFERENCES [T_REF_Languages](LanguageId)
)
