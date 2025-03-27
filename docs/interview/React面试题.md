## react hooks与class组件的区别在于什么？
Hook 增加了函数式组件中 state 的使用，在之前函数式组件是无法拥有自己的状态，只能通过 props 以及 context 来渲染自己的 UI，而在业务逻辑中，有些场景必须要使用到 state，那么我们就只能将函数式组件定义为 class 组件。而现在通过 Hook，我们可以轻松的在函数式组件中维护我们的状态，不需要更改为 class 组件。

类组件的不足:

+ 状态逻辑难以复用
+ 缺少复用机制
+ 渲染属性和高阶组件会导致层级冗余
+ 趋向复杂难以维护
+ 生命周期函数混杂不相干逻辑
+ 相干逻辑分散在不同生命周期函数中
+ this 指向困扰
+ 内联函数过度创建新句柄
+ 类成员函数不能保证 this

函数式组件（hooks）的优势：
+ 优化类组件的三大问题
+ 函数组件无 this 问题
+ 自定义 Hook 方便复用状态逻辑
+ 副作用的关注点分离

## setState到底是异步还是同步?
**setState并不是单纯的异步或同步，这其实与调用时的环境相关**
1. setState只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。
2. setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的 callback 拿到更新后的结果。
3. setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和 setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 setState，setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新

## 为什么不能条件使用 react hooks?
确保 Hook 在每一次渲染中都按照同样的顺序被调用。这让 React 能够在多次的 useState 和 useEffect 调用之间保持 hook 状态的正确。

## React组件通信如何实现?
+ 父组件向子组件通讯: 父组件可以向子组件通过传 props 的方式，向子组件进行通讯 子组件向父组件通讯: props+回调的方式,父组件向子组件传递props进行通讯，此props为作用域为父组件自身的函数，子组件调用该函数，将子组件想要传递的信息，作为参数，传递到父组件的作用域中

+ 兄弟组件通信: 找到这两个兄弟节点共同的父节点,结合上面两种方式由父节点转发信息进行通信

+ 跨层级通信: Context设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言,对于跨越多层的全局数据通过Context通信再适合不过

+ 发布订阅模式: 发布者发布事件，订阅者监听事件并做出反应,我们可以通过引入 event 模块进行通信

+ 全局状态管理工具: 借助Redux或者Mobx等全局状态管理工具进行通信,这种工具会维护一个全局状态中心Store,并根据不同的事件产生新的状态

## 你用过那些hooks？常用的hooks有哪些？
+ useState: `useState `是最常用的 Hook 之一，它允许您在函数组件中使用状态。它返回一个状态值和一个更新状态的函数。您可以使用数组解构来获取这两个值。例如：`const [count, setCount] = useState(0);`

+ useEffect: `useEffect `允许您在组件渲染后执行副作用操作，比如订阅数据、处理 DOM 操作等。它接收一个回调函数和一个依赖数组，用于指定在哪些依赖项发生变化时触发副作用。例如：`useEffect(() => { // 副作用操作 }, [dependency]);`

+ useContext: `useContext `允许您在函数组件中访问 React 的上下文（context）。它接收一个上下文对象（通过 `React.createContext` 创建），并返回当前上下文的值。例如：`const value = useContext(MyContext);`

+ useReducer: `useReducer` 是 `useState` 的替代方案，用于管理复杂的状态逻辑。它接收一个 reducer 函数和初始状态，并返回当前状态和一个 dispatch 函数用于触发状态更新。例如：`const [state, dispatch] = useReducer(reducer, initialState);`

+ useRef: `useRef` 返回一个可变的 `ref `对象，可以在多次渲染之间保持稳定。它通常用于获取 DOM 元素的引用或保存任意可变值。例如：`const refContainer = useRef(initialValue);`

+ useCallback: `useCallback `用于优化函数的性能，它返回一个记忆化的函数。当依赖项发生变化时，它会返回一个新的函数引用，否则会返回之前缓存的函数引用。例如：`const memoizedCallback = useCallback(() => { // 函数体 }, [dependency]);`

+ useMemo: `useMemo` 用于优化计算的性能，它返回一个记忆化的值。当依赖项发生变化时，它会重新计算值，否则会返回之前缓存的值。例如：`const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);`

## 说说你对HOC(高阶组件)的了解
高阶组件不是组件，是增强函数，可以输入一个元组件，返回出一个新的增强组件； 高阶组件的主要作用有:
1. 代码重用，逻辑和引导抽象
2. 渲染劫持
3. 状态抽象和控制
4. Props 控制

用法:

1. 属性代理 (Props Proxy): 返回出一个组件，它基于被包裹组件进行 功能增强；
```js
//默认参数: 可以为组件包裹一层默认参数；
function proxyHoc(Comp) {
	return class extends React.Component {
		render() {
			const newProps = {
				name: 'tayde',
				age: 1,
			}
			return <Comp {...this.props} {...newProps} />
		}
	}
}


//提取状态: 可以通过 props 将被包裹组件中的 state 依赖外层，例如用于转换受控组件:
function withOnChange(Comp) {
	return class extends React.Component {
		constructor(props) {
			super(props)
			this.state = {
				name: '',
			}
		}
		onChangeName = () => {
			this.setState({
				name: 'dongdong',
			})
		}
		render() {
			const newProps = {
				value: this.state.name,
				onChange: this.onChangeName,
			}
			return <Comp {...this.props} {...newProps} />
		}
	}
}
// 使用姿势如下，这样就能非常快速的将一个 Input 组件转化成受控组件。
const NameInput = props => (<input name="name" {...props} />)
export default withOnChange(NameInput)
```

2. 包裹组件: 可以为被包裹元素进行一层包装
```js
function withMask(Comp) {
  return class extends React.Component {
      render() {
		  return (
		      <div>
				  <Comp {...this.props} />
					<div style={{
					  width: '100%',
					  height: '100%',
					  backgroundColor: 'rgba(0, 0, 0, .6)',
				  }} 
			  </div>
		  )
	  }
  }
}
```

3. 反向继承：返回出一个组件，继承于被包裹组件，常用于以下操作:
```js
function IIHoc(Comp) {
    return class extends Comp {
        render() {
            return super.render();
        }
    };
}
```

4. 渲染劫持 (Render Highjacking)，例如条件渲染
```js
function withLoading(Comp) {
    return class extends Comp {
        render() {
            if(this.props.isLoading) {
                return <Loading />
            } else {
                return super.render()
            }
        }
    };
}
```

5. 操作状态 (Operate State): 可以直接通过 this.state 获取到被包裹组件的状态，并进行操作。但这样的操作容易使 state 变得难以追踪，不易维护，谨慎使用

高阶组件的应用场景：
+ 权限控制，通过抽象逻辑，统一对页面进行权限判断，按不同的条件进行页面渲染
```js
function withAdminAuth(WrappedComponent) {
    return class extends React.Component {
		constructor(props){
			super(props)
			this.state = {
		    	isAdmin: false,
			}
		} 
		async componentWillMount() {
		    const currentRole = await getCurrentUserRole();
		    this.setState({
		        isAdmin: currentRole === 'Admin',
		    });
		}
		render() {
		    if (this.state.isAdmin) {
		        return <Comp {...this.props} />;
		    } else {
		        return (<div>您没有权限查看该页面，请联系管理员！</div>);
		    }
		}
    };
}
```

+ 性能监控，包裹组件的生命周期，进行统一埋点:
```js
function withTiming(Comp) {
    return class extends Comp {
        constructor(props) {
            super(props);
            this.start = Date.now();
            this.end = 0;
        }
        componentDidMount() {
            super.componentDidMount && super.componentDidMount();
            this.end = Date.now();
            console.log(`${WrappedComponent.name} 组件渲染时间为 ${this.end - this.start} ms`);
        }
        render() {
            return super.render();
        }
    };
}
```
+ 代码复用，可以将重复的逻辑进行抽象。