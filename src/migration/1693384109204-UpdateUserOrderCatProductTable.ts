import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserOrderCatProductTable1693384109204
  implements MigrationInterface
{
  name = 'UpdateUserOrderCatProductTable1693384109204';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`price\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`price\` decimal(10,2) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP COLUMN \`salePrice\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`salePrice\` decimal(10,2) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`product\` DROP COLUMN \`salePrice\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`salePrice\` int NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`price\``);
    await queryRunner.query(
      `ALTER TABLE \`product\` ADD \`price\` int NOT NULL`,
    );
  }
}
