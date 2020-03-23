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
  public get token() {
    return localStorage.getItem('Token');
  }
  set(value) {
    localStorage.setItem('Token', value);
  }
  public isActive: boolean;
}

export enum Role {
  ADMIN = 1,
  WEBMASTER,
  USER,
  VISITOR,
  ANONYME
}
