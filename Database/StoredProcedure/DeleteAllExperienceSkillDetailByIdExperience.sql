CREATE PROCEDURE [dbo].[DeleteAllExperienceSkillDetailByIdExperience]
	@ExperienceId int
AS
	Delete from [Experiences_SkillCategoryDetails] where ExperienceId = @ExperienceId
RETURN 1
