"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test1704437241777 = void 0;
class Test1704437241777 {
    constructor() {
        this.name = 'Test1704437241777';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '20240105064722095-7279'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '20240105064645557-8483'`);
    }
}
exports.Test1704437241777 = Test1704437241777;
//# sourceMappingURL=1704437241777-Test.js.map