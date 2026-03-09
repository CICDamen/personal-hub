import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/tests/integration/**/*.test.[jt]s'],
  testTimeout: 30000,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default config
