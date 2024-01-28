import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLengthRules1705611144045 implements MigrationInterface {
    name = 'AddLengthRules1705611144045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`content\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`content\` varchar(777) NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`username\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`username\` varchar(14) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`)`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_df13a977bbaa8ac6521ade06209\` FOREIGN KEY (\`relatedPostId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_df13a977bbaa8ac6521ade06209\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`username\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`username\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\` (\`username\`)`);
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`content\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`content\` varchar(255) NULL`);
    }

}
