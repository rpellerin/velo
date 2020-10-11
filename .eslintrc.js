module.exports = {
  root: true,
  extends: ['airbnb/base', 'prettier'],
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  plugins: ['babel'],
  rules: {
    quotes: ['error', 'single', { avoidEscape: true }],
  },
}
