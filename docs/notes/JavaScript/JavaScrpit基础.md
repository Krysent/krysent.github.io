# JavaScript基础整理
## 数据类型、变量和变量提升
### 数据类型
在 JavaScript 中，我们可以分成两种类型：
- 基本类型
- 复杂类型
两种类型的区别是：存储位置不同

基本类型主要为以下6种：
- **Number**
```js
// 数值最常⻅的整数类型格式则为⼗进制，还可以设置⼋进制（零开头）、⼗六进制（0x开头）
let intNum = 55 // 10进制的55
let num1 = 070 // 8进制的56
let hexNum1 = 0xA //16进制的10

// 浮点类型则在数值汇总必须包含⼩数点，还可通过科学计数法表示
let floatNum1 = 1.1;
let floatNum2 = 0.1;
let floatNum3 = .1; // 有效，但不推荐
let floatNum = 3.125e7; // 等于 31250000

// 在数值类型中，存在⼀个特殊数值 NaN ，意为“不是数值”，⽤于表示本来要返回数值的操作失败了
// （⽽不是抛出错误）
console.log(0/0); // NaN
console.log(-0/+0); // NaN
```
- **String**

字符串可以使⽤双引号（"）、单引号（'）或反引号（`）标示
```js
let firstName = "John";
let lastName = 'Jacob';
let lastName = `Jingleheimerschmidt`
```
字符串是不可变的，意思是⼀旦创建，它们的值就不能变了
```js
let lang = "Java";
lang = lang + "Script"; // 先销毁再创建
```
- **Boolean**

Boolean （布尔值）类型有两个字⾯值： true 和 false

通过 Boolean 可以将其他类型的数据转化成布尔值

|数据类型 |转换为 true 的值| 转换为 false 的值|
|--------|---------------|-----------------|
|String |⾮空字符串 |""|
|Number |⾮零数值（包括⽆穷值） |0 、 NaN|
|Object |任意对象 |null|
|Undefined |N/A （不存在） |undefined|

- **Undefined**

Undefined 类型只有⼀个值，就是特殊值 undefined 。当使⽤ var 或 let 声明了变量但没有初始化时，就相当于给变量赋予了 undefined 值
```js
let message;
console.log(message == undefined); // true
// 包含 undefined 值的变量跟未定义变量是有区别的

let message; // 这个变量被声明了，只是值为 undefined
console.log(message); // "undefined"
console.log(age); // 没有声明过这个变量，报错


```
- **null**

Null 类型同样只有⼀个值，即特殊值 null.

只要变量要保存对象，⽽当时⼜没有那个对象可保存，就可⽤ null 来填充该变量

逻辑上讲， **null 值表示⼀个空对象指针，这也是给 typeof 传⼀个 null 会返回 "object" 的原因**
```js
let car = null;
console.log(typeof car); // "object" 所以使用typeof判断null值会出问题
```
undefined 值是由 null 值派⽣⽽来
```js
console.log(null == undefined); // true
```

- **symbol es6+新增**

Symbol （符号）是原始值，且符号实例是唯⼀、不可变的。符号的⽤途是确保对象属性使⽤唯⼀标识
符，不会发⽣属性冲突的危险
```js
let genericSymbol = Symbol();
let otherGenericSymbol = Symbol();
console.log(genericSymbol == otherGenericSymbol); // false
let fooSymbol = Symbol('foo');
let otherFooSymbol = Symbol('foo');
console.log(fooSymbol == otherFooSymbol); // false
```

- **BigInt es6+新增**
最大安全数字Number.MAX_SAFE_INTEGER =9007199254740991。必须是整数，不能是小数！
```js
var obj=456n;此时obj就是最大数数据类型，而不是数字数据类型了
console.log(Symbol() == Symbol()); //false
console.log(Symbol('AA') == Symbol('AA')); //false
let n = Symbol('AA');
let m = n;
console.log(n == m); //true 


```


复杂数据类型，又成引用数据类型
- Object
- Array
- Function

引用类型，栈内存中存储的是引用地址，堆内存中存储的是实际的值

### 变量提升
提到变量提升，首先要引入一个“预编译的概念”。

预编译是JavaScript中一个重要的概念，经常出现在面试中。JavaScript中的"var"变量提升和预编译是紧密相关的概念，它们在理解JavaScript中变量声明和作用域的工作方式时非常重要。今天我们来深入聊聊预编译，让大家理解预编译和变量提升的底层逻辑。本文会使用简单的例子以及通俗易懂的语言，小白没压力。

关于变量提升，先看代码：
```js
 var a = 123
    console.log(a);

    // 很明显，答案输出123.让我们对这串代码改动一下。

    console.log(x); // 输出undefined
    var x = 5;
```

按正常逻辑来说，这串代码应该会报错，但是我们可以发现实际上输出的是undefined,这是因为使用var声明变量会出现变量提升的效果，就相当于：
```js
 var a
    console.log(a);
    a = 5
    
    // 这就是变量提升
```
**在JavaScript中，变量声明（使用var关键字）会被"提升"到其作用域的顶部，这意味着在变量声明之前使用变量是合法的，尽管在代码中实际声明变量的位置之前。这是因为JavaScript引擎在执行代码之前会将变量声明提升到作用域的顶部。**

又比如：

```js
function example() {
      console.log(x); // 输出 undefined        
      var x 
      X = 5
      console.log(x); // 输出 5
}

example();

//以上代码相当于：
function example() {
      var x
      console.log(x); // 输出 undefined
      x = 5;
      console.log(x); // 输出 5
}

example();
```
那为什么会变量提升呢？

**JavaScript的编译过程通常分为两个主要步骤：预编译（Compilation）和执行（Execution）。预编译是指JavaScript引擎在实际执行代码之前，对代码进行一些处理，包括变量提升和函数声明。在预编译阶段，JavaScript引擎会扫描代码，找到所有变量声明和函数声明，并将它们提升到适当的作用域。**

+ 预编译发生在函数执行之前

+ 预编译发生在全局区

1. 预编译发生在函数执行之前

创建AO对象   （Action Object）
找形参和变量声明，将变量声明和形参作为AO的属性名，值为undefined
将形参和实参值统一
在函数体内找函数声明，将函数名作为AO对象的属性名，值赋予函数体

就拿上述为例：

```js
function example(x) {
      console.log(x);   //输出   2      
      var x 
      x = 5
      console.log(x);  //输出  5
}

example(2);

//1.首先我们先创建一个AO对象
AO:{
        //2.开始找变量声明和形参
    x : undefined
    //3.将形参和实参值统一
    x :undefined ==> x : 2
    //4.由于函数体内没有函数声明，跳过该步骤
    
}
```
我们已经完成一次预编译了，现在函数开始执行，由上到下，当函数执行到第一个 console.log(x) 时，它将从AO对象中寻找x的值，输出为2.函数继续向下执行，变量声明，跳过，当发现赋值语句 x = 5时，将AO对象中x的值改变为5. 函数继续向下执行到 第二个console.log(x) 时，输出为 5.

接下来我们一起来看看一道有点难度的题
```js
function foo(a, b) {
    console.log(a);  //输出 1
    c = 0
    var c;
    a = 3    //  a : undefined ==> 3   函数执行时
    b = 2    //  b : undefined ==> 2
    console.log(b);  // 输出 2
    function b() { }
    function d() { }
    console.log(b);  // 输出 2


}
foo(1)

//那是怎么预编译呢？

    AO：{                                
    a : undefined   ==> a : 1 //统一值                 
    b : undefined   ==> b : function b(){}     
    c : undefined   ==> d : function d(){}
                            //函数声明，属性名为函数名，值赋予函数体
}
//当编译完成后再去执行函数，这样我们就很容易得出答案啦。

```
2. 预编译发生在全局区

 ①创建GO对象 （Global Object）

 ②找变量声明，将变量声明作为GO的属性名，值为undefined

 ③在全局找函数声明，将函数名作为GO对象的属性名，值赋予函数体

我们直接上例子看看是怎么个事
```js
var a = 100
function fn() {
    console.log(a);
}

//解析
GO：{//找变量声明
    a : undefined
    //找函数声明
    fn : function fn()
}
fn()

```
但我们可以发现，函数预编译和全局预编译在一段代码中通常一起发生，比如上图，当预编译全局完成时，开始执行，当执行完 a = 100后，准备执行函数fn(),这时预编译发生在函数执行时。

再来一个例子，他们结合在一起时：
```js
a = 100
function fn() {
    console.log(a);   // 输出  100
    b = 200
    var b          // 输出   200
    console.log(b)     
}
fn()
var global
//预编译完成之后 ，我们发现这样GO对象和AO对象都会存在：
GO: {
a : undefined  
fn : function fn()
}

AO: {
b : undefined
}
```
AO里面没有a，为什么当console.log(a)时会输出呢？而我们发现，GO函数里有a,是不是用了GO里面的a呢？这里我们就要引出调用栈的概念了

上面所说的AO、GO对象其实是属于执行上下文的一部分，便于我们理解

调用栈用于跟踪函数的调用顺序和执行上下文的管理。每当函数被调用，一个新的执行上下文会被推入调用栈，表示该函数的执行。

全局预编译和函数预编译的结果在执行上下文中存储，然后被推入调用栈。调用栈的顶部始终包含当前正在执行的函数的上下文。

全局执行上下文分为变量环境和词法环境，而我们用var声明的变量存在变量环境中。我们都知道栈是先进后出，为什么这里全局执行上下文在栈底部呢，也就是比fn执行上下文先进来，因为在调用栈中，全局预编译通常会在函数预编译之前完成，因此全局预编译的结果位于调用栈的底部，而函数的预编译结果则根据函数调用的顺序依次位于调用栈中。

当函数执行时，需要输出a，但是在fn执行上下文里面并没有找到a这个东西，如果变量在当前函数的执行上下文找不到，JavaScript引擎会在全局执行上下文中寻找变量

详细可参考文章<a target='_blank' href='https://juejin.cn/post/7294663087944024115?searchId=20250327153217D38B1D19BD8D8E0F2B45#heading-4'>var为什么会变量提升？一盏茶的功夫让你彻底熟悉预编译</a>






## 作用域、作用域链、执行上下文
**作用域**

作用域负责收集和维护由所有声明的标识符（变量）组成的一系列查询，并实施一套非常严格的规则，确定当前执行的代码对这些标识符的访问权限。—— 摘录自《你不知道的JavaScript》(上卷)

作用域有两种工作模型：词法作用域和动态作用域，JS采用的是词法作用域工作模型，词法作用域意味着作用域是由书写代码时变量和函数声明的位置决定的。(with 和 eval 能够修改词法作用域，但是不推荐使用，对此不做特别说明)

作用域分为：
+ 全局作用域
+ 函数作用域
+ 块级作用域

**作用域链**
作用域链就是从当前作用域开始一层一层向上寻找某个变量，直到找到全局作用域还是没找到，就宣布放弃。这种一层一层的关系，就是作用域链。

**JS执行上下文栈(后面简称执行栈)**

执行栈，也叫做调用栈，具有 LIFO (后进先出) 结构，用于存储在代码执行期间创建的所有执行上下文。规则如下：

首次运行JavaScript代码的时候,会创建一个全局执行的上下文并Push到当前的执行栈中，每当发生函数调用，引擎都会为该函数创建一个新的函数执行上下文并Push当前执行栈的栈顶。
当栈顶的函数运行完成后，其对应的函数执行上下文将会从执行栈中Pop出，上下文的控制权将移动到当前执行栈的下一个执行上下文。

## 闭包
## 原型和原型链
## 深拷贝和浅拷贝
## 对象
## 数组
## 字符串
## dom操作
## bom
