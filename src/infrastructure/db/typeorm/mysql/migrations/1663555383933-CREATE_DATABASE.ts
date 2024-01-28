import { MigrationInterface, QueryRunner } from 'typeorm'

export class CREATEDATABASE1663555383933 implements MigrationInterface {
    name = 'CREATEDATABASE1663555383933'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`user\` (\`id\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`createdAt\` datetime NOT NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        )
        await queryRunner.query(
            `CREATE TABLE \`post\` (\`id\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`authorId\` varchar(255) NOT NULL, \`content\` varchar(255) NULL, \`relatedPostId\` varchar(255) NULL, \`createdAt\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`post\``)
        await queryRunner.query(
            `DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``,
        )
        await queryRunner.query(`DROP TABLE \`user\``)
    }
}
