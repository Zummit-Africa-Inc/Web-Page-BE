import {MigrationInterface, QueryRunner} from "typeorm";

export class internship1649240451086 implements MigrationInterface {
    name = 'internship1649240451086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "internship_category" ADD "createdOn" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "internship_category" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "internship_category" ADD "updatedOn" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "internship_category" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "internship_category" ADD "deletedOn" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "internship_category" ADD "deletedBy" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "internship_category" DROP COLUMN "deletedBy"`);
        await queryRunner.query(`ALTER TABLE "internship_category" DROP COLUMN "deletedOn"`);
        await queryRunner.query(`ALTER TABLE "internship_category" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "internship_category" DROP COLUMN "updatedOn"`);
        await queryRunner.query(`ALTER TABLE "internship_category" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "internship_category" DROP COLUMN "createdOn"`);
    }

}
