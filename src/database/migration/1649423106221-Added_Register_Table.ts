import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedRegisterTable1649423106221 implements MigrationInterface {
  name = 'AddedRegisterTable1649423106221';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "register" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedOn" TIMESTAMP, "updatedBy" character varying, "deletedOn" TIMESTAMP WITH TIME ZONE, "deletedBy" character varying, "empName" character varying NOT NULL, "email" character varying NOT NULL, "hash" character varying NOT NULL, "phone" integer NOT NULL, "city" character varying NOT NULL, "country" character varying NOT NULL, "gender" character varying NOT NULL, "department" character varying NOT NULL, "dateOfBirth" TIMESTAMP NOT NULL, "joiningDate" TIMESTAMP NOT NULL, CONSTRAINT "UQ_a25c9faec6801989b434563ed1b" UNIQUE ("email"), CONSTRAINT "PK_14473cc8f2caa81fd19f7648d54" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "register"`);
  }
}
