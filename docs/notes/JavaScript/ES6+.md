## ES6+新特性内容整理
## let和const
### 关于let
let 是 ES6 引入的一种变量声明方式，主要用于解决 var 声明变量时的一些问题。let 的本质特性包括：

1. 块级作用域

 let 声明的变量只在其所在的代码块内有效，这与 var 不同。var 声明的变量是函数作用域或全局作用域。
```js
{
    let x = 10;
    var y = 20;
}
console.log(x); // 报错：ReferenceError: x is not defined
console.log(y); // 输出: 20
```
2. 不允许重复声明

在同一作用域内，使用 let 声明同一个变量会导致错误，而 var 允许重复声明。

```js
let a = 1;
// let a = 2; // 报错：Identifier 'a' has already been declared

var b = 1;
var b = 2; // 合法，b 的值会被更新为 2
```
3. 提升（Hoisting）

let 声明的变量会被提升到所在作用域的顶部，但在声明之前是不可用的。这种现象称为“暂时性死区”（Temporal Dead Zone, TDZ）。

```js
console.log(c); // 报错：ReferenceError: Cannot access 'c' before initialization
let c = 3;
```

4. 用于循环中的作用域
在循环中使用 let 声明的变量，每次迭代都会创建一个新的作用域，这在处理异步操作时非常有用。
```js
for (let i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i); // 输出: 0, 1, 2
    }, 1000);
}

//使用 var 声明的变量会导致所有的回调函数共享同一个 i，输出结果为 3 三次。
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log(i); // 输出: 3, 3, 3
    }, 1000);
}

```

### 关于const
const 的本质是 ES6 引入的一个关键字，用于声明常量。它的本质特性主要体现在以下几个方面：
1. 固定的引用
const 声明的变量指向的内存地址是固定的，这意味着你不能重新赋值给该变量。换句话说，const 确保变量的引用不变，但并不意味着引用的数据本身不可变。
```js
const a = 10;
// a = 20; // 报错：Assignment to constant variable.
```

2. 复合类型的可变性
对于复合类型（如对象和数组），const 变量指向的是一个内存地址，而这个地址保存的是一个指向实际数据的引用。因此，虽然 const 保证了这个引用（指针）不会改变，但它指向的数据结构本身是可以修改的。
```js
const obj = { name: 'Alice' };
obj.name = 'Bob'; // 这是合法的，obj 的内容被修改
console.log(obj); // 输出: { name: 'Bob' }

// obj = { name: 'Charlie' }; // 报错：Assignment to constant variable.

```

3. 块级作用域（同let）

4. 不允许重复声明（在同一作用域）

5. 提升（同let）


**let 和 const 的引入使得 JavaScript 的变量管理更加严谨，避免了 var 的一些常见问题，提升了代码的可读性和可维护性。建议在编写现代 JavaScript 时优先使用 let 和 const，以确保更好的代码质量。**



## 解构
## 新增的数组方法
## Class关键字
## Promise相关
<a href='https://es6.ruanyifeng.com/#docs/promise' target='_blank'>可见阮一峰es6教程</a>

**promise.all**

```js
const p = Promise.all([p1, p2, p3]);
```
Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

Promise.all()方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。另外，Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

p的状态是由p1,p2,p3 决定的，分成两种情况。

（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

（3）接受一个 Promise 数组，当所有 Promise 成功时返回结果数组；若任意一个失败，立即以该失败原因拒绝。

（4）即使某个 Promise 失败，其他 Promise 仍会继续执行，但结果会被忽略。

es6+引入的解决异步问题的方案，Promise是一个构造函数，可以通过new来创建一个实例的promise对象。

Promise 是一个对象，它代表了一个异步操作的最终完成或者失败。由于它的 then 方法和 catch、finally 方法会返回一个新的 Promise 所以可以允许我们链式调用，解决了传统的回调地狱问题。


**Promise的状态一经改变就不能再改变**

关于 then 以及 catch 方法：
+ Promise的状态一经改变就不能再改变。
+ .then和.catch都会返回一个新的Promise。
+ catch不管被连接到哪里，都能捕获上层未捕捉过的错误。
+ 在Promise中，返回任意一个非 promise 的值都会被包裹成 promise 对象，例如return 2会被包装为return Promise.resolve(2)。
+ Promise 的 .then 或者 .catch 可以被调用多次, 但如果Promise内部的状态一经改变，并且有了一个值，那么后续每次调用.then或者.catch的时候都会直接拿到该值。
+ .then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获。
+ .then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环。
+ .then 或者 .catch 的参数期望是函数，传入非函数则会发生值透传。
+ .then方法是能接收两个参数的，第一个是处理成功的函数，第二个是处
+ 失败的函数，再某些时候你可以认为catch是.then第二个参数的简便写法。
+ .finally方法也是返回一个Promise，他在Promise结束的时候，无论结果为resolved还是rejected，都会执行里面的回调函数。

finally方法：
+ .finally()方法不管Promise对象最后的状态如何都会执行
+ .finally()方法的回调函数不接受任何的参数，也就是说你在.finally()函数中是没法知道Promise最终的状态是resolved还是rejected的
+ 它最终返回的默认会是一个上一次的Promise对象值，不过如果抛出的是一个异常则返回异常的Promise对象。

最后可以说一下all以及race方法：
+ Promise.all()的作用是接收一组异步任务，然后并行执行异步任务，并且在所有异步操作执行完后才执行回调。
+ .race()的作用也是接收一组异步任务，然后并行执行异步任务，只保留取第一个执行完成的异步操作的结果，其他的方法仍在执行，不过执行结果会被抛弃。
+ Promise.all().then()结果中数组的顺序和Promise.all()接收到的数组顺序一致。
+ all和race传入的数组中如果有会抛出异常的异步任务，那么只有最先抛出的错误会被捕获，并且是被then的第二个参数或者后面的catch捕获；但并不会影响数组中其它的异步任务的执行。

缺点是：
Promise也有一些缺点。首先，无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。


## 迭代器 generater
