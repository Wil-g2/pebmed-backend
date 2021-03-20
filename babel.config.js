module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: true } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@shared': './src/shared',
          '@modules': './src/modules',
          '@config': './src/config',
        },
      },
    ],
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
