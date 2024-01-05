import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCartTable1704433380655 implements MigrationInterface {
    name = 'UpdateCartTable1704433380655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_342497b574edb2309ec8c6b62aa\``);
        await queryRunner.query(`DROP INDEX \`IDX_342497b574edb2309ec8c6b62a\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`REL_342497b574edb2309ec8c6b62a\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`cartId\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`totalPrice\``);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`total\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`quantity\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`itemId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '20240105054301022-5632'`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_c920010e4246f57334eb5f7cd27\` FOREIGN KEY (\`itemId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_756f53ab9466eb52a52619ee019\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_756f53ab9466eb52a52619ee019\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_c920010e4246f57334eb5f7cd27\``);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '20240104174850820-7569'`);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`itemId\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`total\``);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`totalPrice\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`cartId\` varchar(36) NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_342497b574edb2309ec8c6b62a\` ON \`user\` (\`cartId\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_342497b574edb2309ec8c6b62a\` ON \`user\` (\`cartId\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_342497b574edb2309ec8c6b62aa\` FOREIGN KEY (\`cartId\`) REFERENCES \`cart\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
