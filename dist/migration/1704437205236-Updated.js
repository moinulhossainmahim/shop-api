"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Updated1704437205236 = void 0;
class Updated1704437205236 {
    constructor() {
        this.name = 'Updated1704437205236';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '20240105064645557-8483'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '20240105064250426-4559'`);
    }
}
exports.Updated1704437205236 = Updated1704437205236;
//# sourceMappingURL=1704437205236-Updated.js.map