CREATE PROCEDURE [dbo].[GetDictionaryPaginedAndFiltered]
	@skip int = 0,
	@take int = 10,
	@filter varchar(MAX) = ''
AS
declare @askTake int = @take;
declare @askSkip int = @skip;

set @take =(select count(*) from T_REF_Languages) * @askTake;
set @skip =(select count(*) from T_REF_Languages) * @askSkip;
declare @rows int = (select count(*) from T_REF_Dictionary WHERE [Key] like '%'+@filter+'%') / (select count(*) from T_REF_Languages);

	SELECT *, @rows as total, @askSkip as skip, @askTake as take, @filter as filter
 FROM T_REF_Dictionary
 WHERE [Key] like '%'+@filter+'%'
 group by DictionaryId, LanguageId, Label, [key], Created
 ORDER BY [Key]
-- the paging comes here
OFFSET     @skip ROWS       -- skip 10 rows
FETCH NEXT @take ROWS ONLY; -- take 10 rows