import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedCartEntity1704436970070 implements MigrationInterface {
    name = 'UpdatedCartEntity1704436970070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_c920010e4246f57334eb5f7cd27\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`total\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`itemId\``);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`subTotal\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`productId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '20240105064250426-4559'`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_371eb56ecc4104c2644711fa85f\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_371eb56ecc4104c2644711fa85f\``);
        await queryRunner.query(`ALTER TABLE \`order\` CHANGE \`tracking_no\` \`tracking_no\` varchar(255) NOT NULL DEFAULT '20240105054301022-5632'`);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`productId\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`subTotal\``);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`itemId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`total\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_c920010e4246f57334eb5f7cd27\` FOREIGN KEY (\`itemId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
