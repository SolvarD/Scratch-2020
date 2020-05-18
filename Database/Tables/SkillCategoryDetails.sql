CREATE TABLE [dbo].[SkillCategoryDetails]
(
	[SkillCategoryDetailId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [SkillCategoryId] INT NOT NULL, 
    [Label] VARCHAR(50) NOT NULL, 
    CONSTRAINT [FK_SkillCategoryDetails_SkillCategory] FOREIGN KEY (SkillCategoryId) REFERENCES SkillCategories (SkillCategoryId)
)
