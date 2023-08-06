import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductsTable1691355086774 implements MigrationInterface {
  name = 'CreateProductsTable1691355086774';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`products\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_4c9fb58de893725258746385e1\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_4c9fb58de893725258746385e1\` ON \`products\``,
    );
    await queryRunner.query(`DROP TABLE \`products\``);
  }
}
