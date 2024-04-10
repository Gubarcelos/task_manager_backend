module.exports = {
    testEnvironment: 'node',
    clearMocks: true,
    verbose: true,
    roots: ['<rootDir>/tests'],
    testMatch: ['**/*.test.js'],
    coverageDirectory: '<rootDir>/coverage',
    collectCoverageFrom: [
      'src/**/*.js',
      '!**/node_modules/**',
      '!**/coverage/**',
      '!**/jest.config.js',
      '!**/index.js'
    ],
    coverageReporters: ['text', 'html'],
  };