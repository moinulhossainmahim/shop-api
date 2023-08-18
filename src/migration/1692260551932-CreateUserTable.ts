import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1692260551932 implements MigrationInterface {
    name = 'CreateUserTable1692260551932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`avatar\` varchar(255) NOT NULL DEFAULT '', \`email\` varchar(255) NOT NULL, \`salt\` varchar(255) NOT NULL, \`userType\` varchar(255) NOT NULL DEFAULT 'customer', \`status\` varchar(255) NOT NULL DEFAULT 'Active', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
