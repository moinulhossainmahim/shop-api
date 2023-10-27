import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAddressAndUserRelation1698440467796 implements MigrationInterface {
    name = 'UpdateAddressAndUserRelation1698440467796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '202310275c89'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '2023102788bc'`);
    }

}
