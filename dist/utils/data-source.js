"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const config = new config_1.ConfigService();
exports.dataSourceOptions = {
    entities: ['dist/entity/*.js'],
    migrations: ['dist/migration/*.js'],
    type: 'mysql',
    synchronize: false,
    url: 'mysql://root:f6GG65hae4Ehad1H5A44ChGE1B3cFbHb@roundhouse.proxy.rlwy.net:46860/railway',
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map