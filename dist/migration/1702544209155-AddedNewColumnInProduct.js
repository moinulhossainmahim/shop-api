"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddedNewColumnInProduct1702544209155 = void 0;
class AddedNewColumnInProduct1702544209155 {
    constructor() {
        this.name = 'AddedNewColumnInProduct1702544209155';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '20231214085649559-5661'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '202310286067'`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`created_at\``);
    }
}
exports.AddedNewColumnInProduct1702544209155 = AddedNewColumnInProduct1702544209155;
//# sourceMappingURL=1702544209155-AddedNewColumnInProduct.js.map