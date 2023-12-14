import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedNewColumnInProduct1702544209155 implements MigrationInterface {
    name = 'AddedNewColumnInProduct1702544209155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '20231214085649559-5661'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '202310286067'`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`created_at\``);
    }

}
