import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedUserEntity1714899036414 implements MigrationInterface {
    name = 'UpdatedUserEntity1714899036414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`isGoogleLogin\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '20240505085036904-6085'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '20240105122035886-8317'`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`isGoogleLogin\``);
    }

}
