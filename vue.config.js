// import AutoImport from 'unplugin-auto-import'

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // configureWebpack: {
  //   plugins: [
  //     AutoImport({
  //       imports: ['vue']
  //     })
  //   ]
  // }
})
