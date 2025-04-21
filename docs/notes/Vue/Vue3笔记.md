# Vue3

## 编码规范
1. js+ts
2. 组合式api
3. setup语法糖

## 核心语法
### 组合式API
vue2是options api  ，配置的
vue3是composition api ，组合式

把vue2的data、methods、watch结合升级，把同一个数据的监听、方法综合到一起

### setup
setup 是 Vue3 中一个新的配置项，值是一个函数，它是Composition API“表演的舞台”，组件中所用到的数据、方法、计算属性、监视.….等等，均配置在 setup 中。

特点：
+ setup函数

```js
export default {
    setup(){
        // vue3中弱化this
        let a=1

        function clickHandle(){
            console.log(1)
        }
    }
}

```

### setup返回值
### setup 和 vue2 options api
可以共存。在vue2 options api中可以使用 `this` 来获取setup中定义的变量，但setup中不能获取`data()`的数据。

引入`setup`语法糖，可以直接写在`<script>`标签上写setup，不用export了
```js
<script lang='ts' setup>
let a=1
function clickHandle(){
    ...
}
</script>
```

### ref创建基本响应式数据
通过`ref`来创建响应式数据
```js
<script setup>
import {ref} from 'vue'

let name = ref('张三')  // ref方法来创建响应式的数据，并赋默认值

let age = ref(2)
let address = ref('北京市')

</script>

```
返回值是一个 `RefImpl`的实例对象，简称ref对象，ref对象的`.value`属性是响应的。**ref定义的变量不是响应的，ref对象的value才是响应的**

**修改数据的时候是修改 `xxx.value` 的值，但在模版中使用时不需要`.value`，直接使用ref定义的变量即可**

ref也可以用来定义对象类型的响应式数据。

ref定义对象的时候，也是使用proxy来封装

```js
 <script setup>
import {ref} from 'vue'

let car = ref({
    carName:'奔驰',
    price:'230000',
    type:'轿车'
})

function edit(){
    car.value.carName = '宝马'
}

</script>

<template>
{{car.value.carName}}  //先.value 获取
</template>

```


### reactive创建对象响应式数据
使用`reactive` 定义对象类型的响应式数据，生成proxy代理的对象。且只能定义对象类型。

```js
<script setup>
import {reactive} from 'vue'

let car = reactive({
    carName:'奔驰',
    price:'230000',
    type:'轿车'
})

</script>

```
`reactive` 定义的数据，取值是直接去获取对象的值，不需要使用`.value` ，修改也是直接去修改。


### ref对比reactive
宏观角度：
1. ref定义：基本数据类型、对象数据类型
2. reactive只用来定义对象数据类型

区别：
1. ref创建的数据必须使用`.value` 来获取值.(可以用插件【vue-office】)
2. reactive重新分配一个新对象，会失去响应式，可以使用（Object.assign）去整体替换
```js
let car = reactive({
    carName:'奔驰',
    price:'230000',
    type:'轿车'
})

function edit(){
    car = {carName:"宝马"}  //对reactive定义的对象重新赋值新的对象，会导致car不再具有响应式

    car = reactive({carName:"宝马"} )   //这样也不行，页面不更新

    //只能使用下面这种方式
    Object.assign(car,{carName:'宝马'})
}
//ref定义的对象可以直接.value去修改
```

使用原则：
1. 若需要一个基本类型的响应式数据，必须用`ref`
2. 如果要一个对象类型的数据，并且层级不复杂，`ref`,`reactive`都可以
3. 如果要一个层级深的对象类型数据，建议`reactive`

### toRefs和toRef
```js
let person = reactive({
    name:'xxx',
    age:12
})

let {name,age} = toRefs(person) //把person都结构

// 可以直接改name了
name.value = 'aaaa'
name.value = 123

let n = toRef(person,'age') //toRef 是对属性单独结构
n.value = 4
```

### computed 计算属性
