module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      files: [
        'src/migrations/*',
        'src/models/*',
        'src/seeders/*',
      ],
      rules: {
        strict: 'off',
        'no-unused-vars': 'off',
        'import/no-dynamic-require': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'linebreak-style': 'off',
    'no-underscore-dangle': 'off',
    'no-alert': 'off',
    'no-console': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'global-require': 'off',
  },
};
