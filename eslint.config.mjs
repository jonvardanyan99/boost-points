import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';

export default tseslint.config({
  files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  extends: [
    eslint.configs.recommended,
    tseslint.configs.strict,
    tseslint.configs.stylistic,
  ],
  plugins: {
    prettier: prettierPlugin,
    import: importPlugin,
    'simple-import-sort': simpleImportSortPlugin,
    react: reactPlugin,
    'react-hooks': reactHooksPlugin,
    'jsx-a11y': jsxA11yPlugin,
  },
  rules: {
    ...jsxA11yPlugin.configs.recommended.rules,
    ...reactPlugin.configs.recommended.rules,
    ...reactHooksPlugin.configs.recommended.rules,
    ...prettier.rules,
    'no-plusplus': 'off',
    'arrow-body-style': 'off',

    // imports routine
    'sort-imports': 'off',
    'import/order': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    'import/no-duplicates': 'off',
    'import/no-cycle': 'off',

    // allow only named exports for IDEs autocomplete
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',

    // react
    'react/no-array-index-key': 'off',
    'react/jsx-key': [
      'error',
      {
        checkFragmentShorthand: true,
      },
    ],
    'react/no-unescaped-entities': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.tsx', '.jsx'],
      },
    ],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
      },
    ],

    'prefer-destructuring': 'off',

    'prettier/prettier': 'error',

    // immer uses reassign
    'no-param-reassign': 'off',

    'max-classes-per-file': 'off',

    'global-require': 'off',

    'no-console': 'error',
  },
});
