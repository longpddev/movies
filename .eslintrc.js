module.exports = {
    extends: [
      'react-app',
      'prettier',
      'plugin:prettier/recommended',
    ],
    plugins: ['prettier'],
    rules: {
      'react/jsx-max-props-per-line': [
        2,
        { maximum: 1, when: 'multiline' },
      ]
    },
  }