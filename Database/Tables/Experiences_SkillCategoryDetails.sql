CREATE TABLE [dbo].[Experiences_SkillCategoryDetails]
(
	[ExperienceId] INT NOT NULL,
    [SkillCategoryDetailId] INT NOT NULL,
	CONSTRAINT [FK_Experiences] FOREIGN KEY ([ExperienceId]) REFERENCES [Experiences]([ExperienceId]),
	CONSTRAINT [FK_SkillCategoryDetails] FOREIGN KEY ([SkillCategoryDetailId]) REFERENCES [SkillCategoryDetails]([SkillCategoryDetailId])
)
