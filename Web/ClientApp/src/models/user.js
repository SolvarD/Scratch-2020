"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User() {
    }
    Object.defineProperty(User.prototype, "token", {
        get: function () {
            return localStorage.getItem('Token');
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.set = function (value) {
        localStorage.setItem('Token', value);
    };
    return User;
}());
exports.User = User;
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 1] = "ADMIN";
    Role[Role["WEBMASTER"] = 2] = "WEBMASTER";
    Role[Role["USER"] = 3] = "USER";
    Role[Role["VISITOR"] = 4] = "VISITOR";
    Role[Role["ANONYME"] = 5] = "ANONYME";
})(Role = exports.Role || (exports.Role = {}));
//# sourceMappingURL=user.js.map