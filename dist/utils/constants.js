"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFileUrl = exports.UNSUPPORTED_FILE = void 0;
const config_1 = require("@nestjs/config");
const config = new config_1.ConfigService();
exports.UNSUPPORTED_FILE = 'unsupportedfile';
exports.uploadFileUrl = config.get('NODE_ENV') === 'production'
    ? 'https://shop-api-5sp7.onrender.com/'
    : 'http://localhost:3000';
//# sourceMappingURL=constants.js.map