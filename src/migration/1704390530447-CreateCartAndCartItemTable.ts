import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCartAndCartItemTable1704390530447 implements MigrationInterface {
    name = 'CreateCartAndCartItemTable1704390530447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cart\` (\`id\` varchar(36) NOT NULL, \`totalPrice\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cart_item\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`quantity\` int NOT NULL, \`price\` int NOT NULL, \`subTotalPrice\` int NOT NULL, \`productId\` varchar(36) NULL, \`cartId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`cartId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_342497b574edb2309ec8c6b62a\` (\`cartId\`)`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '20240104174850820-7569'`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_342497b574edb2309ec8c6b62a\` ON \`user\` (\`cartId\`)`);
        await queryRunner.query(`ALTER TABLE \`cart_item\` ADD CONSTRAINT \`FK_75db0de134fe0f9fe9e4591b7bf\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart_item\` ADD CONSTRAINT \`FK_29e590514f9941296f3a2440d39\` FOREIGN KEY (\`cartId\`) REFERENCES \`cart\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_342497b574edb2309ec8c6b62aa\` FOREIGN KEY (\`cartId\`) REFERENCES \`cart\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_342497b574edb2309ec8c6b62aa\``);
        await queryRunner.query(`ALTER TABLE \`cart_item\` DROP FOREIGN KEY \`FK_29e590514f9941296f3a2440d39\``);
        await queryRunner.query(`ALTER TABLE \`cart_item\` DROP FOREIGN KEY \`FK_75db0de134fe0f9fe9e4591b7bf\``);
        await queryRunner.query(`DROP INDEX \`REL_342497b574edb2309ec8c6b62a\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '20231214085649559-5661'`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_342497b574edb2309ec8c6b62a\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`cartId\``);
        await queryRunner.query(`DROP TABLE \`cart_item\``);
        await queryRunner.query(`DROP TABLE \`cart\``);
    }

}
