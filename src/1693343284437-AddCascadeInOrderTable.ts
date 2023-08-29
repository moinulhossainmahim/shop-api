import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCascadeInOrderTable1693343284437 implements MigrationInterface {
    name = 'AddCascadeInOrderTable1693343284437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP COLUMN \`unit_price\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD \`unit_price\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`price\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`salePrice\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`salePrice\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`salePrice\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`salePrice\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`price\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP COLUMN \`unit_price\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD \`unit_price\` int NOT NULL`);
    }

}
