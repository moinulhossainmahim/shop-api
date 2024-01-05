import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateCartAndCartItemTable1704390530447 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
