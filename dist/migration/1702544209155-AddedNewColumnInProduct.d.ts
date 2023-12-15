import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddedNewColumnInProduct1702544209155 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
