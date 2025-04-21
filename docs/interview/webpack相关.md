# webpack相关面试题

## 如何优化weback的构建或打包速度？


### 加快构建打包速度的方法

使用 speed-measure-webpack-plugin 插件可以测量各个插件和loader所花费的时间，量化打包速度，判断优化效果

1. 缩小文件的搜索范围(配置include/exclude resolve.modules resolve.mainFields alias noParse extensions)
 - 通过 exclude、include 配置来确保转译尽可能少的文件
 - 优化 resolve.modules 配置
 - 优化 resolve.mainFields 配置
 - alias
 - noParse
 - extensions
2. 在一些性能开销较大的 loader 之前添加 cache-loader，将结果缓存中磁盘中
3. 使用 happypack 开启多进程打包
4. 除了使用 Happypack 外，我们也可以使用 thread-loader 开启多进程打包 loader
5. 使用 HardSourceWebpackPlugin 为模块提供中间缓存，第二次构建可大量节约时间
6. 使用 IgnorePlugin 忽略第三方包指定目录，例如 moment 的本地语言包
7. 使用 webpack-parallel-uglify-plugin 开启 JS 多进程压缩

### 减少打包文件体积的方法

引入 webpack-bundle-analyzer 分析打包后的文件，判断哪些包还可以拆分和优化

1. 使用 externals 配置，然后将 JS 文件、CSS 文件和存储在 CDN
2. 使用 DllPlugin（动态链接库）将 bundles 拆分，使用 DllReferencePlugin(索引链接) 对 manifest.json 引用，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间
3. 使用 optimization.splitChunks 配置抽离公共代码
4. 使用 IgnorePlugin 忽略第三方包指定目录，例如 moment 的本地语言包（重复）
5. 使用 url-loader 或 image-webpack-loader 对图片进行转化或者压缩处理
6. 优化 SourceMap，开发环境推荐： cheap-module-eval-source-map，生产环境推荐：cheap-module-source-map
7. 按需加载，项目中的路由懒加载
8. webpack自身的优化：
 - tree-shaking，在生产环境下，会自动移除没有使用到的代码
 - scope hosting 作用域提升，变量提升，可以减少一些变量声明
 - babel 配置的优化，配置 @babel/plugin-transform-runtime，重复使用 Babel 注入的帮助程序，以节省代码大小的插件

 ## webpack如果使用了hash命名，那是每次都会重写生成hash吗？

 要看webpack的配置（文件指纹，通过 output 中的 filename 设置），有三种情况：

如果是 hash 的话，是和整个项目有关的，有一处文件发生更改则所有文件的hash值都会发生改变且它们共用一个 hash 值；
如果是 chunkhash 的话，只和 entry 的每个入口文件有关，也就是同一个 chunk 下的文件有所改动该 chunk 下的文件的 hash 值就会发生改变
如果是 contenthash 的话，和每个生成的文件有关，只有当要构建的文件内容发生改变时才会给该文件生成新的 hash 值，并不会影响其它文件。
```js
module.exports = {
    entry: {
        app: './scr/app.js',
        search: './src/search.js'
    },
    output: {
        filename: '[name][chunkhash:8].js',
        path:__dirname + '/dist'
    },
	// 通过 MiniCssExtractPlugin 插件设置 css 文件指纹
    plugins:[
        new MiniCssExtractPlugin({
            filename: `[name][contenthash:8].css`
        })
    ],
	 module:{
		// 通过 rules 配置图片的文件指纹设置
		// 设置file-loader的name，使用hash。
        rules:[{
            test:/\.(png|svg|jpg|gif)$/,
            use:[{
                loader:'file-loader',
                options:{
                    name:'img/[name][hash:8].[ext]'
                }
            }]
        }]
    }
}
```

## 关于文件监听原理呢
在发现源码发生变化时，自动重新构建出新的输出文件。

Webpack开启监听模式，有两种方式：

- 启动 webpack 命令时，带上 --watch 参数
- 在配置 webpack.config.js 中设置 watch:true

缺点：每次需要手动刷新浏览器

原理：轮询判断文件的最后编辑时间是否变化，如果某个文件发生了变化，并不会立刻告诉监听者，而是先缓存起来，等 aggregateTimeout 后再执行。

```js
module.export = {
    // 默认false,也就是不开启
    watch: true,
    // 只有开启监听模式时，watchOptions才有意义 
    watchOptions: {
        // 默认为空，不监听的文件或者文件夹，支持正则匹配
        ignored: /node_modules/,
        // 监听到变化发生后会等300ms再去执行，默认300ms        aggregateTimeout:300,
        // 判断文件是否发生变化是通过不停询问系统指定文件有没有变化实现的，默认每秒问1000次
        poll:1000
    }
}
```

## 说一下 Webpack 的热更新原理吧

Webpack 的热更新又称热替换（Hot Module Replacement），缩写为 HMR。 这个机制可以做到不用刷新浏览器而将新变更的模块替换掉旧的模块

HMR的核心就是客户端从服务端拉去更新后的文件，准确的说是 chunk diff (chunk 需要更新的部分)，实际上 WDS 与浏览器之间维护了一个 Websocket，当本地资源发生变化时，WDS（webpack-dev-server） 会向浏览器推送更新，并带上构建时的 hash，让客户端与上一次资源进行对比。客户端对比出差异后会向 WDS 发起 Ajax 请求来获取更改内容(文件列表、hash)，这样客户端就可以再借助这些信息继续向 WDS 发起 jsonp 请求获取该chunk的增量更新。

后续的部分(拿到增量更新之后如何处理？哪些状态该保留？哪些又需要更新？)由 HotModulePlugin 来完成，提供了相关 API 以供开发者针对自身场景进行处理，像react-hot-loader 和 vue-loader 都是借助这些 API 实现 HMR。

## 代码分割的本质是什么？有什么意义呢？

代码分割的本质其实就是在源代码直接上线和打包成唯一脚本 main.bundle.js 这两种极端方案之间的一种更适合实际场景的中间状态。

源代码直接上线：虽然过程可控，但是http请求多，性能开销大。

打包成唯一脚本：一把梭完自己爽，服务器压力小，但是页面空白期长，用户体验不好。

## webpack中的 loader 和 plugin 有什么区别？

loader 它是一个转换器，只专注于转换文件这一个领域，完成压缩、打包、语言编译，它仅仅是为了打包。并且运行在打包之前。Loader 本质就是一个函数，在该函数中对接收到的内容进行转换，返回转换后的结果。 因为 Webpack 只认识 JavaScript，所以 Loader 就成了翻译官，对其他类型的资源进行转译的预处理工作。

而 plugin 是一个扩展器，它丰富了 webpack 本身，为其进行一些其它功能的扩展。它不局限于打包，资源的加载，还有其它的功能。所以它是在整个编译周期都起作用。

## 会手写loader吗？
loader 从本质上来说其实就是一个函数（webpack里是一个node模块）。将相关类型的文件代码(code)给它，根据我们设置的规则，经过它的一系列加工处理后还给我们加工好的代码。

loader 编写原则：

单一原则: 每个 Loader 只做一件事；
链式调用: Webpack 会按顺序链式调用每个 Loader；
统一原则: 遵循 Webpack 制定的设计规则和结构，输入（UTF-8 格式编码）与输出均为字符串，各个 Loader 完全独立，即插即用；
Loader 运行在 Node.js 中，我们可以调用任意 Node.js 自带的 API 或者安装第三方模块进行调用。

加载本地 Loader 方法:

Npm link
ResolveLoader
案例：把 JavaScript 代码中的注释语法去除的 loader:

将 // @require '../style/index.css' 转换成 require('../style/index.css');

```js
function replace(source) {
    // 使用正则把 // @require '../style/index.css' 转换成 require('../style/index.css');  
    return source.replace(/(\/\/ *@require) +(('|").+('|")).*/, 'require($2);');
}

module.exports = function (content) {
    return replace(content);
};
```

## 聊一聊Babel原理吧

大多数JavaScript Parser遵循 estree 规范，Babel 最初基于 acorn 项目(轻量级现代 JavaScript 解析器) Babel大概分为三大部分：

解析：将代码转换成 AST

- 词法分析：将代码(字符串)分割为token流，即语法单元成的数组
- 语法分析：分析token流(上面生成的数组)并生成 AST
- 转换：访问 AST 的节点进行变换操作生产新的 AST。Taro就是利用 babel 完成的小程序语法转换
- 生成：以新的 AST 为基础生成代码

## webpack-dev-server的原理是什么？

webpack-dev-server启动了一个使用 express 的 Http 服务器，这个服务器与客户端采用 websocket 通信协议，当原始文件发生改变，webpack-dev-server 会实时编译。

webpack-dev-server 伺服的是资源文件，不会对 index.html 的修改做出反应

webpack-dev-server 生成的文件在内存中，因此不会呈现于目录中，生成路径由 content-base 指定，不会输出到 output 目录中。

默认情况下: webpack-dev-server 会在 content-base 路径下寻找 index.html作为首页

webpack-dev-server 不是一个插件，而是一个web服务器，所以不要想当然地将其引入

## 说说对 Vite 的理解和 Vite 的实现原理

Vite 是一个基于 ES 模块的开发服务器和构建工具，专为现代前端开发而设计。它的目标是提供快速的冷启动、按需编译和热模块替换等功能，以提供更好的开发体验。

Vite 的实现原理主要基于两个关键点：ES 模块和开发服务器。

ES 模块：Vite 利用了浏览器原生支持的 ES 模块特性。在开发过程中，Vite 不会像传统的打包工具一样将所有代码打包成一个或多个捆绑文件。相反，它会将每个单独的模块作为一个独立的文件提供。这样做的好处是可以避免整体打包的开销，使得开发过程更快速。

开发服务器：Vite 使用自己的开发服务器来提供开发环境。当您启动 Vite 时，它会在后台运行一个服务器，拦截浏览器对模块的请求。当浏览器请求一个模块时，Vite 会根据模块的路径动态地构建和返回该模块的内容。这种按需编译的方式使得只有在需要时才会编译相关的模块，从而加快了开发过程。

在开发过程中，Vite 还使用了 HMR（热模块替换）技术，使得在修改代码后，只需要替换相应的模块，而不需要刷新整个页面。这样可以实现非常快速的代码更新和实时预览。

总结起来，Vite 的实现原理可以概括为：利用浏览器原生的 ES 模块特性，按需编译和提供模块，配合开发服务器和 HMR 技术，实现快速的冷启动、按需编译和热模块替换等功能，从而提供更好的开发体验

## Webpack 和 vite 有什么区别

Webpack和Vite是两个常用的前端构建工具，它们在一些方面有一些区别，下面是它们的一些主要区别：

构建速度：Vite在开发模式下具有更快的冷启动和热模块替换（HMR）速度。这是因为Vite利用了浏览器原生的ES模块特性，按需编译和提供模块，而不是像Webpack那样进行完整的打包。这使得Vite在开发过程中能够更快地构建和更新模块，提供更快的开发体验。

开发服务器：Vite使用自己的开发服务器，在开发模式下提供实时预览和快速的HMR。而Webpack通常需要借助webpack-dev-server或webpack-dev-middleware等插件来提供类似的开发服务器功能。

配置：Webpack的配置文件相对复杂，需要手动配置各种loader、plugin和optimization等选项来处理不同类型的文件和优化构建过程。而Vite的配置相对简单，大部分情况下不需要额外配置，它会根据文件类型自动选择合适的插件和优化策略。

生态系统：Webpack是一个非常成熟和强大的构建工具，拥有庞大的生态系统和丰富的插件支持，可以处理各种复杂的构建需求。Vite相对较新，生态系统相对较小，但它的发展速度很快，并且在Vue.js等框架中得到了广泛的应用和支持。

生产模式：Webpack在生产模式下提供更全面的打包和优化功能，可以生成高度优化的静态文件。Vite在生产模式下也能进行打包和优化，但相对于Webpack而言，Vite更加专注于开发体验和快速构建，因此在一些复杂的构建需求上可能需要额外的配置和插件支持。

总的来说，Webpack是一个功能强大且成熟的构建工具，适用于处理各种复杂的构建需求。Vite则专注于提供快速的开发体验和现代前端框架的支持，特别适合用于快速原型开发和中小型项目。选择使用哪个工具取决于项目的具体需求和个人偏好

## 说一下 vite 相对与 webpack 的优化

Vite相对于Webpack在性能和开发体验上进行了一些优化，下面是一些Vite相对于Webpack的优化点：

快速的冷启动：Vite利用了浏览器原生的ES模块特性，按需编译和提供模块，避免了完整的打包过程。这使得Vite在启动项目时可以更快地构建和启动开发服务器，减少了冷启动的时间。

快速的热模块替换（HMR）：Vite通过浏览器原生的ES模块特性实现了更快速的HMR。它可以在开发过程中快速更新修改的模块，而无需重新加载整个应用程序。这提供了更快的开发体验，可以立即看到代码更改的效果。

按需编译：Vite只编译需要的模块，而不是像Webpack那样对整个项目进行完整的打包。这减少了不必要的编译时间，特别是在大型项目中，只有修改的模块才会重新编译，提高了开发效率。

原生ES模块支持：Vite直接使用浏览器原生的ES模块加载机制，而不需要进行模块转换和打包。这减少了构建过程中的处理和转换时间，提供了更快的构建速度。

静态资源优化：Vite在生产模式下对静态资源进行了优化，例如自动压缩代码、提供按需加载和预加载等功能。这有助于减小生成的静态文件的大小，提高应用程序的加载速度和性能。

需要注意的是，Vite并不是取代Webpack，而是在开发过程中提供了更快速的开发体验。在生产环境中，Vite会使用Rollup等工具进行完整的打包和优化，以生成适用于生产环境的静态文件。因此，在一些复杂的构建需求和生态系统支持方面，Webpack仍然是一个更全面和成熟的选择。