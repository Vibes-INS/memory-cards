module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    semi: ['error', 'never'],
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-useless-constructor': 'off',
    'no-empty-function': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': 'off',
    'class-methods-use-this': 'off',
    // 'no-unused-vars': 'off',
  },
};
