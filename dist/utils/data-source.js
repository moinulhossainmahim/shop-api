"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const config = new config_1.ConfigService();
exports.dataSourceOptions = {
    entities: ['dist/entity/*.js'],
    database: config.get('DB_NAME'),
    host: config.get('DB_HOST'),
    password: config.get('DB_PASSWORD'),
    port: config.get('DB_PORT'),
    username: config.get('DB_USERNAME'),
    migrations: ['dist/migration/*.js'],
    type: 'mysql',
    synchronize: false,
    migrationsRun: Boolean(config.get('MIGRATION_RUN')),
};
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map