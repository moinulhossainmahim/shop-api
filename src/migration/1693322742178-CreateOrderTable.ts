import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrderTable1693322742178 implements MigrationInterface {
    name = 'CreateOrderTable1693322742178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`order\` (\`id\` varchar(36) NOT NULL, \`tracking_no\` varchar(255) NOT NULL, \`order_date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`order_status\` varchar(255) NOT NULL, \`delivery_fee\` decimal(10,2) NOT NULL, \`total\` decimal(10,2) NOT NULL, \`tax\` decimal(10,2) NOT NULL, \`payment_method\` varchar(255) NOT NULL, \`payment_status\` varchar(255) NOT NULL, \`shipping_address\` text NOT NULL, \`billing_address\` text NOT NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_caabe91507b3379c7ba73637b84\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order_item\` ADD CONSTRAINT \`FK_646bf9ece6f45dbe41c203e06e0\` FOREIGN KEY (\`orderId\`) REFERENCES \`order\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_item\` DROP FOREIGN KEY \`FK_646bf9ece6f45dbe41c203e06e0\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_caabe91507b3379c7ba73637b84\``);
        await queryRunner.query(`DROP TABLE \`order\``);
    }

}
