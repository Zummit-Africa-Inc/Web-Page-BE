import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstMigration1648726166056 implements MigrationInterface {
    name = 'FirstMigration1648726166056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "internship_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "categoryName" character varying NOT NULL, CONSTRAINT "UQ_68c088d6e2e40ae4279dfc6bc91" UNIQUE ("categoryName"), CONSTRAINT "PK_8dfad3bccb80d07f0269010ab2d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "waitlist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "categoryId" uuid, CONSTRAINT "UQ_2221cffeeb64bff14201bd5b3de" UNIQUE ("email"), CONSTRAINT "PK_973cfbedc6381485681d6a6916c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "waitlist" ADD CONSTRAINT "FK_09f48e47b1557cf7085c1b35f08" FOREIGN KEY ("categoryId") REFERENCES "internship_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "waitlist" DROP CONSTRAINT "FK_09f48e47b1557cf7085c1b35f08"`);
        await queryRunner.query(`DROP TABLE "waitlist"`);
        await queryRunner.query(`DROP TABLE "internship_category"`);
    }

}
