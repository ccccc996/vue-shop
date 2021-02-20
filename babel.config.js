const babelPlugins = []
// 优化1：生产环境下移除console.log
if (process.env.NODE_ENV === 'production') {
  babelPlugins.push('transform-remove-console')
}

module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    ...babelPlugins
  ]
}
