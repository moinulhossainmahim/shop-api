import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateWishlistTable1693293020756 implements MigrationInterface {
    name = 'UpdateWishlistTable1693293020756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`wishlist\` ADD \`productId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`wishlist\` ADD CONSTRAINT \`FK_17e00e49d77ccaf7ff0e14de37b\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`wishlist\` DROP FOREIGN KEY \`FK_17e00e49d77ccaf7ff0e14de37b\``);
        await queryRunner.query(`ALTER TABLE \`wishlist\` DROP COLUMN \`productId\``);
    }

}
