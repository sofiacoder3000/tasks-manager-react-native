module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      // 'module-resolver',
      require.resolve('babel-plugin-module-resolver'),
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@assets': './assets',
          '@components': './src/components',
          '@context': ['./src/context'],
          '@hooks': ['./src/hooks'],
          '@models': ['./src/models'],
          '@database': ['./src/database'],
        },
      },
    ],
  ],
};
