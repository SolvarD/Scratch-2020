CREATE PROCEDURE [dbo].[DeleteMaynExperienceSkillDetail]
	@skillsExperience Type_Experiences_SkillCategoryDetails readonly
AS
merge into Experiences_SkillCategoryDetails esc using @skillsExperience se
on esc.[ExperienceId] = se.[ExperienceId] and esc.[SkillCategoryDetailId] = se.[SkillCategoryDetailId]
WHEN matched then delete;

declare @experienceId int = (select top 1 experienceId from @skillsExperience);

exec GetSkillCategoryDetailsWithExperiencesByExperienceId @experienceId