import {MigrationInterface, QueryRunner} from "typeorm";

export class ThirdMigrationFixedColumnTags1648730473308 implements MigrationInterface {
    name = 'ThirdMigrationFixedColumnTags1648730473308'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "demo_section" ADD "companyName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "demo_section" ADD "message" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "demo_section" DROP COLUMN "message"`);
        await queryRunner.query(`ALTER TABLE "demo_section" DROP COLUMN "companyName"`);
    }

}
