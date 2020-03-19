CREATE PROCEDURE [dbo].[GetByEmailPassword]
	@email varchar(100),
	@password varchar(100)
AS
	select * from Users where Email = @email and Password = @password;
