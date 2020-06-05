CREATE TABLE [dbo].[Profiles]
(
	[ProfileId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [isPrincipal] BIT NOT NULL, 
    [Presentation] VARCHAR(MAX) NULL, 
    [PastPro] VARCHAR(MAX) NULL, 
    [WhyMe] VARCHAR(MAX) NULL, 
    [Advantage] VARCHAR(MAX) NULL, 
    [Price] DECIMAL NULL, 
    [DocumentId_Photo] INT NULL, 
    [DocumentId_CV] INT NULL, 
    CONSTRAINT [FK_Profiles_Documents_Photo] FOREIGN KEY ([DocumentId_Photo]) REFERENCES [Documents]([DocumentId]),
    CONSTRAINT [FK_Profiles_Documents_CV] FOREIGN KEY ([DocumentId_CV]) REFERENCES [Documents]([DocumentId])
)
