module.exports = {
  presets: [
      ['module:metro-react-native-babel-preset',
      { useTransformReactJSXExperimental: true }],
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@navigation': './src/navigation',
          '@interfaces': './src/interfaces',
          '@util': './src/util',
          '@component': './src/component',
          '@stylesCommon': './src/stylesCommon',
          '@redux': './src/redux',
          '@services': './src/services',
          '@routeName': './src/navigation/routeName',
          '@images': './src/images',
        },
      },
    ],
    'react-native-reanimated/plugin',
    ["@babel/plugin-transform-react-jsx",
    { "runtime": "automatic" }],
  ],
};
