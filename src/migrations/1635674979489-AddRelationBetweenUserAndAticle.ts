import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelationBetweenUserAndAticle1635674979489 implements MigrationInterface {
    name = 'AddRelationBetweenUserAndAticle1635674979489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ADD "authorUserId" uuid`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_c1ec4875cd63959414da64054e5" FOREIGN KEY ("authorUserId") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_c1ec4875cd63959414da64054e5"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "authorUserId"`);
    }

}
