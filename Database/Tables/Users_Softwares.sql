CREATE TABLE [dbo].[Users_Softwares]
(
	[UserId] INT NOT NULL,
    [SoftwareId] INT NOT NULL,
	CONSTRAINT [FK_Users] FOREIGN KEY ([UserId]) REFERENCES [Users]([UserId]),
	CONSTRAINT [FK_Software] FOREIGN KEY ([SoftwareId]) REFERENCES [Softwares]([SoftwareId])
)
