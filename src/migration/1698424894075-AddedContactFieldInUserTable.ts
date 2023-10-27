import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedContactFieldInUserTable1698424894075 implements MigrationInterface {
    name = 'AddedContactFieldInUserTable1698424894075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`contact\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '2023102788bc'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '20231026fbab'`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`contact\``);
    }

}
