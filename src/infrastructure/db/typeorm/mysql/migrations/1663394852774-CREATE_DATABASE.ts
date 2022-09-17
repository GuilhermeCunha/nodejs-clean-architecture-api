import { MigrationInterface, QueryRunner } from "typeorm";

export class CREATEDATABASE1663394852774 implements MigrationInterface {
    name = 'CREATEDATABASE1663394852774'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_entity\` (\`username\` varchar(255) NOT NULL, \`createdAt\` datetime NOT NULL, PRIMARY KEY (\`username\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post_entity\` (\`username\` varchar(255) NOT NULL, \`createdAt\` datetime NOT NULL, \`userUsername\` varchar(255) NULL, \`relatedPostUsername\` varchar(255) NULL, PRIMARY KEY (\`username\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`post_entity\` ADD CONSTRAINT \`FK_73c2bd80294ef11307840f2c13a\` FOREIGN KEY (\`userUsername\`) REFERENCES \`user_entity\`(\`username\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post_entity\` ADD CONSTRAINT \`FK_d6f0af21ec25bc6a6441bf751a5\` FOREIGN KEY (\`relatedPostUsername\`) REFERENCES \`post_entity\`(\`username\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post_entity\` DROP FOREIGN KEY \`FK_d6f0af21ec25bc6a6441bf751a5\``);
        await queryRunner.query(`ALTER TABLE \`post_entity\` DROP FOREIGN KEY \`FK_73c2bd80294ef11307840f2c13a\``);
        await queryRunner.query(`DROP TABLE \`post_entity\``);
        await queryRunner.query(`DROP TABLE \`user_entity\``);
    }

}
