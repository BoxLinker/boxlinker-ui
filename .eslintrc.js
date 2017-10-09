
// ESLint configuration
// http://eslint.org/docs/user-guide/configuring
module.exports = {
  parser: 'babel-eslint',

  extends: [
    'airbnb',
    'plugin:flowtype/recommended',
    'plugin:css-modules/recommended',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
  ],

  plugins: ['flowtype', 'css-modules', 'prettier'],

  globals: {
    __DEV__: true,
  },

  env: {
    browser: true,
  },

  rules: {
    // `js` and `jsx` are common extensions
    // `mjs` is for `universal-router` only, for now
    'import/extensions': [
      'error',
      'always',
      {
        js: 'never',
        jsx: 'never',
        mjs: 'never',
      },
    ],

    // Not supporting nested package.json yet
    // https://github.com/benmosher/eslint-plugin-import/issues/458
    'import/no-extraneous-dependencies': 'off',

    // Recommend not to leave any console.log in your code
    // Use console.error, console.warn and console.info instead
    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'info'],
      },
    ],

    // Allow js files to use jsx syntax, too
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],

    // Automatically convert pure class to function by
    // babel-plugin-transform-react-pure-class-to-function
    // https://github.com/kriasoft/react-starter-kit/pull/961
    'react/prefer-stateless-function': 'off',

    // ESLint plugin for prettier formatting
    // https://github.com/prettier/eslint-plugin-prettier
    'prettier/prettier': [
      'error',
      {
        // https://github.com/prettier/prettier#options
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
  },

  settings: {
    // Allow absolute paths in imports, e.g. import Button from 'components/Button'
    // https://github.com/benmosher/eslint-plugin-import/tree/master/resolvers
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
};

// module.exports = {
//   parser: 'babel-eslint',  
//   parserOptions: {
//     ecmaVersion: 6,
//     sourceType: 'module',
//     ecmaFeatures: {
//       experimentalObjectRestSpread: true,
//       jsx: true,
//     },
//   },
//   extends: [
//     'airbnb',
//     'plugin:flowtype/recommended',
//     'plugin:css-modules/recommended',
//     'prettier',
//     'prettier/flowtype',
//     'prettier/react',
//   ],
//   env: {
//     browser: true,
//     es6: true,
//     node: true,
//   },
//   plugins: ['react'],
//   rules: {
//     'curly': [2, 'multi-line'],
//     'jsx-quotes': 1,
//     'no-shadow': 0,
//     'no-trailing-spaces': 0,
//     'no-underscore-dangle': 0,
//     'no-unused-expressions': 0,
//     'object-curly-spacing': [1, 'always'],
//     'quotes': [2, 'single', 'avoid-escape'],
//     'react/jsx-boolean-value': 1,
//     'react/jsx-no-undef': 1,
//     'react/jsx-uses-react': 1,
//     'react/jsx-uses-vars': 1,
//     'react/jsx-wrap-multilines': 1,
//     'react/no-did-mount-set-state': 1,
//     'react/no-did-update-set-state': 1,
//     'react/no-unknown-property': 1,
//     'react/prop-types': 1,
//     'react/react-in-jsx-scope': 1,
//     'react/self-closing-comp': 1,
//     'react/sort-comp': 1,
//     'react/sort-prop-types': 1,
//     'semi': 2,
//     'strict': 0,
//   },
// };