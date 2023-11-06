"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.ROLES_KEY = 'roles';
const UserRole = (roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.UserRole = UserRole;
//# sourceMappingURL=role.decorator.js.map