import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSubCategoryTable1697658589525 implements MigrationInterface {
  name = 'UpdateSubCategoryTable1697658589525';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sub_category\` DROP FOREIGN KEY \`FK_e54c93300735b69dbfe0734ce10\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_category\` CHANGE \`categoryID\` \`categoryId\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_category\` ADD CONSTRAINT \`FK_51b8c0b349725210c4bd8b9b7a7\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sub_category\` DROP FOREIGN KEY \`FK_51b8c0b349725210c4bd8b9b7a7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_category\` CHANGE \`categoryId\` \`categoryID\` varchar(36) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_category\` ADD CONSTRAINT \`FK_e54c93300735b69dbfe0734ce10\` FOREIGN KEY (\`categoryID\`) REFERENCES \`categories\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }
}
