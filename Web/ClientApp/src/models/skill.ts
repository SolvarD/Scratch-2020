export class SkillCategory {
  public skillCategoryId: number;
  public order: number;
  public Label: string;
  public skillCategoryDetails: Array<SkillCategoryDetail>;
}

export class SkillCategoryDetail {
  public skillCategoryDetailId: number;
  public skillCategoryId: number;
  public Label: string;
}
