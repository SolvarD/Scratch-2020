export class SkillCategory {
  public skillCategoryId: number = 0;
  public order: number;
  public label: string = '';
  public skillCategoryDetails: Array<SkillCategoryDetail> = [];
}

export class SkillCategoryDetail {
  public skillCategoryDetailId: number;
  public skillCategoryId: number;
  public experienceId: number;
  public label: string = '';
}
