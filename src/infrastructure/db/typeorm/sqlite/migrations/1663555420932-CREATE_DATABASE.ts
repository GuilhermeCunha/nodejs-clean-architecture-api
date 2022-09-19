import { MigrationInterface, QueryRunner } from "typeorm";

export class CREATEDATABASE1663555420932 implements MigrationInterface {
    name = 'CREATEDATABASE1663555420932'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("id" varchar PRIMARY KEY NOT NULL, "type" varchar NOT NULL, "authorId" varchar NOT NULL, "content" varchar, "relatedPostId" varchar NOT NULL, "createdAt" datetime NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "createdAt" datetime NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`CREATE TABLE "temporary_post" ("id" varchar PRIMARY KEY NOT NULL, "type" varchar NOT NULL, "authorId" varchar NOT NULL, "content" varchar, "relatedPostId" varchar, "createdAt" datetime NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_post"("id", "type", "authorId", "content", "relatedPostId", "createdAt") SELECT "id", "type", "authorId", "content", "relatedPostId", "createdAt" FROM "post"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`ALTER TABLE "temporary_post" RENAME TO "post"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" RENAME TO "temporary_post"`);
        await queryRunner.query(`CREATE TABLE "post" ("id" varchar PRIMARY KEY NOT NULL, "type" varchar NOT NULL, "authorId" varchar NOT NULL, "content" varchar, "relatedPostId" varchar NOT NULL, "createdAt" datetime NOT NULL)`);
        await queryRunner.query(`INSERT INTO "post"("id", "type", "authorId", "content", "relatedPostId", "createdAt") SELECT "id", "type", "authorId", "content", "relatedPostId", "createdAt" FROM "temporary_post"`);
        await queryRunner.query(`DROP TABLE "temporary_post"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
