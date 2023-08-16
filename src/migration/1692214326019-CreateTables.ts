import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1692214326019 implements MigrationInterface {
    name = 'CreateTables1692214326019'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sub_category\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`categoryID\` varchar(36) NULL, UNIQUE INDEX \`IDX_7745a7cea2687ee7b048f828c7\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`icon\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_8b0be371d28245da6e4f4b6187\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`desc\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`featuredImg\` varchar(255) NOT NULL, \`galleryImg\` text NOT NULL, \`unit\` varchar(255) NOT NULL, \`price\` varchar(255) NOT NULL, \`salePrice\` varchar(255) NOT NULL, \`quantity\` int NOT NULL, \`sku\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_22cc43e9a74d7498546e9a63e7\` (\`name\`), UNIQUE INDEX \`IDX_34f6ca1cd897cc926bdcca1ca3\` (\`sku\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`sub_category\` ADD CONSTRAINT \`FK_e54c93300735b69dbfe0734ce10\` FOREIGN KEY (\`categoryID\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sub_category\` DROP FOREIGN KEY \`FK_e54c93300735b69dbfe0734ce10\``);
        await queryRunner.query(`DROP INDEX \`IDX_34f6ca1cd897cc926bdcca1ca3\` ON \`product\``);
        await queryRunner.query(`DROP INDEX \`IDX_22cc43e9a74d7498546e9a63e7\` ON \`product\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP INDEX \`IDX_8b0be371d28245da6e4f4b6187\` ON \`categories\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_7745a7cea2687ee7b048f828c7\` ON \`sub_category\``);
        await queryRunner.query(`DROP TABLE \`sub_category\``);
    }

}
