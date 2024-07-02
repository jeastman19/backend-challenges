import { Config } from 'jest';

import { compilerOptions } from './tsconfig.json';
import { pathsToModuleNameMapper } from 'ts-jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    coverageDirectory: '.tmp/coverage',
    collectCoverageFrom: ['src/**/*.ts'],
    verbose: true,

    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
    }),

    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    },
};

export default config;
