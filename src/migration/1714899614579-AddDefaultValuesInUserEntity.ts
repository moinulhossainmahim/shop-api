import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultValuesInUserEntity1714899614579 implements MigrationInterface {
    name = 'AddDefaultValuesInUserEntity1714899614579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '20240505090014985-0334'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`contact\` \`contact\` varchar(255) NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`salt\` \`salt\` varchar(255) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`salt\` \`salt\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`contact\` \`contact\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '20240505085036904-6085'`);
    }

}
