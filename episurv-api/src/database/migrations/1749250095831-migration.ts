import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1749250095831 implements MigrationInterface {
    name = 'Migration1749250095831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "episurv"."users" ("id" SERIAL NOT NULL, "username" character varying, "email" character varying, "phoneNumber" character varying, "password" character varying NOT NULL, "otpCode" character varying, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_1e3d0240b49c40521aaeb953293" UNIQUE ("phoneNumber"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "episurv"."users"`);
    }

}
