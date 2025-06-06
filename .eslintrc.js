module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    babelOptions: {
      presets: [['babel-preset-react-app', false], 'babel-preset-react-app/prod'],
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'react-app',
    'eslint:recommended',
    "plugin:react-hooks/recommended",
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  // Add your custom rules here
  rules: {
    // enable console.log
    'no-console': 'off',
    // enable declare variable in if
    'no-cond-assign': 'off',
    // enable declare variable width var
    'no-var': 'off',
    // enable declare in case
    'no-case-declarations': 'off',
    // enable redeclare variable
    'no-redeclare': 'off',
    indent: [
      'warn',
      2,
      {
        SwitchCase: 1,
        ignoreComments: false,
      },
    ],
    'linebreak-style': ['warn', 'unix'],
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],
    'no-unreachable': 'warn',
    'no-class-assign': 'warn',
    'no-unused-vars': 'warn',
    'no-useless-escape': 'off',
    'no-irregular-whitespace': 'warn',
    'no-trailing-spaces': 'warn',
    'react/jsx-indent': ['warn', 2],
    'eol-last': 'error',
    'space-before-function-paren': ['warn', { named: 'never' }],
    'array-bracket-spacing': ['warn', 'never'],
    'object-curly-spacing': ['warn', 'always'],
    'spaced-comment': 'warn',
    'keyword-spacing': ['warn', { before: true }],
    'space-infix-ops': 'error',
    'key-spacing': ['error', { beforeColon: false }],
    'arrow-spacing': ['error', { before: true, after: true }],
    'comma-spacing': ['error', { before: false, after: true }],
    'no-duplicate-imports': 'error',
    'one-var': ['error', 'never'],
    'brace-style': 'error',
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
    'no-multi-spaces': 'error',
    'react/jsx-closing-tag-location': 'error',
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
        "pathGroups": [
          {
            "pattern": "react*",
            "group": "builtin",
            "position": "before"
          }
        ],
        "pathGroupsExcludedImportTypes": [],
        "newlines-between": "never",
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ]
  },
};
