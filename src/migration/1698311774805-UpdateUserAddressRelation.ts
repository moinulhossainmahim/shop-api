import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserAddressRelation1698311774805 implements MigrationInterface {
    name = 'UpdateUserAddressRelation1698311774805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '20231026fbab'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '202310268141'`);
    }

}
