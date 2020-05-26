CREATE PROCEDURE [dbo].[AddSkillToExperience]
	@skillsExperience Type_Experiences_SkillCategoryDetails readonly
AS
merge into Experiences_SkillCategoryDetails esc using @skillsExperience se
on esc.[ExperienceId] = se.[ExperienceId] and esc.[SkillCategoryDetailId] = se.[SkillCategoryDetailId]
WHEN not matched then
insert ([ExperienceId],[SkillCategoryDetailId]) VALUES
(se.[ExperienceId], se.[SkillCategoryDetailId]);

declare @experienceId int = (select top 1 experienceId from @skillsExperience);

exec GetSkillCategoryDetailsWithExperiencesByExperienceId @experienceId