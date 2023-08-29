import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateWishlistTable1692734564205 implements MigrationInterface {
    name = 'UpdateWishlistTable1692734564205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`wishlist_products_product\` (\`wishlistId\` varchar(36) NOT NULL, \`productId\` varchar(36) NOT NULL, INDEX \`IDX_d26d172812ffce61522237f3ae\` (\`wishlistId\`), INDEX \`IDX_f732d2ee0684d55dbead923860\` (\`productId\`), PRIMARY KEY (\`wishlistId\`, \`productId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`wishlist\` DROP COLUMN \`productId\``);
        await queryRunner.query(`ALTER TABLE \`wishlist_products_product\` ADD CONSTRAINT \`FK_d26d172812ffce61522237f3ae3\` FOREIGN KEY (\`wishlistId\`) REFERENCES \`wishlist\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`wishlist_products_product\` ADD CONSTRAINT \`FK_f732d2ee0684d55dbead923860c\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`wishlist_products_product\` DROP FOREIGN KEY \`FK_f732d2ee0684d55dbead923860c\``);
        await queryRunner.query(`ALTER TABLE \`wishlist_products_product\` DROP FOREIGN KEY \`FK_d26d172812ffce61522237f3ae3\``);
        await queryRunner.query(`ALTER TABLE \`wishlist\` ADD \`productId\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_f732d2ee0684d55dbead923860\` ON \`wishlist_products_product\``);
        await queryRunner.query(`DROP INDEX \`IDX_d26d172812ffce61522237f3ae\` ON \`wishlist_products_product\``);
        await queryRunner.query(`DROP TABLE \`wishlist_products_product\``);
    }

}
