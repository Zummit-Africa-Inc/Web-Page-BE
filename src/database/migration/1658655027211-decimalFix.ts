import {MigrationInterface, QueryRunner} from "typeorm";

export class decimalFix1658655027211 implements MigrationInterface {
    name = 'decimalFix1658655027211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "course" ADD "rating" double precision NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "course" ADD "rating" integer DEFAULT '0'`);
    }

}
