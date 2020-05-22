CREATE PROCEDURE [dbo].[DeleteExperienceSkillDetail]
	@ExperienceId int,
	@SkillCategoryDetailId int
AS
	Delete from [Experiences_SkillCategoryDetails] where ExperienceId = @ExperienceId and SkillCategoryDetailId = @SkillCategoryDetailId
RETURN 1
