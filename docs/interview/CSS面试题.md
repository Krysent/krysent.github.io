# css精选面试题

## 居中为什么尽量使⽤ transform（为什么不使⽤marginLeft/Top）

在居中元素时，使用 transform 的主要原因是它可以提供更好的性能和更灵活的布局控制，相比于使用 marginLeft 和 marginTop。

以下是使用 transform 进行居中的几个优势：

1. 性能优化：transform 属性可以触发 GPU 加速，这意味着浏览器可以使用硬件加速来处理元素的渲染，从而提高性能。相比之下，使用 marginLeft 和 marginTop 进行居中可能会导致页面的重排和重绘，性能较差。
2. 灵活的布局控制：transform 属性可以与其他布局属性（如 position、display 等）结合使用，提供更灵活的布局控制。例如，可以将元素设置为绝对定位（position: absolute）并使用 transform 属性进行居中，这样可以在不影响其他布局的情况下实现居中效果。
3. 元素尺寸不影响布局：使用 transform 进行居中时，元素的尺寸不会影响其在布局中的位置。这意味着可以轻松地调整元素的大小而不会破坏居中效果。相比之下，使用 marginLeft 和 marginTop 进行居中时，元素的尺寸会影响其在布局中的位置，可能需要进行额外的计算和调整

## CSS3 动画的实现方式有哪些，动手写一下将一个 div 在 1s 内移动 300px?
css3 实现动画主要有 3 种方式

- transition 过渡动画
- transform 2D 和 3D 转换
- animation 自定义动画

```js
/* transition属性动画结合transform变化属性，实现元素移动一段距离的动画 */
#transitonDiv:hover {
    transition: all 1s ease-in-out;
    -webkit-transition: all 1s ease-in-out;
    -moz-transition: all 1s ease-in-out;
    -o-transition: all 1s ease-in-out;

    transform: translateX(300px);
    -ms-transform: translateX(300px);
    -moz-transform: translateX(300px);
    -webkit-transform: translateX(300px);
    -o-transform: translateX(300px);
}

/* 通过animation属性，实现逐帧动画 */
#animationDiv:hover {
    animation: animName 1s ease-in-out;
    -webkit-animation: animName 1s ease-in-out;
    -moz-animation: animName 1s ease-in-out;
    -o-animation: animName 1s ease-in-out;
}

/* 定义关键帧 */
@keyframes animName {
    0% {
        transform: translateX(0px);
    }
    30% {
        transform: translateX(100px);
    }
    60% {
        transform: translateX(200px);
    }
    100% {
        transform: translateX(300px);
    }
}
```

此外还可以 window.requestAnimationFrame() 实现：

```js
const element = document.getElementById('e');
let start;

function render(timestamp) {
  if (start === undefined) {
  	start = timestamp;
  }
  const elapsed = timestamp - start;

  //这里使用`Math.min()`确保元素刚好停在300px的位置。
  element.style.transform = 'translateX(' + Math.min(0.3 * elapsed, 300) + 'px)';
  console.log(element.style.transform)

  if (elapsed < 1000) { // 在1秒后停止动画
    window.requestAnimationFrame(render);
  }
}

window.requestAnimationFrame(render);
```

## 所有 css3 的动画都能用 GPU 加速么？
在 css 中，只有 3D 转换、opacity 透明、filter 滤镜和添加了 will-change 属性的元素，浏览器才会开启硬件（GPU）加速。

不过如果我们想要 2D、过渡等动画也能开启硬件加速,我们可以通过给这些元素加上transform: translateZ(0); 或transform: translate3d(0,0,0);来诱导浏览器开启硬件加速，但是我们不能滥用。

也可能通过添加 will-change 来实现。