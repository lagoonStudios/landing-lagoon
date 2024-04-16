module.exports = {
    env: {
      node: true,
      es2022: true,
      browser: true,
    },
    extends: [
      'eslint:recommended',
      'eslint-config-standard',
      'plugin:astro/recommended',
      'plugin:prettier/recommended',
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: ['unused-imports'],
    rules: {
      'prettier/prettier': 'error',
      'unused-imports/no-unused-imports': 'error',
      'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
    overrides: [
      {
        files: ['*.astro'],
        parser: 'astro-eslint-parser',
        parserOptions: {
          extraFileExtensions: ['.astro'],
        },
      },
      {
        // Define the configuration for `<script>` tag.
        // Script in `<script>` is assigned a virtual file name with the `.js` extension.
        files: ['**/*.astro/*.js', '*.astro/*.js'],
        parserOptions: {
          sourceType: 'module',
        },
        rules: {
          'prettier/prettier': 'off',
        },
      },
    ],
  }