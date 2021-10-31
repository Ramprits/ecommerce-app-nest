import {MigrationInterface, QueryRunner} from "typeorm";

export class AddArticleTable1635673721883 implements MigrationInterface {
    name = 'AddArticleTable1635673721883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "articles" ("article_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "body" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "tagList" text NOT NULL, "favorites_count" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_b9a16e8d0dc20426e1611e560bc" PRIMARY KEY ("article_id"))`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profile_image" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "profile_image" DROP DEFAULT`);
        await queryRunner.query(`DROP TABLE "articles"`);
    }

}
