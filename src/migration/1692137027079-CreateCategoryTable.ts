import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategoryTable1692137027079 implements MigrationInterface {
    name = 'CreateCategoryTable1692137027079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`icon\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_8b0be371d28245da6e4f4b6187\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_8b0be371d28245da6e4f4b6187\` ON \`categories\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
    }

}
