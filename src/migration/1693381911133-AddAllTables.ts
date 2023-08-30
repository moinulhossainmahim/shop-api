import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAllTables1693381911133 implements MigrationInterface {
  name = 'AddAllTables1693381911133';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`order\` (\`id\` varchar(36) NOT NULL, \`tracking_no\` varchar(255) NOT NULL, \`order_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`order_status\` varchar(255) NOT NULL DEFAULT 'pending', \`delivery_fee\` decimal(10,2) NOT NULL, \`total\` decimal(10,2) NOT NULL, \`tax\` decimal(10,2) NOT NULL, \`payment_status\` varchar(255) NOT NULL, \`shipping_address\` text NOT NULL, \`billing_address\` text NOT NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order_item\` (\`id\` varchar(36) NOT NULL, \`orderId\` varchar(255) NOT NULL, \`productId\` varchar(255) NOT NULL, \`quantity\` int NOT NULL, \`unit_price\` decimal(10,2) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`product\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`desc\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`featuredImg\` varchar(255) NOT NULL, \`galleryImg\` text NOT NULL, \`unit\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`salePrice\` int NOT NULL, \`quantity\` int NOT NULL, \`sku\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_22cc43e9a74d7498546e9a63e7\` (\`name\`), UNIQUE INDEX \`IDX_34f6ca1cd897cc926bdcca1ca3\` (\`sku\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`wishlist\` (\`id\` varchar(36) NOT NULL, \`productId\` varchar(36) NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`fullName\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`avatar\` varchar(255) NOT NULL DEFAULT '', \`email\` varchar(255) NOT NULL, \`salt\` varchar(255) NOT NULL, \`userType\` varchar(255) NOT NULL DEFAULT 'customer', \`status\` varchar(255) NOT NULL DEFAULT 'active', UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`address\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`zip\` varchar(255) NOT NULL, \`streetAddress\` varchar(255) NOT NULL, \`addressType\` varchar(255) NOT NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`categories\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`icon\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_8b0be371d28245da6e4f4b6187\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`sub_category\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`categoryID\` varchar(36) NULL, UNIQUE INDEX \`IDX_7745a7cea2687ee7b048f828c7\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_904370c093ceea4369659a3c810\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_646bf9ece6f45dbe41c203e06e0\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`wishlist\` ADD CONSTRAINT \`FK_17e00e49d77ccaf7ff0e14de37b\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`wishlist\` ADD CONSTRAINT \`FK_f6eeb74a295e2aad03b76b0ba87\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`address\` ADD CONSTRAINT \`FK_d25f1ea79e282cc8a42bd616aa3\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`sub_category\` ADD CONSTRAINT \`FK_e54c93300735b69dbfe0734ce10\` FOREIGN KEY (\`categoryID\`) REFERENCES \`categories\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`sub_category\` DROP FOREIGN KEY \`FK_e54c93300735b69dbfe0734ce10\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`address\` DROP FOREIGN KEY \`FK_d25f1ea79e282cc8a42bd616aa3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`wishlist\` DROP FOREIGN KEY \`FK_f6eeb74a295e2aad03b76b0ba87\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`wishlist\` DROP FOREIGN KEY \`FK_17e00e49d77ccaf7ff0e14de37b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_646bf9ece6f45dbe41c203e06e0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_904370c093ceea4369659a3c810\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_7745a7cea2687ee7b048f828c7\` ON \`sub_category\``,
    );
    await queryRunner.query(`DROP TABLE \`sub_category\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_8b0be371d28245da6e4f4b6187\` ON \`categories\``,
    );
    await queryRunner.query(`DROP TABLE \`categories\``);
    await queryRunner.query(`DROP TABLE \`address\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`wishlist\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_34f6ca1cd897cc926bdcca1ca3\` ON \`product\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_22cc43e9a74d7498546e9a63e7\` ON \`product\``,
    );
    await queryRunner.query(`DROP TABLE \`product\``);
    await queryRunner.query(`DROP TABLE \`order_item\``);
    await queryRunner.query(`DROP TABLE \`order\``);
  }
}
