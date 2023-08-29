import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOrderTable1693340964277 implements MigrationInterface {
    name = 'UpdateOrderTable1693340964277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`payment_method\``);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`order_status\` \`order_status\` varchar(255) NOT NULL DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`order_status\` \`order_status\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`payment_method\` varchar(255) NOT NULL`);
    }

}
