CREATE TABLE [dbo].[T_REF_Languages]
(
	[LanguageId] INT NOT NULL PRIMARY KEY, 
    [Label] VARCHAR(50) NOT NULL, 
    [Code] VARCHAR(50) NOT NULL, 
    [Format] VARCHAR(50) NOT NULL 
)
