/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**',
        '!src/config/*',
        '!src/infrastructure/presentation/http/{index,routes}.ts',
    ],
    testPathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/node_modules'],
    testMatch: ['<rootDir>/**/*.spec.ts'],
}
