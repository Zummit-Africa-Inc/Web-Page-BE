import {MigrationInterface, QueryRunner} from "typeorm";

export class courses1658215833092 implements MigrationInterface {
    name = 'courses1658215833092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."course_difficulty_enum" AS ENUM('easy', 'intermediate', 'advanced')`);
        await queryRunner.query(`CREATE TABLE "course" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedOn" TIMESTAMP, "updatedBy" character varying, "deletedOn" TIMESTAMP WITH TIME ZONE, "deletedBy" character varying, "title" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "rating" integer DEFAULT '0', "tutor" character varying, "difficulty" "public"."course_difficulty_enum" NOT NULL DEFAULT 'easy', "duration" integer NOT NULL, "topics" text array DEFAULT '{}', "students" text array DEFAULT '{}', "language" character varying, CONSTRAINT "PK_bf95180dd756fd204fb01ce4916" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "course"`);
        await queryRunner.query(`DROP TYPE "public"."course_difficulty_enum"`);
    }

}
