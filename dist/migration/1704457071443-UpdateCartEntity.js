"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCartEntity1704457071443 = void 0;
class UpdateCartEntity1704457071443 {
    constructor() {
        this.name = 'UpdateCartEntity1704457071443';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`productId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '20240105121751799-8076'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '20240105111008263-8940'`);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`productId\``);
    }
}
exports.UpdateCartEntity1704457071443 = UpdateCartEntity1704457071443;
//# sourceMappingURL=1704457071443-UpdateCartEntity.js.map