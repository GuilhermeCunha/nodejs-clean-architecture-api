import { MigrationInterface, QueryRunner } from "typeorm";

export class CREATEDATABASE1663394619738 implements MigrationInterface {
    name = 'CREATEDATABASE1663394619738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_entity" ("username" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "post_entity" ("username" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL, "userUsername" varchar, "relatedPostUsername" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_post_entity" ("username" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL, "userUsername" varchar, "relatedPostUsername" varchar, CONSTRAINT "FK_73c2bd80294ef11307840f2c13a" FOREIGN KEY ("userUsername") REFERENCES "user_entity" ("username") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_d6f0af21ec25bc6a6441bf751a5" FOREIGN KEY ("relatedPostUsername") REFERENCES "post_entity" ("username") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_post_entity"("username", "createdAt", "userUsername", "relatedPostUsername") SELECT "username", "createdAt", "userUsername", "relatedPostUsername" FROM "post_entity"`);
        await queryRunner.query(`DROP TABLE "post_entity"`);
        await queryRunner.query(`ALTER TABLE "temporary_post_entity" RENAME TO "post_entity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_entity" RENAME TO "temporary_post_entity"`);
        await queryRunner.query(`CREATE TABLE "post_entity" ("username" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL, "userUsername" varchar, "relatedPostUsername" varchar)`);
        await queryRunner.query(`INSERT INTO "post_entity"("username", "createdAt", "userUsername", "relatedPostUsername") SELECT "username", "createdAt", "userUsername", "relatedPostUsername" FROM "temporary_post_entity"`);
        await queryRunner.query(`DROP TABLE "temporary_post_entity"`);
        await queryRunner.query(`DROP TABLE "post_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
