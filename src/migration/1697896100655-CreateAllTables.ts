import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAllTables1697896100655 implements MigrationInterface {
    name = 'CreateAllTables1697896100655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` varchar(36) NOT NULL, \`tracking_no\` varchar(255) NOT NULL DEFAULT '20231021ae96', \`order_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`order_status\` varchar(255) NOT NULL DEFAULT 'pending', \`delivery_fee\` decimal(10,2) NOT NULL, \`total\` decimal(10,2) NOT NULL, \`amount\` decimal(10,2) NOT NULL, \`payment_status\` varchar(255) NOT NULL, \`payment_method\` varchar(255) NOT NULL, \`shippingAddressId\` varchar(36) NULL, \`billingAddressId\` varchar(36) NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order_item\` (\`id\` varchar(36) NOT NULL, \`quantity\` int NOT NULL, \`unit_price\` decimal(10,2) NOT NULL, \`subtotal\` decimal(10,2) NOT NULL, \`productId\` varchar(36) NULL, \`orderId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sub_category\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`categoryId\` varchar(36) NULL, UNIQUE INDEX \`IDX_7745a7cea2687ee7b048f828c7\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`icon\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_8b0be371d28245da6e4f4b6187\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`desc\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`featuredImg\` varchar(255) NOT NULL, \`galleryImg\` text NOT NULL, \`unit\` varchar(255) NOT NULL, \`price\` decimal(10,2) NOT NULL, \`salePrice\` decimal(10,2) NOT NULL, \`quantity\` int NOT NULL, \`sku\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_22cc43e9a74d7498546e9a63e7\` (\`name\`), UNIQUE INDEX \`IDX_34f6ca1cd897cc926bdcca1ca3\` (\`sku\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`wishlist\` (\`id\` varchar(36) NOT NULL, \`productId\` varchar(36) NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`avatar\` varchar(255) NOT NULL DEFAULT '', \`email\` varchar(255) NOT NULL, \`salt\` varchar(255) NOT NULL, \`userType\` varchar(255) NOT NULL DEFAULT 'customer', \`status\` varchar(255) NOT NULL DEFAULT 'active', UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`address\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`zip\` varchar(255) NOT NULL, \`streetAddress\` varchar(255) NOT NULL, \`addressType\` varchar(255) NOT NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_categories_categories\` (\`productId\` varchar(36) NOT NULL, \`categoriesId\` varchar(36) NOT NULL, INDEX \`IDX_2efc289942518359ed639e56e8\` (\`productId\`), INDEX \`IDX_367782e6c8c2629d751ef3e083\` (\`categoriesId\`), PRIMARY KEY (\`productId\`, \`categoriesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_subcategories_sub_category\` (\`productId\` varchar(36) NOT NULL, \`subCategoryId\` varchar(36) NOT NULL, INDEX \`IDX_6de58a777bbaa44736c1c3ed6c\` (\`productId\`), INDEX \`IDX_de8db83495da74c382838e8b62\` (\`subCategoryId\`), PRIMARY KEY (\`productId\`, \`subCategoryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_a9e568150eecef07380e7f5fc7c\` FOREIGN KEY (\`shippingAddressId\`) REFERENCES \`address\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_24170e5e670d4ee3a573c259203\` FOREIGN KEY (\`billingAddressId\`) REFERENCES \`address\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_904370c093ceea4369659a3c810\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_646bf9ece6f45dbe41c203e06e0\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sub_category\` ADD CONSTRAINT \`FK_51b8c0b349725210c4bd8b9b7a7\` FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`wishlist\` ADD CONSTRAINT \`FK_17e00e49d77ccaf7ff0e14de37b\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`wishlist\` ADD CONSTRAINT \`FK_f6eeb74a295e2aad03b76b0ba87\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`address\` ADD CONSTRAINT \`FK_d25f1ea79e282cc8a42bd616aa3\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_categories_categories\` ADD CONSTRAINT \`FK_2efc289942518359ed639e56e84\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_categories_categories\` ADD CONSTRAINT \`FK_367782e6c8c2629d751ef3e0834\` FOREIGN KEY (\`categoriesId\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_subcategories_sub_category\` ADD CONSTRAINT \`FK_6de58a777bbaa44736c1c3ed6ca\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_subcategories_sub_category\` ADD CONSTRAINT \`FK_de8db83495da74c382838e8b62e\` FOREIGN KEY (\`subCategoryId\`) REFERENCES \`sub_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_subcategories_sub_category\` DROP FOREIGN KEY \`FK_de8db83495da74c382838e8b62e\``);
        await queryRunner.query(`ALTER TABLE \`product_subcategories_sub_category\` DROP FOREIGN KEY \`FK_6de58a777bbaa44736c1c3ed6ca\``);
        await queryRunner.query(`ALTER TABLE \`product_categories_categories\` DROP FOREIGN KEY \`FK_367782e6c8c2629d751ef3e0834\``);
        await queryRunner.query(`ALTER TABLE \`product_categories_categories\` DROP FOREIGN KEY \`FK_2efc289942518359ed639e56e84\``);
        await queryRunner.query(`ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_d25f1ea79e282cc8a42bd616aa3\``);
        await queryRunner.query(`ALTER TABLE \`wishlist\` DROP FOREIGN KEY \`FK_f6eeb74a295e2aad03b76b0ba87\``);
        await queryRunner.query(`ALTER TABLE \`wishlist\` DROP FOREIGN KEY \`FK_17e00e49d77ccaf7ff0e14de37b\``);
        await queryRunner.query(`ALTER TABLE \`sub_category\` DROP FOREIGN KEY \`FK_51b8c0b349725210c4bd8b9b7a7\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_646bf9ece6f45dbe41c203e06e0\``);
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_904370c093ceea4369659a3c810\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_24170e5e670d4ee3a573c259203\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_a9e568150eecef07380e7f5fc7c\``);
        await queryRunner.query(`DROP INDEX \`IDX_de8db83495da74c382838e8b62\` ON \`product_subcategories_sub_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_6de58a777bbaa44736c1c3ed6c\` ON \`product_subcategories_sub_category\``);
        await queryRunner.query(`DROP TABLE \`product_subcategories_sub_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_367782e6c8c2629d751ef3e083\` ON \`product_categories_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_2efc289942518359ed639e56e8\` ON \`product_categories_categories\``);
        await queryRunner.query(`DROP TABLE \`product_categories_categories\``);
        await queryRunner.query(`DROP TABLE \`address\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`wishlist\``);
        await queryRunner.query(`DROP INDEX \`IDX_34f6ca1cd897cc926bdcca1ca3\` ON \`product\``);
        await queryRunner.query(`DROP INDEX \`IDX_22cc43e9a74d7498546e9a63e7\` ON \`product\``);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP INDEX \`IDX_8b0be371d28245da6e4f4b6187\` ON \`categories\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_7745a7cea2687ee7b048f828c7\` ON \`sub_category\``);
        await queryRunner.query(`DROP TABLE \`sub_category\``);
        await queryRunner.query(`DROP TABLE \`order_item\``);
        await queryRunner.query(`DROP TABLE \`order\``);
    }

}
