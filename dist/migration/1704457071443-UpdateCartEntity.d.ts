import { MigrationInterface, QueryRunner } from "typeorm";
export declare class UpdateCartEntity1704457071443 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
