import { SkillCategoryDetail } from "./skill";

export class Experience {
  public experienceId: number = 0;
  public name: string = '';
  public description: string = '';
  public start: Date;
  public end: Date;
  public SkillCategoryDetails: SkillCategoryDetail[];
}
