/* eslint-disable object-curly-newline */
import process from 'node:process';
// eslint.config.js
import antfu from '@antfu/eslint-config';

export default antfu(
  {
    // Type of the project. 'lib' for libraries, the default is 'app'
    type: 'app',

    // TypeScript and Vue are autodetected, you can also explicitly enable them:
    typescript: true,
    vue: true,

    // Enable stylistic formatting rules
    // stylistic: true,

    // Or customize the stylistic rules
    stylistic: {
      indent: 2, // 4, or 'tab'
      quotes: 'single', // or 'double'
      semi: true,
    },

    // Enable formatters for CSS, SCSS, and other files
    formatters: {
      css: true, // Format CSS files
      html: true, // Format HTML
      // markdown: 'prettier', // Format markdown with Prettier
    },

    // Disable jsonc and yaml support
    jsonc: false,
    yaml: false,

    // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
    ignores: [
      '**/fixtures',
      '**/dist',
      '**/storybook-static',
      // '**/public/ckeditor/**',
      '**/server/api/**',
      // ...globs
    ],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'vue/custom-event-name-casing': 'off',
      'ts/explicit-function-return-type': 'off',
      'vue/no-required-prop-with-default': 'off',
      'vue/valid-v-slot': ['error', { allowModifiers: true }],
    },
  },
  {
    plugins: {
      // perfectionist
    },
    rules: {
      'vue/max-attributes-per-line': ['error', {
        singleline: { max: 3 }, // Allows up to 3 attributes on a single line
        multiline: { max: 1 }, // Still allows only 1 attribute per line in multiline
      }],
      'max-lines-per-function': ['error', {
        max: 160,
        skipBlankLines: true,
        skipComments: true,
      }],
      'import/no-unresolved': 'off', // Allow unresolved imports
      'max-params': ['error', 4], // max 4 parameters for a function
      'object-curly-newline': ['error', { multiline: true, minProperties: 4 }], // Allow multiline objects
      'no-prototype-builtins': 'off', // Allow prototype builtins
      'style/no-tabs': 'error',
      'regexp/no-unused-capturing-group': 'off',
      'jsdoc/require-returns-description': 'off',
      'vue/require-explicit-emits': 'error',
      'vue/valid-v-slot': ['error', {
        allowModifiers: true,
      }],
    },
  },
);
