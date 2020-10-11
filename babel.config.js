module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { chrome: 84, firefox: 80 },
      },
    ],
  ],
}
