import {MigrationInterface, QueryRunner} from "typeorm";

export class DemoSectionAfterFix5th1649192287217 implements MigrationInterface {
    name = 'DemoSectionAfterFix5th1649192287217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "demo_section" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedOn" TIMESTAMP, "updatedBy" character varying, "deletedOn" TIMESTAMP WITH TIME ZONE, "deletedBy" character varying, "fullName" character varying NOT NULL, "email" character varying NOT NULL, "companyName" character varying NOT NULL, "message" character varying NOT NULL, CONSTRAINT "UQ_075def3c687ab20d5cbab35fb45" UNIQUE ("email"), CONSTRAINT "PK_2571cbf06e507075d11ff7c9eeb" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "demo_section"`);
    }

}
