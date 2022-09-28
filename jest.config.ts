import type { Config } from 'jest';

const config: Config = {
	preset: 'jest-preset-preact',
    testMatch: [ 
        '**/__tests__/**/*.(js|ts|jsx|tsx)', 
    ],
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    setupFilesAfterEnv: ['<rootDir>/__test__/config/setupTests.ts'],
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__test__/config/fileMock.ts',
    },
    transformIgnorePatterns: ['/node_modules/(?!preact)/'],
};

export default config;
