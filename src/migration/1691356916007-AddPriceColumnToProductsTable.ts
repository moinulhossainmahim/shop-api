import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPriceColumnToProductsTable1691356916007
  implements MigrationInterface
{
  name = 'AddPriceColumnToProductsTable1691356916007';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_4c9fb58de893725258746385e1\` ON \`products\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`price\` int NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`price\``);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_4c9fb58de893725258746385e1\` ON \`products\` (\`name\`)`,
    );
  }
}
