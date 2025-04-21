# typescript 学习笔记

## 简介

1. Typescript 由微软开发，是基于 Javascript 的一个扩展语言。
2. TypeScript 包含了 avaScript 的所有内容，即:TypeScript 是 Javascript 的超集
3. TypeScript 增加了:静态类型检査、接口、泛型等很多现代开发特性，因此更适合大型项目的开发。
4. TypeScript 需要编译为 javaScript ，然后交给浏览器或其他 JavaScript 运行环境执行。

## 为何需要 ts？

JavaScript 当年诞生时的定位是浏览器脚本语言，用于在网页中嵌入一些简单的逻辑，而且代码量很少。

随着时间的推移，JavaScript 变得越来越流行，如今的 JavaScript 已经可以全栈编程了。

现如今的 JavaScript 应用场景比当年丰富的多代码量也比当年大很多，随便一个 JavaScript 项目的代码量，可以轻松的达到几万行，甚至十几万行!

然而 JavaScript 当年“出生简陋”，没考虑到如今的应用场景和代码量，逐渐的就出现了很多困扰：

1. 不清不楚的数据类型
2. 有漏洞的逻辑
3. 访问不存在的属性
4. 低级的拼写错误

所以为了以上问题，ts 推出了静态类型检查！

**静态类型检查**

在代码运行前进行检查，发现代码的错误或不合理之处，减小运行时异常的出现的几率，此种检查叫『静态类型检查』，TypeScript 和核心就是「静态类型检查』，简言之就是把运行时的错误前置同样的功能，TypeScript 的代码量要大于 JavaScript，但由于 TypeScript 的代码结构更加清晰，在后期代码的维护中 TypeScript 却远胜于 JavaScript。

## 编译 typescript

ts 在浏览器端是不能直接编译，浏览器不认 ts，node 也不认 ts 语法。

而是先将 ts 编译转成 js 再交给浏览器或 node 运行。

1. 命令行编译

   手动操作，每次都需要自己去编译转 js，然后运行 js

```js
//1. 创建ts文件，编写代码
//demo.ts
const person = {
    name:'xxx',
    age:18
}
console.log(person.name,person.age);

//2. 全局安装typescript
npm i TypeScript -g

//3. 使用命令行编译
tsc demo.ts
```

2. 自动化编译（推荐）

通过 init 初始化来控制。常用。

```js
//1. 初始化tsconfig编译控制文件
tsc --init
//项目工程中会初始化一个 tsconfig.json配置文件，包含着编译的配置。默认编译版本为es7，可以手动调整为其他版本


//2. 监视目录中的.ts文件的变化
tsc --watch


//3. 小优化：当编译出错时不生成新js文件
tsc --noEmitOnError --watch
// 当然也可以在tsconfig.json中修改 noEmitOnError的配置
```

## 类型声明

使用 `:` 来对变量或函数变量进行类型声明

```js
let a: string;
let b: number;
let c: boolean;
a = 9; // 报错
a = false; // 报错
//只能赋值为string类型的值

//函数中
function foo(x: number, y: number): number {
  return x + y;
  //return x+y+'hello' 报错
}

let result = foo(1, 2);
//x，y必须是number，foo返回值也必须是number，否则报错
```

## 类型推断

ts 有一个功能，可以根据代码来推断变量的类型

```js
let a = -88;
a = "hello"; //error
```

## 类型总览

1. JavaScript 中的类型
   number\string\boolean\null\undefined\symbol\bigint\object
2. typescript 中的类型
   - 以上 js 八种类型
   - 六个新类型
     - any
     - unknow
     - never
     - void
     - tuple 元祖
     - enum 枚举
   - 两个自定义类型方式
     - type
     - interface 接口

**注意点**

在 Javascript 中的这些内置构造函数:Number、String、Boolean 的包装对象，他们用于创建包装对象，在日常开发时很少使用，在 TypeScript 中也是同理，所以在 TypeScript 中进行类型声明时，通常都是用小写的 number、stringboolean

```js
let a: String

let a: string

这两个string大小写不同，表示的含义也不同
一般开头大写的类型，如Number\String\Boolean 会认为创建了包装对象；小写的number、string是普通的类型
```

1. 原始类型 VS 包装对象
   - 原始类型:如 numberboolean ，在 JavaScript 中是简单数据类型，它们在内存 string 中占用空间少，处理速度快。
   - 包装对象:如 Number 对象、String 对象、Boolean 对象，是复杂类型，在内存中占用更多空间，在日常开发时很少由开发人员自己创建包装对象。
2. 自动装箱:JavaScript 在必要时会自动将原始类型包装成对象，以便调用方法或访问属性

## 常用类型

1. any

   `any`含义是：任意类型，一旦用 any 来限制变量，那就意味着放弃了对该变量的类型检查。任意类型都可以用。不建议使用

```js
let a: any;
a = 1;
a = false;
a = "hello";
// 都是可以的

// 还有隐式的声明方式：
let a; //什么都不写就也是any
```

注意： `any`类型的变量，可以赋值给任意类型的变量，不会报错

```js
let a: any = 1;

let b: string;
b = a; // 这是可以的 不报错
```

2. unknow

   `unknow`含义是：未知类型。当前确实不清楚变量的类型，不知道以后会怎么用。也是`any`的升级版。

区别是，`any`类型的可以赋值给任意类型限制的变量，但是`unknow`赋值给其他类型的变量会报错。

        读取 `any`类型数据的任何属性都不会报错，而`unknow`相反

```js
    let str1: string = 'hello'
    str1.toUpperCase()

    let str2:any = 'world'
    str2.toUpperCase()   //不报错

    let str3:unknow = 'good'
    str3.toUpperCase()   //报错 str的类型是未知

    //如果要使unknow不报错，需要强制断言通过as，指定类型
    (str3 as string).toUpperCase() //可以
```

3. never

   `never` 表示从来没有的类型。一般用来限制函数的返回。限制的函数不能顺利调用结束。没有返回值（undefined、null、0、false 都不行）或死循环。

通常用来现在一个抛出报错的函数

```js
function demo(): never {
  throw new Error("函数报错了！");
}
let r = demo();
```

4. void

   `void` 表示空。 - 通常用于函数返回值的限制，含义：函数不能返回任何值，返回值为空，调用者也不依赖这个函数的返回值进行任何操作

```js
function foo(): void {
  const a = 1;
  console.log(a);
}
foo();
//该函数没有返回值使用void不报错
```

编写者没有编写去 return，所以 foo 函数没有显式的返回值，但是有一个隐式的返回值，undefined，即：虽然函数为 void 类型，但是也可以接受 undefined 的，undefined 是 void 可以接受的一种“空”

```js
//以上等价于
function foo(): void {
  const a = 1;
  console.log(a);
  return; //  return undefined
}
foo();
```

5. object

   实际开发中用的频率极小，object 和 Object 的区别：

object，变量能存储的类型是非原始类型

Object，能存储的类型是可以调用到 Object 方法的类型，除了 undefined 和 null 以外的任何值。

**声明对象类型**

- 限制一般对象，通常用以下方式

```js
let person = {
    name : string,    //间隔符号可以是  ，  ；  或者回车
    age?:number //? 表示可选属性,可以赋值也可以不赋值
}
person={
    name:'123'
}
```

- 索引签名：允许定义的对象拥有任意数量的属性，这些属性的键的类型都是可变的，常用来描述类型不确定的属性，具有动态属性的对象

```js
let person = {
    name: string,
    age?:number,
    [key:string]:any   //key 用string限制，值用any限制  。 可以不用key这个单词，可以任意更换
}

person={
    name:'123',
    age:123,
    time:'2023',
    address:'北京'  //可以任意赋值
}
```

**声明函数类型**

```js
let count: (a: number, b: number) => number;

count = function(x, y) {
  return x + y;
};

//ts中函数声明时使用的=>箭头表示函数类型，描述参数类型和返回类型
//js中=>是一种定义函数的语法，而不是具体的函数实现
//函数类型声明还可以使用：接口、自定义类型等方式...
```

**声明数组类型**

```js
let arr1: string[];
let arr2: Array<number>; //使用尖括号  泛型

arr1 = ["a", "b"];
arr2 = [1, 2, 3];
```

6. tuple 元祖

   是一种形式，tuple 不是关键字。元祖是一种特殊的数组类型，可存储固定数量的元素，并且每个元素的类型都是已知的且可以不同，元祖用于精确描述一组值的类型，？表示可选元素

```js
let arr1:[string,number]   //数组第一个必须是string，第二个必须是number
let arr2:[number,boolean]   //数组第一个必须是number，第二个必须是boolean

let arr3:[number,...string[]]   //数组第一个必须是number类型，后面的元素都是string

arr1=['123',123]
arr2 = [2,3]
arr3= [1,'333','hello']

```

7. enum 枚举

   可以定义一组命名常量，他能增强代码的可读性，也让代码更好的维护。

```js
//数字枚举
enum Direction {
    Up,
    Down,
    Left,
    Right
}

console.log(Direction)
//数字枚举是有反向映射的，会自动给每个枚举值做从0开始的索引
Direction[0] = Direction.Up


//字符串枚举
enum DirectionStr {
    Up = 'up',
    Left = 'left',
    Down = 'down'
}
//字符串枚举没有反向映射


// 常量枚举：
// 官方描述:常量枚举是一种特殊枚举类型，它使用 const 关键字定义，在编译时会被内联，避成一些额外的代码。
```

8. type

   `type` 可以为任意类型创建别名，让代码更简洁，可读性更强，同时更方便的去进行类型复用和扩展

```js
// 类型别名使用type关键字，可定义新类型，比如
type Num = number;

let a: Num;
a = 1;
```

**定义联合类型**

比如

```js
type Status = number | string; // 表示status新类型可以是number或者string 统一了一下

function foo(data: Status): void {
  console.log(data);
}

//还有一种用法
type Gender = "男" | "女";

function foo(data: Gender) {}

foo("男");
foo("nv"); //报错
```

**定义交叉类型**

交叉类型(Intersection Types)允许将多个类型合并为一个类型。合并后的类型将拥有所有被合并类型的成员。交又类型通常用于对象类型。

```js
type House = {
  width: number,
  height: number
};

type Address = {
  room: string,
  addr: string
};

type MyHouse = House & Address;

let str: Myhouse;
str = {
  width: 123,
  height: 55,
  room: "102",
  addr: "北京"
};
```

9. 特殊情况

在定义函数时候，限制函数返回值设置 void，那么函数的返回值必须是空

```js
function demo(): void {
  console.log(1);

  return undefined; //或者返回undefined

  //以下都报错
  // return false
  // return 0
  // retrun null
}
```

在使用类型声明来限制函数返回为 void 时候，ts 并不会严格要求返回值为空

```js
type func = () => void;

let demo: func = () => {
  return 100; // 不会报错，可以允许
};
```

**原因**

是为了确保如下代码成立，我们知道 Array.prototype.push 的返回一个数字，而 Array.prototype.forEach 方法期望其回调的返回类型是 void

```js
const str = [1, 2, 3];
const dst = [0];

str.forEach(el => dst.push(el));
```

10. 类

```js
class demo {
    constructor(name:string,age:number){
        this.name = name;
        this.age = age
    }

    speak(){
        console.log(111)
    }
}

class childDemo extends demo {
    constructor (name:string,age:number,gender:string){
        super(name,age)
        this.gender = gender
    }

    override speak(){   //override表示要复写重写父类的方法
        console.log(2)
    }
}

```

11. 属性修饰符

| 修饰符    | 含义     | 规则                               |
| --------- | -------- | ---------------------------------- |
| public    | 公开的   | 可以被：类内部、子类、类外部访问到 |
| private   | 私有的   | 只能被：类内部访问到               |
| protected | 受保护的 | 可以被：类内部、子类 访问到        |
| readonly  | 只读     | 属性是无法修改                     |

12. 抽象类

    概述:抽象类是一种无法被实例化的类，专门用来定义类的结构和行为，类中可以写抽象方法，也可以写具体实现。抽象类主要用来为其派生类提供一个基础结构，要求其派生类必须实现其中的抽象方法。

简记:抽象类不能实例化，其意义是可以被继承，抽象类里可以有普通方法、也可以有抽象方法。

    总结:何时使用抽象类?

    1.定义通用接口:为一组相关的类定义通用的行为(方法或属性)时。

    2.提供基础实现:在抽象类中提供某些方法或为其提供基础实现，这样派生类就可以继承这些实现。

    3.确保关键实现 :强制派生类实现一些关键行为。

    4.共享代码和逻辑:当多个类需要共享部分代码时，抽象类可以避免代码重复。

13. interface 接口

interface 是一种定义结构的方式，主要作用是为:类、对象、函数等规定一种契约。代码的一致性和类型安全，但要注 interface 只能定义格式，不能包含任何实现!

```js

<!-- 定义类结构 -->
interface PersonInterface {
    name:string,
    age:number,
    speak(x:number):void
}
class Person implements PersonInterface {
    constructor( 
        public name:string,
        public age:number){
    }

    speak(x:number):void{
        console.log(1)
    }
}



<!-- 定义对象结构 -->
interface PersonInterface {
    name:string,
    age?:number,
    readonly address:string,
    speak(x:number):void
}
const obj:PersonInterface = {
    name:"张三",
    age:12, //age是可选属性，可以不赋值
    address:'beijing',
    speak:function(){
        console.log(1)
    }
}

obj.address = '南京' // error ：  address 是只读属性 ，不能改 



<!-- 定义函数结构 -->
interface CounterInterface {
    (a:number,b:number):number
}

const count:CounterInterface= (a,b)=>{
    return a+b
}

```

总结:何时使用接口?

a. 定义对象的格式: 描述数据模型、API 响应格式、配置对象..等等，是开发中用的最多的场景。

b. 类的契约:规定一个类需要实现哪些属性和方法。

c. 自动合井:一般用于扩展第三方库的类型，这种特性在大型项目中可能会用到。

14. 一些相似概念的区别

- interface和type的区别？
    + 相同点：都用来定义对象结构，两者在许多场景中可以互换
    + 不同点：interface更专注于定义对象和类的结构，支持继承、合并； type可以定义类型别名、联合类型、交叉类型，但不支持继承和自动合并。

## 泛型

泛型允许我们在定义函数、类或接口时，使用类型参数来表示未指定的类型这些参数在具体使用时才被指定具体的类型，泛型能让同一段代码适用于多种类型，同时仍然保持类型的安全性。

```js
//使用<T>来表示泛型，对还没指定的类型做限制，在使用的时候再做限制
function logData<T>(data:T){
    console.log(data)
}

logData<number>(1)


interface Obj<T>{
    name:string,
    age:number,
    info:T
}

let demo:Obj<number>= {
    name:"123",
    age:123,
    info:32
}

```

## 类型声明文件
类型声明文件是 TypeScript 中的一种特殊文件，通常以 .d.ts 作为扩展名。它的主要作用是为现有的 JavaScript 代码提供类型信息，使得 TypeScript 能够在使用这些JavaScript 库或模块时进行类型检查和提示。

**declare**

```js
declare function add(a: number, b: number): number;declare function mul(a: number,b: number): number;
export { add, mul };
```

