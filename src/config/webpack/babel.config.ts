import globalStore from '../global/global-store';

function babelConfig() {
  const { isDev, isPro } = globalStore;

  return {
    customize: require.resolve('babel-preset-react-app/webpack-overrides'),
    comments: true,
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['>0.25%', 'not ie 11', 'not op_mini all'],
          },
        },
      ],
      '@babel/preset-react',
      '@babel/preset-typescript'
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: 3,
          helpers: true,
          regenerator: true,
          useESModules: true
        }
      ],
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-async-to-generator',
      '@babel/plugin-transform-regenerator',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-class-properties',
      isDev && 'dynamic-import-node'
    ].filter(Boolean),
    cacheDirectory: true,
    cacheCompression: isPro,
    compact: isPro
  };
};

export default babelConfig;
