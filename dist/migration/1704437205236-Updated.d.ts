import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Updated1704437205236 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
