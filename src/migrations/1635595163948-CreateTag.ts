import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTag1635595163948 implements MigrationInterface {
    name = 'CreateTag1635595163948'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("tag_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_06a35221325edeb80ad2ec1ff85" PRIMARY KEY ("tag_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
