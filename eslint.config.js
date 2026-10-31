const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  { ignores: ['node_modules/', 'client/', 'coverage/'] },
  js.configs.recommended,
  {
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node,
    },
    rules: {
      eqeqeq: 'error',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_|^next$' }],
    },
  },
];