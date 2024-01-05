import { MigrationInterface, QueryRunner } from "typeorm";
export declare class UpdateCartTables1704437960491 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
