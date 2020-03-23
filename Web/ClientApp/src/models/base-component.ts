import { enumRole } from "./user";
import { UserService } from "../app/services/user.service";

export class BaseComponent {
  constructor() {
    UserService.subCurrentUser.subscribe((user) => {      
      this.canDisplay = [enumRole.ADMIN, enumRole.VISITOR, enumRole.WEBMASTER].includes(user.roleId);
      this.canRead = [enumRole.ADMIN, enumRole.VISITOR, enumRole.WEBMASTER].includes(user.roleId);
      this.canEdit = [enumRole.ADMIN].includes(user.roleId);
    });
  }
  canDisplay: boolean = [enumRole.ADMIN, enumRole.VISITOR, enumRole.WEBMASTER].includes(UserService.currentUser.roleId);
  canRead: boolean = [enumRole.ADMIN, enumRole.VISITOR, enumRole.WEBMASTER].includes(UserService.currentUser.roleId);
  canEdit: boolean = [enumRole.ADMIN].includes(UserService.currentUser.roleId);
}
