export class User {
  public userId: number;
  public roleId: number;
  public languageId: number;
  public userName: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public created: Date;
  public updated: Date;
  public token: string;
  public isActive: boolean;
}

export enum enumRole {
  ADMIN = 1,
  WEBMASTER,
  USER,
  VISITOR,
  ANONYME
}
