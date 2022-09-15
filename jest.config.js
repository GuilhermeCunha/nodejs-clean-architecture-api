/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverageFrom: [
        'src/**',
        '!src/configs/*',
        '!src/interfaces/http/{index,routes}.ts',
    ],
    testPathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/node_modules'],
    testMatch: ['<rootDir>/**/*.spec.ts'],
}
