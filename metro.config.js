const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.transformer.babelTransformerPath = require.resolve(
  'react-native-svg-transformer/expo'
);
defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(
  (ext) => ext !== 'svg'
);
defaultConfig.resolver.sourceExts.push('svg');

module.exports = defaultConfig;

// const { getDefaultConfig } = require.resolve(
//   'react-native-svg-transformer/expo'
// );

// module.exports = (() => {
//   const config = getDefaultConfig(__dirname);

//   const { transformer, resolver } = config;

//   config.transformer = {
//     ...transformer,
//     babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
//   };
//   config.resolver = {
//     ...resolver,
//     assetExts: resolver.assetExts.filter((ext) => ext !== 'svg').concat('png'),
//     sourceExts: [...resolver.sourceExts, 'svg'],
//   };

//   return config;
// })();
