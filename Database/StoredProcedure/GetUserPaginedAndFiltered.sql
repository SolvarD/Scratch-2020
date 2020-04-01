CREATE PROCEDURE [dbo].[GetUserPaginedAndFiltered]
	@skip int = 0,
	@take int = 10,
	@filter varchar(MAX) = ''
AS

declare @rows int = (select count(*) from Users);

	SELECT *, @rows as total, @skip as skip, @take as take, @filter as filter
 FROM Users
 WHERE FirstName like '%'+@filter+'%' or LastName like '%'+@filter+'%' or Email like '%'+@filter+'%'
 group by UserId, FirstName,LastName,UserName, Password, Token,Email, RoleId,Created, Updated, isActive, LanguageId
 ORDER BY FirstName
-- the paging comes here
OFFSET     @skip ROWS       -- skip 10 rows
FETCH NEXT @take ROWS ONLY; -- take 10 rows