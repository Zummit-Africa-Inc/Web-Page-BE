import {MigrationInterface, QueryRunner} from "typeorm";

export class DemoRequestsChangedNameOfTable1649242829419 implements MigrationInterface {
    name = 'DemoRequestsChangedNameOfTable1649242829419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "demo_requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedOn" TIMESTAMP, "updatedBy" character varying, "deletedOn" TIMESTAMP WITH TIME ZONE, "deletedBy" character varying, "fullName" character varying NOT NULL, "email" character varying NOT NULL, "companyName" character varying NOT NULL, "message" character varying NOT NULL, CONSTRAINT "UQ_5983efdfecc3fcb484a574db27f" UNIQUE ("email"), CONSTRAINT "PK_caebe842f55969080ee55adf186" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "demo_requests"`);
    }

}
