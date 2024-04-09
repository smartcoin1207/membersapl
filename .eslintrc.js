module.exports = {
  root: true,
  extends: ['@react-native-community', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'unused-imports', 'import'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto',
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['prettier'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'import/extensions': 'off',
        'no-shadow': 'off',
        'no-undef': 'off',
        'react-hooks/exhaustive-deps': 'warn',
        'unused-imports/no-unused-imports': 'error',
        'import/prefer-default-export': 'off',
        'import/order': [
          'error',
          {
            'newlines-between': 'always',
            alphabetize: {order: 'asc', caseInsensitive: true},
          },
        ],
        '@typescript-eslint/consistent-type-imports': 'error',
        'prettier/prettier': [
          'error',
          {
            singleQuote: true,
            endOfLine: 'auto',
          },
        ],
      },
    },
  ],
};
