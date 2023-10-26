import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAddressAndUserTables1698311557560 implements MigrationInterface {
    name = 'UpdateAddressAndUserTables1698311557560'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '202310268141'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '202310267bc6'`);
    }

}
