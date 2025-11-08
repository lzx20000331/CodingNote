---
outline: deep
---

# Web API

## DOM（Document Object Model）

### 获取元素

### 操作元素

#### 节点操作

## BOM (Browser Object Model）

### window 对象

**BOM 的核心是 window 对象，表示浏览器的实例**。window 对象在浏览器中有两重身份，一个是
ECMAScript 中的 Global 对象，另一个就是浏览器窗口的 JavaScript 接口。这意味着网页中定义的所有
对象、变量和函数都以 window 作为其 Global 对象，都可以访问其上定义的 parseInt()等全局方法。

### Global 作用域

因为 window 对象被复用为 ECMAScript 的 Global 对象，所以**通过 var 声明的所有全局变量和函
数都会变成 window 对象的属性和方法**。比如：

```js
var age = 29;
var sayAge = () => alert(this.age);
alert(window.age); // 29
sayAge(); // 29
window.sayAge(); // 29
```

如果在这里使用 let 或 const 替代 var，则不会把变量添加给全局对象：

```js
let age = 29;
const sayAge = () => alert(this.age);
alert(window.age); // undefined
sayAge(); // undefined
window.sayAge(); // TypeError: window.sayAge is not a function
```

## location 对象

location 提供了当前窗口中加载文档的信息，以及通常的导航功能。这个对象独特的地方在于， 它既是 window 的属性， 也是 document 的属性。也就是说，
window.location 和 document.location 指向同一个对象。

## navigator

## history

## 常见不冒泡的事件

### 焦点事件

focus：元素获得焦点时触发。

blur：元素失去焦点时触发。
替代方案：使用会冒泡的 focusin 和 focusout。

### 鼠标事件

mouseenter：鼠标进入元素时触发。

mouseleave：鼠标离开元素时触发。
替代方案：使用会冒泡的 mouseover 和 mouseout。

### 资源事件

load：资源（如图片、脚本）加载完成时触发。

unload：文档或子资源卸载时触发（如关闭页面）。

abort：资源加载中断时触发（如用户取消图片加载）。

error：资源加载失败时触发（如无效的图片链接）。

### 窗口事件

resize：窗口或元素尺寸变化时触发。

beforeunload：窗口即将关闭时触发。

### 其他事件

DOMContentLoaded：HTML 文档解析完成时触发（仅 document 对象）。

scroll（争议点）：某些旧浏览器可能不冒泡，但**现代浏览器支持冒泡**。
