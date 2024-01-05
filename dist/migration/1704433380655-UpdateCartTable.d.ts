import { MigrationInterface, QueryRunner } from "typeorm";
export declare class UpdateCartTable1704433380655 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
