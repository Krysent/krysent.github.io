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


## redux的数据流工作流程
首先，用户（通过View）发出Action，发出方式就用到了dispatch方法。

然后，Store自动调用Reducer，并且传入两个参数：当前State和收到的Action，Reducer会返回新的State

State一旦有变化，Store就会调用监听函数，来更新View。

## React 中 useeffect 和 uselayouteffect 区别
在 React 中，useEffect 和 useLayoutEffect 都是用于处理组件的副作用（side effects）的钩子函数，它们之间的主要区别在于触发时机和执行顺序。

useEffect：

- useEffect 是在组件渲染完成后异步执行的钩子函数。
- 它不会阻塞组件的渲染过程，即它会在浏览器完成绘制后执行。
- 通常用于处理需要异步执行的副作用，比如数据获取、订阅事件、定时器等。
- useEffect 的回调函数在组件每次渲染时都会执行，除非指定依赖项（dependency），否则会在每次渲染后都触发。

useLayoutEffect：

- `useLayoutEffect` 是在组件渲染完成后同步执行的钩子函数。
- 它会在浏览器执行绘制之前执行，即在浏览器更新屏幕之前执行。
- 通常用于处理需要同步执行的副作用，比如 DOM 操作、测量元素尺寸等。
- `useLayoutEffect `的回调函数在组件每次渲染时都会执行，类似于 useEffect，但它会在浏览器更新屏幕之前执行。

总结区别：

- `useEffect` 是在浏览器完成绘制后异步执行，而 `useLayoutEffect `是在浏览器更新屏幕之前同步执行。
- `useEffect` 不会阻塞组件的渲染过程，而` useLayoutEffect `可能会导致阻塞，因为它会在浏览器更新屏幕之前执行。
- 一般情况下，应优先使用` useEffect`，除非需要在浏览器更新屏幕之前同步执行一些操作，才考虑使用 `useLayoutEffect`。
需要注意的是，过度使用` useLayoutEffect `可能会导致性能问题，因为它会阻塞组件的渲染过程。因此，在大多数情况下，推荐使用`useEffect` 来处理副作用。只有在需要确保某些操作在浏览器更新屏幕之前同步执行时，才使用 `useLayoutEffect`。


## react的 setstate 过程

在 React 中，setState 是用于更新组件状态的方法。当调用 setState 时，React 会进行以下一般性的更新过程：

合并更新：React 将传入的更新对象（可以是一个新的状态值或一个更新函数）与当前状态进行合并。它不会立即执行更新，而是将更新放入待处理的更新队列中。

批量更新：React 会将多个连续的 setState 调用合并为一个批量更新操作，以提高性能。在批量更新期间，React 不会立即更新组件，而是将所有更新推迟到后续的阶段。

准备更新：在进行实际更新之前，React 会执行一些准备工作。它会检查是否处于批量更新模式，以确定是否需要合并更新。如果在 React 事件处理程序、生命周期方法或异步代码中调用了 setState，React 会自动启动批量更新模式。

触发重新渲染：在准备更新阶段后，React 会触发组件的重新渲染过程。它会比较前后两次渲染的虚拟 DOM 树，找出需要更新的部分，并进行相应的 DOM 操作。

执行生命周期方法：在重新渲染过程中，React 会按照生命周期的顺序调用相应的方法，如 componentDidUpdate。

需要注意的是，由于 setState 是异步的，React 可能会对多个 setState 调用进行批量处理，以提高性能

## react diff 和 fiber 算法的区别是什么

React 的 Diff 算法和 Fiber 算法是 React 在不同版本中使用的两种不同的算法。

Diff 算法：

- Diff 算法是 React 早期版本使用的一种协调算法，也被称为 Reconciliation（协调）算法。
- Diff 算法的主要思想是通过比较前后两次渲染的虚拟 DOM 树，找出需要更新的部分，并进行相应的 DOM 操作。
- Diff 算法是一种递归算法，会遍历整个虚拟 DOM 树，进行全量比较，然后进行更新。
- Diff 算法的缺点是当组件层级较深或组件数量较多时，比较和更新的成本会较高，可能会导致性能问题。

Fiber 算法：

- Fiber 算法是 React 16 版本引入的一种新的协调算法，旨在提高 React 的渲染性能和用户响应度。
- Fiber 算法通过引入 Fiber 数据结构，将渲染过程分解为可中断的单元，使得 React 可以在渲染过程中优先处理高优先级的任务。
- Fiber 算法使用了一种增量渲染的方式，将渲染过程分为多个阶段，每个阶段可以根据优先级进行调度和中断。
- Fiber 算法通过优先级调度、时间切片和任务分片等技术，使得 React 能够更好地控制渲染过程，提高用户体验。
- Fiber 算法还支持并发模式，可以在多个线程上进行渲染，进一步提升性能。
- 错误处理:在Fiber中,一次渲染过程中的错误不会致命。React可以捕获错误,暂停一次更新,在不破坏整个应用的情况下显示错误信息。

总结： Diff 算法是 React 早期版本使用的一种全量比较的算法，而 Fiber 算法是 React 16 版本引入的一种增量渲染的算法。Fiber 算法通过引入 Fiber 数据结构和优先级调度等机制，提高了 React 的渲染性能和用户响应度。Fiber 算法还支持并发模式，可以在多个线程上进行渲染。相比之下，Fiber 算法在性能和用户体验方面有明显的优势。

## 什么场景下需要使用 immutable

Immutable 数据是指一旦创建就不能被修改的数据。在以下场景下，使用 Immutable 数据可以带来一些好处：

状态管理：在状态管理库（如 Redux，Redux要求State必须是immutable的，可以利用immutable优化性能。）中，使用 Immutable 数据可以确保状态的不可变性。这样可以避免状态被直接修改，提高状态的可预测性和可维护性。

函数式编程：Immutable 数据是函数式编程的重要概念之一。函数式编程鼓励使用纯函数和不可变数据，以避免副作用和共享状态。使用 Immutable 数据可以更轻松地实现函数式编程的思想。

性能优化：由于 Immutable 数据不可变，可以使用结构共享和持久化数据结构来优化性能。通过共享相同的数据结构，可以减少内存占用和提高数据操作的效率。

并发和多线程：在并发和多线程环境下，使用 Immutable 数据可以避免竞态条件和数据冲突。由于数据不可变，不需要担心数据被同时修改的问题，从而简化了并发编程的复杂性。

缓存和缓存一致性：Immutable 数据可以作为缓存键或缓存值使用。由于数据不可变，可以在缓存中安全地存储和共享，而不必担心数据被修改导致的缓存一致性问题。

需要注意的是，使用 Immutable 数据也会带来一些开销，因为每次更新数据都需要创建新的对象。在某些场景下，如果频繁地进行大量的数据更新操作，可能会导致性能下降。因此，在选择是否使用 Immutable 数据时，需要权衡其带来的好处和性能开销，并根据具体情况进行决策。

## react性能优化的方案手段有哪些？
react 性能优化
这里只说 react 单独的进行的性能优化：

1. key
2. shouldComponentUpdate
3. pureComponent
4. 关于箭头函数，先声明好事件监听函数后，然后再拿到其引用传给组件:
5. useCallback(大计算量的函数来)
6. useMemo
7. React.Memo
8. 不可变数据 Immutable
9. reselect
10. React.lazy 按需加载

<a href='https://juejin.cn/post/6844903896767283207#heading-4' target='_blank'>查看更多详细方案</a>

如果一定要做性能优化，核心还是在减少频繁计算和渲染上，在实现策略上主要有三种方式：利用key维持组件结构稳定性、优化数据比对过程和按需加载。其中优化数据比对过程可以根据具体使用的场景，分别使用缓存数据或组件、改用Immutable不可变数据等方式进行。最后，也一定记得要采用测试工具进行前后性能对比，来保障优化工作的有效性。