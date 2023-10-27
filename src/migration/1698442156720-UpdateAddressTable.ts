import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAddressTable1698442156720 implements MigrationInterface {
    name = 'UpdateAddressTable1698442156720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`address\` ADD \`isActive\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '202310275686'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '202310275c89'`);
        await queryRunner.query(`ALTER TABLE \`address\` DROP COLUMN \`isActive\``);
    }

}
