import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAddressTable1692715437024 implements MigrationInterface {
    name = 'CreateAddressTable1692715437024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`address\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`zip\` varchar(255) NOT NULL, \`streetAddress\` varchar(255) NOT NULL, \`addressType\` varchar(255) NOT NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_d25f1ea79e282cc8a42bd616aa3\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_d25f1ea79e282cc8a42bd616aa3\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`status\` \`status\` varchar(255) NOT NULL DEFAULT 'Active'`);
        await queryRunner.query(`DROP TABLE \`address\``);
    }

}
