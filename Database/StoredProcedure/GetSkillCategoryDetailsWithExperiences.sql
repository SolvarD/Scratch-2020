CREATE PROCEDURE [dbo].[GetSkillCategoryDetailsWithExperiences]
	
AS
select * from Experiences_SkillCategoryDetails  scd left outer join
               SkillCategoryDetails  escd on escd.[SkillCategoryDetailId] = scd.[SkillCategoryDetailId]
			   order by ExperienceId,[Label] asc
