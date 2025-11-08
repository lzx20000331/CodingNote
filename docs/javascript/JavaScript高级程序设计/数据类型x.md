

## 数据类型



## Number 类型

### 1.浮点值

任何涉及 NaN 的操作始终返回 NaN

### 2.值的范围

如果某个计算得到的 数值结果超出了 JavaScript 可以表示的范围，那么这个数值会被自动转换为一个特殊的 Infinity（无 穷）值。任何无法表示的负数以-Infinity（负无穷大）表示，任何无法表示的正数以 Infinity（正 无穷大）表示。



如果某个计算得到的 数值结果超出了 JavaScript 可以表示的范围，那么这个数值会被自动转换为一个特殊的 Infinity（无 穷）值。任何无法表示的负数以-Infinity（负无穷大）表示，任何无法表示的正数以 Infinity（正 无穷大）表示。



### 3.NaN

有一个特殊的数值叫 NaN，意思是“不是数值”（Not a Number），用于表示本来要返回数值的操作 失败了（而不是抛出错误）。

用 0 除任意数值在其他语言中通常都会导致错误，从而中止代码执行。但在 ECMAScript 中：

- 0、+0 或-0 相除会返回 NaN： 

- 如果分子是非 0 值，分母是有符号 0 或无符号 0，则会返回 Infinity 或-Infinity： 

```js
console.log(0/0); // NaN  console.log(-0/+0); // NaN  
console.log(5/0); // Infinity 
console.log(5/-0); // -Infinity 
```

NaN 有几个独特的属性： 

- 任何涉及 NaN 的操作始终返回 NaN

```
console.log(NaN / 3); // false 
```



- NaN 不等于包括 NaN 在内的任何值

```js
console.log(NaN == NaN); // false 
```



**`isNaN()`** 函数用来确定一个值是否为[`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN) 。





### 4.数值转换

#### Number()

#### parseInt()







#### parseFloat()







## String 类型

字符串可以使用双引号（"）、 单引号（'）或反引号（`）标示

```js
var a = "Hello World!"
var b = 'Hello World!'
var c = `Hello World!`
```



### 1.字符字面量



### 2.字符串的特点

ECMAScript 中的字符串是不可变的（immutable）

要修改 某个变量中的字符串值，必须先销毁原始的字符串，然后将包含新值的另一个字符串保存到该变量





### 3.转换为字符串

#### toString()

null 和 undefined 值没有 toString()方法。

默认情况下不接收任何参数，在对数值调用这个方法时，toString()可以接收一个底数参数，即以什么底数来输出数值的字符串表示。默认输出数值的十进制表示。







#### String()

1.如果值有 toString()方法，则调用该方法（不传参数）并返回结果。 

2.如果值是 null，返回"null"。 

3.如果值是 undefined，返回"undefined"。







# 特殊的字面量





NaN

Infinity

-0