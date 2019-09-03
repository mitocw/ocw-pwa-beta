module.exports = {
  // All js files need to be transformed using jest-preprocess.js i.e. babel
  transform: {
    '^.+\\.js$': '<rootDir>/jest-preprocess.js',
  },
  // Ignore the following directories
  testPathIgnorePatterns: ['node_modules', '.cache', 'public'],
  // Gatsby includes un-transpiled ES6 code and Jest doesn't transpile code inside node_modules
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  // The following file gets run automatically before every test.
  // It imports jest-dom so we don't have to import it on every single test file.
  setupFilesAfterEnv: ['<rootDir>/setup-test-env.js'],
};
