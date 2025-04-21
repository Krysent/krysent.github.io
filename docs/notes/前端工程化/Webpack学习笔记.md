![](https://cdn.nlark.com/yuque/0/2025/png/29756964/1741976404340-c7d93155-5ba6-42f0-aa2b-35aaade6da7b.png)

#

## 核心工作过程

**在项目中会散落很多文件.js\.html\.css\.less\.png\.json\.jpg 等，webpack cli 启动打包流程，载入核心模块，创建compiler对象，开始进行编译。通过打包入库 index.js 开始解析，每个资源模块需要的依赖模块，形成项目中所有文件间的一个依赖个关系树。有了关系树之后开始递归遍历这个依赖树，然后找到每个模块需要的加载器去加载，加载到结果放到 bundle.js 里面，实现整个项目的打包。其中 loader 机制起到很重要的作用，有了 loader 起到所有资源的加载。**

![](https://cdn.nlark.com/yuque/0/2025/png/29756964/1741976555591-3a783b67-9632-4967-bac0-c60e0d03c5b4.png)

## Loader

### Loader 工作原理

js 代码，将输入的信息转化成新的 js 代码，类似于一个管道。

![](https://cdn.nlark.com/yuque/0/2025/png/29756964/1741977452825-7a4757f8-aa03-470d-8fa8-9108ebe56b89.png)

![](https://cdn.nlark.com/yuque/0/2025/png/29756964/1741977463138-455c8d8e-528c-493d-a54e-656a74530ce1.png)

### 手写一个 Loader

```javascript
//markdown-loader.js
module.exports = source => {
  //loader返回结果一定要是js代码，loader是直接将转换的结果塞入bundle.js包中

  const html = marked(source);

  return `module.exports = ${JSON.stringify(html)}`;
};
```

```javascript
//....
module: {
  rules: [
    {
      test: /.md$/,
      use: ["html-loader", "./markdown-load"] //可以直接使用相对路径来引用编写好的loader
    }
  ];
}
```

**use 数组有多个 loader 时候，loader 执行顺序是从后往前，从右往左依次执行。放在后面的 loader 优先级高先执行。**

## Plugin

插件机制，增强 webpack 的自动化能力，loader 实现资源模块的加载和打包，plugin 解决除了资源加载以外的其他自动化工作。例如 清除 dist 目录、拷贝静态文件到静态目录、压缩代码，实现了大多数前端工程化工作。

### 使用方法

```javascript
const {CleanWebpackPlugin} from 'clean-webpack-plugin'
const HtmlWepackPlugin from 'html-webpack-plugin'
const CopyWebpackPlugin from 'copy-webpack-plugin'
//...

plugins:[{
  new CleanWebpackPlugin() , //使用
  new HtmlWepackPlugin({
    title:"页面名称1"，
    meta:{
      viewport:"width=device-width"
    },
    template: resolvePath('../public/index.html'),
  }),
  new CopyWebpackPlugin(['public']) //拷贝public下的所有内容
}]
```

### 常用插件

仔细过插件的官方说明和文档，了解 api 参数用法，不需要所有的都认识，用的时候再

- clean-webpack-plugin : 自动清理 dist 目录插件，可以清空覆盖上一次 dist 内容，方便已经清除的内容积累
- html-webpack-plugin：通过 webpack 自动生成 bundle.js 的 html
  - 修改 html 的标题、meta 等信息
  - 在 src 中新建 index.html 模版，比如一般的 react、vue 项目中就有入口 html，可以使用`<%= htmlWebpackPlugin.options.title %>`来访问 config 中的插件配置
- copy-webpack-plugin ： 用来拷贝需要的静态文件，比如 favicon，直接将静态资源复制到 dist 中

### 手写一个 Plugin

plugin 通过钩子机制来实现，在 plugin 工作中会有很多环节，每个节点都挂了很多的钩子，可以参考官方文档，自己定义插件往这些钩子上挂

**plugin 是一个函数或者包含一个 apply 的方法**

```javascript
class MyPlugin{
  apply(compiler){
    console.log('myplugin启动')
    compiler.hooks.emit('MyPlugin',compilation=>{
      //compilation 此次打包的上下文
      for (let name in compilation.assets){
        console.log(name)
        if(name.endswith('.js'))
        {
             const contents =compilation.assetslnamel.source()const withoutComments = contents.replace(/\/\*\*+\*\//g,'')
          compilation.assets[name]={
            source:()=withoutComments,
            size:() withoutComments.length}
        }
      }
    })
  }
}
```

![](https://cdn.nlark.com/yuque/0/2025/png/29756964/1741978875120-fd0fe479-664c-46c4-b335-3e5c903137a8.png)

```javascript
const {CleanWebpackPlugin} from 'clean-webpack-plugin'


//...

plugins:[{
  new MyPlugin() , //使用
}]
```

## 开发体验

![](https://cdn.nlark.com/yuque/0/2025/png/29756964/1741979162019-abecb41a-4c69-4384-ae59-e6c8d6c5bbef.png)

这种方式过于原始，会降低开发效率，设想：理想开发环境，能使用 http server 运行，可以类似生产环境区运行，能自己编译自动刷新，自动构建，及时显示结果，大大减少开发重复，支持 source Map ，出现问题时能直接进入文件进行调试。 

## 如何增强 webpack 开发体验？

### watch 工作模式

监听文件变化，自动重新打包进行构建。

- 使用 webpack 命令时，添加`yarn webpack --watch`,开启监视模式，每次修改文件自动打包，专注编码

### Webpack Dev Server(推荐)

官方推出，结合了 watch 模式，一边编码 自动编译 自动刷新浏览器的功能，集成在一起，使用很简单。

- 不会生成 dist 模式，只是把打包结果暂时存放内存当中，devserver 从内存中进行读取，减少磁盘读写操作，加快效率
- `- yarn add webpack-dev-server`
- 默认只会 serve 打包输出文件

### BrowserSync 自动刷新浏览器更新内容（不推荐）

实现自动刷新浏览器进行更新，原理是，dist 内容被 proxy 监听了，直接去刷新浏览器。缺点是太麻烦了，开发效率降低，webpack 会不断的写入 dist 进入磁盘，一直去监听变化也会消耗性能

### 热更新

HMR 模块热更新，运行过程中的及时变化，不会重新刷新浏览器，应用运行状态不受影响。

`webpack-dev-server --hot`

初始配置方法：

```js
  //webpack.config.js
  //...
  const webpack = require('webpack')
  devServer:{
    hot:true
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin()
  ]

```

以上基本配置只能影响样式的热更新但是不能影响到 js 文件。

HMR 解惑：webpack 中的 hmr 不是开箱即用，需要进行其他的手动配置，手动处理模块热替换的内容。但一般的 cli 是帮忙进行处理了，框架下的开发，每种文件都是有规律的。脚手架创建的项目内部都继承了 HMR

### source map
source map是编译后代码和原始代码的一个映射关系。在生产环境，sourcemap不能发布到线上，通常做法是上传到异常监控服务，用于解析线上的错误信息

## 生产环境优化
### mode（模式）通过为不同的工作环境创建不同的配置

### Tree Shaking
TreeShaking 不是指某个配置选项，是一组功能搭配使用之后的效果。

production 模式下自动启用

```js
  //webpack.config.js

//...
optimization:{
  usedExports:true,  //会把没用到的包都不打 去除
  minimize:true  //压缩输出结果
}

```
Tree Shaking&Babel的关系：

**Tree Shaking 前提是ES modules**, 由webpack打包的代码必须是ESM ，为了转换es的新特性，使用babel loader转换es6->js；
最新版本的babel-loader不会导致tree-shaking失效，


-  合并模块
```js
optimization:{
  usedExports:true,  //会把没用到的包都不打 去除
  minimize:true,
  concatenateModules:true    //尽可能多的把模块打包到同一个函数

}

```
- sideEffects
副作用，开发npm包时候，一般用于npm包标记是否有副作用

生产模式下默认开启，会判断package.json下是否开启了sideEffect
```js
optimization:{
  sideEffect:true,  //是否存在福泽园
  // usedExports:true,  //会把没用到的包都不打 去除
  // minimize:true,
  // concatenateModules:true    //尽可能多的把模块打包到同一个函数

}

```

```json
  "sideEffects":false
```

### Code Splitting（代码分割 ）

项目所有代码都打包到一起，如果应用很复杂 模块很多，bundle体积就很大。并不是每个模块都需要在启动时进来就加载的。

**把打包结果，按一定规则分离到多个bundle中，根据应用需要按需加载**

分包的好处：
1. 提高首屏性能
2. 提高缓存效率

两种分包方式：
1. 多入口打包（Multi Entry）：根据业务配置不同的打包入口，此时会输出多个打包结果。
  多用于传统的多页应用程序， 一个页面对应一个打包入口。对于公共的部分就提取到公共的结果中

  ```js
  //webpack.config.js  ....

  entry:{
    "index":'./src/index.js',   //多人口采用对象的形式，使用 key 为入口文件名，value是路径
    "alarm":'./src/alarm.js'
  }
  ```
 但是


2. 采用es module的动态导入，实现模块按需加载。此时也会把动态导入的内容，分到多个bundle中。比如在引入路由的时候使用import就可以将每一个视图所依赖的模块进行分包
使用import('./xxx.js')

3. 将运行时的代码单独分包，但由于运行的代码体积较小，所以优化效果不明显

###hash文件名（文件指纹）
输出文件名。可以出现缓存现象。生产模式下给文件名hash值，避免文件更新出现缓存的问题。
- hash: 项目级别的。只要项目更新，所有hash值都会重新编写改变。且所有的文件都公用同一个hash
- chunkhash:chunk级别，只要是同一路的打包，chunk都是相同
- contenthash: 根据文件的内容生成，具有唯一性，只要文件改变就重新生成，这是解决缓存问题最好选择。
```js
fileName:'[name]-[hash].bundle.js'  
fileName:'[name]-[chunkhash].bundle.js'  
fileName:'[name]-[contenthash].bundle.js'  
```

### 并行处理打包优化
- happyPack：多进程方式运行资源加载loader逻辑，5.0慢慢去除
- thread-loader：webpack官方出品，同样以多进程进行处理，后续会优化
- parallel-webpack：运用于多入口项目
- terserWebpackPlugin：支持多进程方式代码压缩、uglify功能

