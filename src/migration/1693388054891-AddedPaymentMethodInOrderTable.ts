import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedPaymentMethodInOrderTable1693388054891 implements MigrationInterface {
    name = 'AddedPaymentMethodInOrderTable1693388054891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` ADD \`payment_method\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order\` DROP COLUMN \`payment_method\``);
    }

}
