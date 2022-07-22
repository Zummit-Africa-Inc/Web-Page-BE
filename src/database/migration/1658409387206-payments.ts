import {MigrationInterface, QueryRunner} from "typeorm";

export class payments1658409387206 implements MigrationInterface {
    name = 'payments1658409387206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedOn" TIMESTAMP, "updatedBy" character varying, "deletedOn" TIMESTAMP WITH TIME ZONE, "deletedBy" character varying, "paystackId" integer NOT NULL, "status" character varying NOT NULL, "reference" character varying NOT NULL, "amount" integer NOT NULL, "gateway_response" character varying NOT NULL, "channel" character varying NOT NULL, "currency" character varying NOT NULL, "ip_address" character varying NOT NULL, "fees" integer NOT NULL, "customer" jsonb NOT NULL DEFAULT '{}', "paidAt" TIMESTAMP NOT NULL, "metadata" character varying NOT NULL, CONSTRAINT "PK_309f873cfbc20f57796956a1d33" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "payment_details"`);
    }

}
