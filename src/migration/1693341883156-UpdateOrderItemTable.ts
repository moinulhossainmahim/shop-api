import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOrderItemTable1693341883156 implements MigrationInterface {
    name = 'UpdateOrderItemTable1693341883156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP COLUMN \`unit_price\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD \`unit_price\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP COLUMN \`unit_price\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD \`unit_price\` decimal(10,2) NOT NULL`);
    }

}
