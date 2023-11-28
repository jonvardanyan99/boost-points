module.exports = {
    extends: [
      'airbnb',
      'airbnb/hooks',
      'prettier',
    ],
    "parserOptions": {
      "ecmaVersion": 2020,
    },
    plugins: ['simple-import-sort', 'prettier'],
    rules: {
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
  };
  