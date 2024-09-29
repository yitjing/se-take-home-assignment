module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue', 'ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '**/tests/unit/**/*.spec.js',
    '**/__tests__/*.(js|jsx|ts|tsx)',
  ],
};
