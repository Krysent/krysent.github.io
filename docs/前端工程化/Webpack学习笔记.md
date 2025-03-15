![](https://cdn.nlark.com/yuque/0/2025/png/29756964/1741976404340-c7d93155-5ba6-42f0-aa2b-35aaade6da7b.png)

#
## 核心工作过程
**在项目中会散落很多文件.js\.html\.css\.less\.png\.json\.jpg等，通过打包入库index.js开始解析，每个资源模块需要的依赖模块，形成项目中所有文件间的一个依赖个关系树。有了关系树之后开始递归遍历这个依赖树，然后找到每个模块需要的加载器去加载，加载到结果放到bundle.js里面，实现整个项目的打包。其中loader机制起到很重要的作用，有了loader起到所有资源的加载。**

![](https://cdn.nlark.com/yuque/0/2025/png/29756964/1741976555591-3a783b67-9632-4967-bac0-c60e0d03c5b4.png)

## Loader
### Loader工作原理
js代码，将输入的信息转化成新的js代码，类似于一个管道。

![](https://cdn.nlark.com/yuque/0/2025/png/29756964/1741977452825-7a4757f8-aa03-470d-8fa8-9108ebe56b89.png)

![](https://cdn.nlark.com/yuque/0/2025/png/29756964/1741977463138-455c8d8e-528c-493d-a54e-656a74530ce1.png)

### 手写一个Loader
```javascript
//markdown-loader.js
module.exports=source =>{
    //loader返回结果一定要是js代码，loader是直接将转换的结果塞入bundle.js包中

    const html = marked(source)

    return `module.exports = ${JSON.stringify(html)}`

}

```

```javascript
//....
module:{
  rules:[{
    test:/.md$/,
    use:['html-loader','./markdown-load']  //可以直接使用相对路径来引用编写好的loader
  }]

}
```

 **use数组有多个loader时候，loader执行顺序是从后往前，从右往左依次执行。放在后面的loader优先级高先执行。**

## Plugin
插件机制，增强webpack的自动化能力，loader实现资源模块的加载和打包，plugin解决除了资源加载以外的其他自动化工作。例如 清除dist目录、拷贝静态文件到静态目录、压缩代码，实现了大多数前端工程化工作。

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
仔细过插件的官方说明和文档，了解api参数用法，不需要所有的都认识，用的时候再 

+ clean-webpack-plugin : 自动清理dist目录插件，可以清空覆盖上一次dist内容，方便已经清除的内容积累
+ html-webpack-plugin：通过webpack自动生成bundle.js的html
    - 修改html的标题、meta等信息
    - 在src中新建index.html模版，比如一般的react、vue项目中就有入口html，可以使用`<%= htmlWebpackPlugin.options.title %>`来访问config中的插件配置
+ copy-webpack-plugin ： 用来拷贝需要的静态文件，比如favicon，直接将静态资源复制到dist中



### 手写一个Plugin
plugin通过钩子机制来实现，在plugin工作中会有很多环节，每个节点都挂了很多的钩子，可以参考官方文档，自己定义插件往这些钩子上挂

**plugin是一个函数或者包含一个apply的方法**

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

这种方式过于原始，会降低开发效率，设想：理想开发环境，能使用http server运行，可以类似生产环境区运行，能自己编译自动刷新，自动构建，及时显示结果，大大减少开发重复，支持source Map ，出现问题时能直接进入文件进行调试。

### 何增强webpack开发体验？
### watch 工作模式
监听文件变化，自动重新打包进行构建。

+ 使用webpack命令时，添加`yarn webpack --watch `,开启监视模式，每次修改文件自动打包，专注编码

### Webpack Dev Server(推荐)
官方推出，结合了watch模式，一边编码 自动编译 自动刷新浏览器的功能，集成在一起，使用很简单。

+ 不会生成dist模式，只是把打包结果暂时存放内存当中，devserver从内存中进行读取，减少磁盘读写操作，加快效率
+ `- yarn add webpack-dev-server `
+ 默认只会serve打包输出文件



### BrowserSync自动刷新浏览器更新内容（不推荐）
实现自动刷新浏览器进行更新，原理是，dist内容被proxy监听了，直接去刷新浏览器。缺点是太麻烦了，开发效率降低，webpack会不断的写入dist进入磁盘，一直去监听变化也会消耗性能



