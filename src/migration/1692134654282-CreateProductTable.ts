import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductTable1692134654282 implements MigrationInterface {
  name = 'CreateProductTable1692134654282';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`product\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`desc\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`featuredImg\` varchar(255) NOT NULL, \`galleryImg\` text NOT NULL, \`unit\` varchar(255) NOT NULL, \`price\` varchar(255) NOT NULL, \`salePrice\` varchar(255) NOT NULL, \`quantity\` int NOT NULL, \`sku\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_22cc43e9a74d7498546e9a63e7\` (\`name\`), UNIQUE INDEX \`IDX_34f6ca1cd897cc926bdcca1ca3\` (\`sku\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_34f6ca1cd897cc926bdcca1ca3\` ON \`product\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_22cc43e9a74d7498546e9a63e7\` ON \`product\``,
    );
    await queryRunner.query(`DROP TABLE \`product\``);
  }
}
