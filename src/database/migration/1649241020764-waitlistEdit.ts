import {MigrationInterface, QueryRunner} from "typeorm";

export class waitlistEdit1649241020764 implements MigrationInterface {
    name = 'waitlistEdit1649241020764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "waitlist" ADD "createdOn" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "waitlist" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "waitlist" ADD "updatedOn" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "waitlist" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "waitlist" ADD "deletedOn" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TABLE "waitlist" ADD "deletedBy" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "waitlist" DROP COLUMN "deletedBy"`);
        await queryRunner.query(`ALTER TABLE "waitlist" DROP COLUMN "deletedOn"`);
        await queryRunner.query(`ALTER TABLE "waitlist" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "waitlist" DROP COLUMN "updatedOn"`);
        await queryRunner.query(`ALTER TABLE "waitlist" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "waitlist" DROP COLUMN "createdOn"`);
    }

}
