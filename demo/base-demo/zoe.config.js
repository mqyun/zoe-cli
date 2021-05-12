module.exports = function (params) {
  console.log('params:', params);

  return {
    port: 888,

    publicPath: '/base-demo',

    sourceMap: true,

    antdLessModifyVars: {
      'primary-color': '#ff7300'
    },

    cloudXyScssModifyVars: {
      'xy-primary-color': '#c22996'
    }
  };
}
