---
outline: deep
--- 


# 盒子模型的理解

1.当对一个文档进行布局的时候，浏览器的渲染引擎会将所有元素表示为一个个矩形的盒子

2.一个盒子由四个部分组成：`content`、`padding`、`border`、`margin`

3.盒子模型分为两种 ：

标准盒子模型(默认)





IE怪异盒子模型



4.box-sizing 属性定义了引擎应该如何计算一个元素的总宽度和总高度



- content-box 默认值，元素的 width/height 不包含padding，border，与标准盒子模型表现一致
- border-box 元素的 width/height 包含 padding，border，与怪异盒子模型表现一致
- inherit 指定 box-sizing 属性的值，应该从父元素继承





# 盒子塌陷

盒子塌陷指的是**本应该在父盒子内部的元素跑到了外部**。

## 为什么会出现盒子塌陷

## 解决方案





# 外边距重叠

外边距重叠取最大值

## 父子外边距重叠

```html
<div class="fa">
    <div class="son"></div>
</div>
```



```css
.fa {
  width: 300px;
  height: 300px;
  background-color: red;
  margin-top: 50px;
}

.son {
  width: 150px;
  height: 150px;
  margin-top: 100px;
  background-color: skyblue;
}
```



## 兄弟外边距重叠

```html
<div class="a"></div>
<div class="b"></div>
```



```css
.a {
  background-color: red;
  margin-bottom: 5px;
}
.b {
  background-color: skyblue;
  margin-top: 50px;
}
```

## 空元素的边距重叠是

取margin与 padding 的最大值





# BFC

BFC就是页面上的一个隔离的独立容器，一个独立的渲染区域，容器里面的子元素不会影响到外面的元素。反之也如此







## 原理

1.

2.

3.

4.除边距重叠现象，分属于不同的BFC时，可以阻止margin重叠

## BFC的作用

1.



## 触发BFC

1.根元素（`<html>`）

2.浮动元素（[`float`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float) 值不为 `none`）

3.绝对定位元素（[`position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position) 值为 `absolute` 或 `fixed`）

4.行内块元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `inline-block`）

5.表格单元格（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `table-cell`，HTML 表格单元格默认值）

6.表格标题（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `table-caption`，HTML 表格标题默认值）

7.匿名表格单元格元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `table`、`table-row`、 `table-row-group`、`table-header-group`、`table-footer-group`（分别是 HTML table、tr、tbody、thead、tfoot 的默认值）或 `inline-table`）

8.[`overflow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow) 值不为 `visible`、`clip` 的块元素

9.[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `flow-root` 的元素

10.[`contain`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/contain) 值为 `layout`、`content` 或 `paint` 的元素

11.弹性元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `flex` 或 `inline-flex` 元素的直接子元素），如果它们本身既不是 [flex](https://developer.mozilla.org/zh-CN/docs/Glossary/Flex_Container)、[grid](https://developer.mozilla.org/zh-CN/docs/Glossary/Grid_Container) 也不是 [table](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Table) 容器

12.网格元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `grid` 或 `inline-grid` 元素的直接子元素），如果它们本身既不是 [flex](https://developer.mozilla.org/zh-CN/docs/Glossary/Flex_Container)、[grid](https://developer.mozilla.org/zh-CN/docs/Glossary/Grid_Container) 也不是 [table](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Table) 容器

13.多列容器（[`column-count`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-count) 或 [`column-width` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/column-width) 值不为 `auto`，包括`column-count` 为 `1`）

14.`column-span` 值为 `all` 的元素始终会创建一个新的 BFC，即使该元素没有包裹在一个多列容器中 ([规范变更](https://github.com/w3c/csswg-drafts/commit/a8634b96900279916bd6c505fda88dda71d8ec51), [Chrome bug](https://bugs.chromium.org/p/chromium/issues/detail?id=709362))

父子元素和兄弟元素边距重叠，重叠原则取最大值。空元素的边距重叠是取margin与 padding 的最大值。

# 

IFC



# css选择器

| 选择器                                                       | 权重    |
| ------------------------------------------------------------ | ------- |
| 继承                                                         | 无      |
| 通配符选择器, * 子代选择器 >, 相邻兄弟选择器+, 通用兄弟选择器~ | 0-0-0-0 |
| 标签选择器, 伪元素选择器                                     | 0-0-0-1 |
| 类选择器, 伪类选择器, 属性选择器                             | 0-0-1-0 |
| ID选择器                                                     | 0-1-0-0 |
| style内联样式                                                | 1-0-0-0 |
| !important                                                   | 无穷大  |





## 效率



# 水平居中

## 块级元素

1.给元素设置margin

```css
margin: 0 auto;
```



2.给父盒子加上

```css
display: flex;
just-content: center;
```



3.给父盒子设置

```css
postion: absoulte;
left: 50%;
trans
```







## 行内元素



# 垂直居中

## 定位









# 水平垂直居中



```html
<div class="wrap skyblue">
    <div class="box red">
    </div>
</div>
```



```css
.skyblue{
  background-color: skyblue;
}
.red{
  background-color: red;
}

.wrap{
  width: 300px;
  height: 300px;
}
```

## 定位实现



1.absolute + margin

```css
.wrap {
  position: relative;
}

.box {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -50px 0 0 -50px;
}
```

或

```css
.wrap {
  position: relative;
}

.box {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
```





2.absolute + calc 实现

```css
.wrap {
  position: relative;
}
.box {
  width: 100px;
  height: 100px;
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
}
```





3. 绝对定位 + transform 实现



```css
.wrap {
  position: relative;
}
.box {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```





## table实现



```css
.wrap {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
.box {
  width: 100px;
  height: 100px;
  display: inline-block;
}
```





## flex实现

```css
.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  width: 100px;
  height: 100px;
}
```

或

```css
.wrap {
  display: flex;
  justify-content: center;
}
.box {
  width: 100px;
  height: 100px;
  align-self: center;
}
```



## 转化为行内元素

```css
.wrap {
  text-align: center;
  line-height: 300px;
}
.box {
  width: 100px;
  height: 100px;
  display: inline-block;
  vertical-align: middle;
}
```





## grid实现



```css
.wrap {
  display: grid;
  justify-content: center;
  align-items: center;
}
.box {
  width: 100px;
  height: 100px;
}
```

或

```css
.wrap {
  display: grid;
  justify-content: center;
}
.box {
  width: 100px;
  height: 100px;
  align-self: center;
}
```







# 常用的布局









# 水平垂直居中

## flex

```css
.container {
  display: flex;
  justify-content: center;//水平
  align-items: center;//垂直
}
```

## grid

```css
.container {
  display: grid;
  place-items: center;//垂直,水平
}
```





# 圣杯布局

>header 和 footer 各自占领屏幕所有宽度，高度固定。
>
>- 中间的container是一个三栏布局。
>- 三栏布局两侧宽度固定不变，中间部分自动填充整个区域。
>- 中间部分的高度是三栏中最高的区域的高度。 



![image-20220920122442865](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20220920122442865.png)



## 浮动 + 定位

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>圣杯布局</title>
    <link rel="stylesheet" href="圣杯布局.css" />
  </head>
  <body>
    <header>头部</header>
    <div class="clearfix wrapper">
      <div class="center">主区域</div>
      <div class="left">左区域</div>
      <div class="right">右区域</div>
    </div>
    <footer>底部</footer>
  </body>
</html>

```





```css
body {
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 28px;
  min-width: 300px;
  /* min-width = padding * 2 + left */
}

header,
footer {
  height: 80px;
  line-height: 80px;
  background-color: red;
}

.wrapper {
  padding: 0 100px;
}

.center,
.left,
.right {
  float: left;
  height: calc(100vh - 160px);
  line-height: calc(100vh - 160px);
}
.center {
  width: 100%;
  background-color: skyblue;
}

.left {
  width: 100px;
  margin-left: -100%;
  background-color: yellow;
  position: relative;
  left: -100px;
}

.right {
  width: 100px;
  margin-left: -100px;
  background-color: pink;
  position: relative;
  right: -100px;
}

.clearfix::after {
  content: "";
  clear: both;
  display: block;
}

```



# 浮动

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="flex实现圣杯布局.css" />
  </head>
  <body>
    <header>头部</header>
    <div class="wrapper">
      <div class="left">左区域</div>
      <div class="center">主区域</div>
      <div class="right">右区域</div>
    </div>
    <footer>底部</footer>
  </body>
</html>

```







```css
body {
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 28px;
}

header,
footer {
  height: 80px;
  line-height: 80px;
  background-color: red;
}

.wrapper {
  background-color: cornflowerblue;
}

.center,
.left,
.right {
  float: left;
  height: calc(100vh - 160px);
  line-height: calc(100vh - 160px);
}
.center {
  width: 100%;
  padding: 0 100px;
  box-sizing: border-box;
  background-color: skyblue;
}

.left {
  width: 100px;
  margin-left: -100%;
  background-color: yellow;
}

.right {
  width: 100px;
  margin-left: -100px;
  background-color: pink;
}

.clearfix::after {
  content: "";
  clear: both;
  display: block;
}

```





## flex

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="flex实现圣杯布局.css" />
  </head>
  <body>
    <header>头部</header>
    <div class="wrapper">
      <div class="left">左区域</div>
      <div class="center">主区域</div>
      <div class="right">右区域</div>
    </div>
    <footer>底部</footer>
  </body>
</html>

```









```css
body {
  margin: 0;
  padding: 0;
  font-size: 28px;
}

header,
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  background-color: red;
}

.wrapper {
  display: flex;

  background-color: cornflowerblue;
}


.center,
.left,
.right {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: calc(100vh - 160px);
}
.center {
  flex: 1;
  background-color: skyblue;
}

.left {
  background-color: yellow;
}

.right {
  background-color: pink;
}

```





## grid

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="flex实现圣杯布局.css" />
  </head>
  <body>
    <header>头部</header>
    <div class="wrapper">
      <div class="left">左区域</div>
      <div class="center">主区域</div>
      <div class="right">右区域</div>
    </div>
    <footer>底部</footer>
  </body>
</html>

```





```css
body {
  margin: 0;
  padding: 0;
  font-size: 28px;
}

header,
footer {
  text-align: center;
  height: 80px;
  line-height: 80px;
  background-color: red;
}

.wrapper {
  display: grid;
  text-align: center;
  grid-template-columns: 100px 1fr 100px;
  background-color: cornflowerblue;
}


.center,
.left,
.right {
  height: calc(100vh - 160px);
  line-height: calc(100vh - 160px);
}

.center {

  background-color: skyblue;
}

.left {
  
  background-color: yellow;
}

.right {
  
  background-color: pink;
}

```





# 双飞翼布局

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>圣杯布局</title>
    <link rel="stylesheet" href="圣杯布局.css" />
  </head>
  <body>
    <header>头部</header>
    <div class="wrapper">
      <div class="center">主区域</div>
    </div>
    <div class="left">左区域</div>
    <div class="right">右区域</div>
    <footer>底部</footer>
  </body>
</html>

```







```css
body {
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 28px;

}

header,
footer {
  height: 80px;
  line-height: 80px;
  background-color: red;
}

footer{
  clear: both;
}

.wrapper {
  width: 100%;
  float: left;
  
  height: calc(100vh - 160px);
  line-height: calc(100vh - 160px);
}
.center {
  background-color: skyblue;
  margin: 0 100px;
}


.left,
.right {
  width: 100px;
  float: left;
  height: calc(100vh - 160px);
  line-height: calc(100vh - 160px);
}

.left {
  margin-left: -100%;
  background-color: yellow;
}

.right {
  margin-left: -100px;
  background-color: pink;

}


```







# 田字格布局

css有哪些方法可以实现“田”字布局











# 外边距合并

块级元素的上外边距和下外边距有时会合并（或折叠）为一个外边距，其大小取其中的最大者，这种行为称为外边距折叠（外边距合并）



# 如何理解reflow和repaint

- 回流（reflow）：布局引擎会根据各种样式计算每个盒子在页面上的大小与位置
- 重绘(repaint)：当计算好盒模型的位置、大小及其他属性后，浏览器根据每个盒子特性进行绘制



# display:none，visibility:hidden，opacity: 0三者具体区别，





|                   | 重绘(repaint) | 重排(reflow) | 事件绑定能否触发 | 过渡动画 | 占据空间 |
| :---------------: | :-----------: | :----------: | :--------------: | :------: | :------: |
|   display:none    |       √       |      √       |        ×         |          |    ×     |
| visibility:hidden |       √       |      ×       |        ×         |    ×     |    √     |
|    opacity: 0     |       √       |      ×       |        √         |          |    √     |











# link 和 @import 的区别

1. 引入的内容不同

   link 除了引用样式文件，还可以引用图片等资源文件，而 @import 只引用样式文件

2. 加载顺序不同

   link 引用 CSS 时，在页面载入时同时加载；@import 需要页面网页完全载入以后加载

3. 兼容性不同

   link 是 XHTML 标签，无兼容问题；@import 是在 CSS2.1 提出的，低版本的浏览器不支持

4. 对 JS 的支持不同

   link 支持使用 Javascript 控制 DOM 去改变样式；而 @import 不支持



# 为什么link用href获取资源 script和img用src

**参考答案：**

src用于替换当前元素，href用于在当前文档和引用资源之间确立联系。

src

- src是source的缩写，指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；在请求src资源时会将其指向的资源下载并应用到文档内，例如js脚本，img图片和frame等元素

  ```html
  <script src ="js.js"></script> 
  ```

当浏览器解析到该元素时，**会暂停其他资源的下载和处理**，直到将该资源加载、编译、执行完毕，图片和框架 等元素也如此，类似于将所指向资源嵌入当前标签内。**这也是为什么将js脚本放在底部而不是头部**

href

- href是Hypertext Reference的缩写，指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接

- 在文档中添加link标签，浏览器会识别该文档为css文件，就会并行下载资源并且**不会**停止对当前文档的处理。这也是为什么建议使用link方式来加载css，而不是使用@import方式

  ```html
  <link href="common.css" rel="stylesheet"/>
  ```





# 

# CSS中哪些属性可以继承

字体类属性

```css
font：组合字体

font-family：规定元素的字体系列

font-weight：设置字体的粗细

font-size：设置字体的尺寸

font-style：定义字体的风格

font-variant：设置小型大写字母的字体显示文本，这意味着所有的小写字母均会被转换为大写，但是所有使用小型大写 字体的字母与其余文本相比，其字体尺寸更小。

font-stretch：对当前的 font-family 进行伸缩变形。所有主流浏览器都不支持。

font-size-adjust：为某个元素规定一个 aspect 值，这样就可以保持首选字体的 x-height。
```

文本类属性

```

```







# css3新特性





## 边框

1. border-radius



2. border-image



3. box-shadow







# 背景





# 清除浮动的四种方式



## 1.在浮动元素尾部加上标签设置clear:both;

```css
<div style="clear:both"></div>
```

## 2.给父级元素添加overflow样式: auto, hidden

```css
.container{
  overflow: auto;
}
```

## 3.父元素添加伪元素after

```css
.clearfix::after{
  clear: both;
  display: block;
  content: "";
}
.clearfix {
  *zoom: 1;   /*  *只有IE6,7识别 */
}
```



## 4.使用before和after双伪元素清除浮动（推荐）



```css
.clearfix:before, .clearfix:after {
    content: ""; 
    display: table;
}
.clearfix:after {
    clear: both;
}
.clearfix {
    *zoom: 1;
}
```







# 精灵图

CSS **图像合并**（**Image sprites**）技术，亦作 CSS 贴图定位、图像精灵（sprite，意为精灵），被运用于众多使用大量小图标的网页应用之上。它可取图像的一部分来使用，使得使用一个图像文件替代多个小文件成为可能。相较于一个小图标一个图像文件，单独一张图片所需的 HTTP 请求更少，对内存和带宽更加友好。



# 脱离文档流

## 一、什么是文档流？

将窗体自上而下分成一行一行，并在每行中按从左至右依次排放元素，称为文档流，也称为普通流。

这个应该不难理解，HTML中全部元素都是盒模型，盒模型占用一定的空间，依次排放在HTML中，形成了文档流。

## 二、什么是脱离文档流？

元素脱离文档流之后，将不再在文档流中占据空间，而是处于浮动状态（可以理解为漂浮在文档流的上方）。脱离文档流的元素的定位基于正常的文档流，当一个元素脱离文档流后，依然在文档流中的其他元素将忽略该元素并填补其原先的空间。

## 三、怎么脱离文档流？

### float

使用float可以脱离文档流。

注意！！！：使用float脱离文档流时，其他盒子会无视这个元素，但其他盒子内的文本依然会为这个元素让出位置，环绕在该元素的周围。





### absolute

absolute称为绝对定位，其实博主觉得应该称为相对定位，因为使用absolute脱离文档流后的元素，是相对于该元素的父类（及以上，如果直系父类元素不满足条件则继续向上查询）元素进行定位的，并且这个父类元素的position必须是非static定位的（static是默认定位方式）。





### fixed

完全脱离文档流，相对于浏览器窗口进行定位。（相对于浏览器窗口就是相对于html）。





# 回流和重绘











# 画图



## 圆





## 扇形

```html
<div id="app"></div>
```





90%

```css
#app{
  width: 300px;
  height: 300px;
  background-color: red;
  border-top-left-radius: 100%;
}
```



任意角度







## 0.5px直线

```
.line{
  background-color: red;
  height: 1px;
  transform: scaleY(0.5);
}
```

