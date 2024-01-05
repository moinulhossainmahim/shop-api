import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCartEntity1704457071443 implements MigrationInterface {
    name = 'UpdateCartEntity1704457071443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`productId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '20240105121751799-8076'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '20240105111008263-8940'`);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`productId\``);
    }

}
