"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmConfig = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const data_source_1 = require("./data-source");
exports.TypeOrmConfig = typeorm_1.TypeOrmModule.forRootAsync({
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: (configService) => {
        if (configService.get('NODE_ENV') === 'test') {
            return {};
        }
        return {
            ...data_source_1.dataSourceOptions,
        };
    },
});
//# sourceMappingURL=typeorm.config.js.map