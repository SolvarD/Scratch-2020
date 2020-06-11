CREATE PROCEDURE [dbo].[GetSkillCategoryDetailsWithExperiencesByExperienceId]
	@ExperienceId int
AS
select * from Experiences_SkillCategoryDetails  scd left outer join
               SkillCategoryDetails  escd on escd.[SkillCategoryDetailId] = scd.[SkillCategoryDetailId]
			   where scd.ExperienceId = @ExperienceId
			   order by ExperienceId, [Label] asc
