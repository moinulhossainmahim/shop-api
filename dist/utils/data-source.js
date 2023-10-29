"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const config = new config_1.ConfigService();
exports.dataSourceOptions = {
    database: config.get('DB_NAME'),
    entities: ['dist/entity/*.js'],
    host: config.get('DB_HOST'),
    migrations: ['dist/migration/*.js'],
    password: config.get('DB_PASSWORD'),
    port: config.get('DB_PORT'),
    type: 'mysql',
    synchronize: false,
    username: config.get('DB_USERNAME'),
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map