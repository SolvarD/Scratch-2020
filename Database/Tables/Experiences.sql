CREATE TABLE [dbo].[Experiences]
(
	[ExperienceId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Name] VARCHAR(50) NOT NULL, 
    [Description] VARCHAR(MAX) NOT NULL, 
    [Start] DATETIME NOT NULL, 
    [End] DATETIME NULL
)
