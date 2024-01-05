"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Updated1704453007825 = void 0;
class Updated1704453007825 {
    constructor() {
        this.name = 'Updated1704453007825';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '20240105111008263-8940'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '20240105065920938-7461'`);
    }
}
exports.Updated1704453007825 = Updated1704453007825;
//# sourceMappingURL=1704453007825-Updated.js.map