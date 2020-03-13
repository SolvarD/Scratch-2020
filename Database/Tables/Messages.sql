CREATE TABLE [dbo].[Messages]
(
	[MessageId] INT NOT NULL PRIMARY KEY, 
    [MessageTypeId] INT NOT NULL, 
    [UserName] VARCHAR(50) NULL, 
    [Text] VARCHAR(MAX) NOT NULL, 
    [Time] DATETIME NOT NULL, 
    [UserId] INT NULL, 
    [ReceiverId] INT NULL, 
    CONSTRAINT [FK_Messages_MessageTypes] FOREIGN KEY ([MessageTypeId]) REFERENCES [T_REF_MessageTypes]([MessageTypeId])
)
