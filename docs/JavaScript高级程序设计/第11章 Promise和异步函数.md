# 异步编程

## 同步和异步





## 以往的异步编程模式





# Promise

> 一种异步程序执行的机制，用来解决回调地狱问题

ECMAScript 6 新增的引用类型Promise，可以通过new 操作符来实例化。创建新Promise时需要传入执行器（executor）函数作为参数，下面的例子使用了一个空函数对象来应付一下解
释器：

```js
let p = new Promise(() => {});
setTimeout(console.log, 0, p); // Promise <pending>
```

## 1. Promise状态机

Promise是一个有状态的对象，可能处于如下3 种状态之一：

- 待定（pending）

- 兑现（fulfilled，有时候也称为“解决”，resolved）

- 拒绝（rejected）

  

待定（pending）是Promise的最初始状态。在待定状态下，Promise可以落定（settled）为代表成功的兑现
（fulfilled）状态，或者代表失败的拒绝（rejected）状态。无论落定为哪种状态都是不可逆的



Promise的状态是私有的，不能直接通过JavaScript 检测到。这主要是为了避免根据读取到
的Promise状态，以同步方式处理Promise对象。另外，Promise的状态也不能被外部JavaScript 代码修改。这与不
能读取该状态的原因是一样的：Promise故意将异步行为封装起来，从而隔离外部的同步代码。





## 2. 解决值、拒绝理由及Promise用例





Promise主要有两大用途。首先是**抽象地表示一个异步操作**。

Promise的状态代表Promise是否完成：

- pending 表示尚未开始或者正在执行中

- fulfilled表示已经成功完成

- 而reject则表示没有成功完成

Promise封装的异步操作会实际生成某个值，而程序期待Promise状态改变时可以访问这个值。相应地，如果Promise被拒绝，程序就会期待Promise状态改变时可以拿到拒绝的理由。



## 3. 通过执行函数控制Promise状态





执行器函数主要有两项职责：初始化Promise的异步行为和控制状态的最终转换。其中，控制Promise状态的转换是
通过调用它的两个函数参数实现的。这两个函数参数通常都命名为resolve()和reject()。调用
resolve()会把状态切换为兑现，调用reject()会把状态切换为拒绝。另外，调用reject()也会抛
出错误



```js
let p1 = new Promise((resolve, reject) => resolve());
setTimeout(console.log, 0, p1); // Promise <resolved>
let p2 = new Promise((resolve, reject) => reject());
setTimeout(console.log, 0, p2); // Promise <rejected>
// Uncaught error (in promise)
```

执行器函数是同步执行的。这是因为执行器函数是Promise的初始化程序

```js
new Promise(() => setTimeout(console.log, 0, 'executor'));
setTimeout(console.log, 0, 'promise initialized');
// executor
// promise initialized
添加setTimeout 可以推迟切换状态：
let p = new Promise((resolve, reject) => setTimeout(resolve, 1000));
// 在console.log 打印Promise实例的时候，还不会执行超时回调（即resolve()）
setTimeout(console.log, 0, p); // Promise <pending>
```



无论resolve()和reject()中的哪个被调用，状态转换都不可撤销了。于是继续修改状态会静默失败，如下所示：

```js

let p = new Promise((resolve, reject) => {
    resolve();
    reject(); // 没有效果
});
setTimeout(console.log, 0, p); // Promise <resolved>
```



为避免Promise卡在待定状态，可以添加一个定时退出功能。比如，可以通过setTimeout 设置一个
10 秒钟后无论如何都会拒绝Promise的回调：

```js
let p = new Promise((resolve, reject) => {
    setTimeout(reject, 10000); // 10 秒后调用reject()
    // 执行函数的逻辑
});
setTimeout(console.log, 0, p); // Promise <pending>
setTimeout(console.log, 11000, p); // 11 秒后再检查状态
// (After 10 seconds) Uncaught error
// (After 11 seconds) Promise <rejected>
```

因为Promise的状态只能改变一次，所以这里的超时拒绝逻辑中可以放心地设置让Promise处于待定状态的
最长时间。如果执行器中的代码在超时之前已经解决或拒绝，那么超时回调再尝试拒绝也会静默失败。

## 4.Promise.resolve()

> 实例化一个解决的Promise

Promise并非一开始就必须处于待定状态，然后通过执行器函数才能转换为落定状态。通过调用
Promise.resolve()静态方法，可以实例化一个解决的Promise。

下面两个Promise实例实际上是一样的

```js
let p1 = new Promise((resolve, reject) => resolve());
let p2 = Promise.resolve();
```





- 将传入的参数转换为Promise

解决的Promise的值对应着传给Promise.resolve()的第一个参数。使用这个静态方法，实际上
**可以把任何值都转换为一个Promise**：

```js
setTimeout(console.log, 0, Promise.resolve());
// Promise <resolved>: undefined
setTimeout(console.log, 0, Promise.resolve(3));
// Promise <resolved>: 3
// 多余的参数会忽略
setTimeout(console.log, 0, Promise.resolve(4, 5, 6));
// Promise <resolved>: 4
```



- 幂等性

如果**传入的参数本身是一个Promise，那它的行为就类似于一个空包装**。因此，Promise.resolve()可以说是一个幂等方法:

```js
let p = Promise.resolve(7);
setTimeout(console.log, 0, p === Promise.resolve(p));
// true
setTimeout(console.log, 0, p === Promise.resolve(Promise.resolve(p)));
// true
let p1 = new Promise((resolve, reject) => setTimeout(reject, 0));
setTimeout(console.log, 0, p1 === Promise.resolve(p1));
// true
// Uncaught(in promise) undefined
```




这个幂等性**会保留传入Promise的状态**：
```js
let p = new Promise(() => {});
setTimeout(console.log, 0, p); // Promise <pending>
setTimeout(console.log, 0, Promise.resolve(p)); // Promise <pending>
setTimeout(console.log, 0, p === Promise.resolve(p)); // true
```



- 非预期的行为

注意，这个静态方法**能够包装任何非Promise值，包括错误对象，并将其转换为解决的Promise**。因此，也
可能导致不符合预期的行为：

```js
let p = Promise.resolve(new Error('foo'));
setTimeout(console.log, 0, p);
// Promise <resolved>: Error: foo
```













## 5.Promise.reject()
> 实例化一个拒绝的Promise并抛出一个异步错误



Promise.reject()会**实例化一个拒绝的Promise并抛出一个异步错误**,这个错误**不能通过try/catch 捕获**，而**只能通过拒绝处理程序捕获**。下面的两个Promise实例实际上是等价的：

```js
let p1 = new Promise((resolve, reject) => reject());
let p2 = Promise.reject();
```



这个拒绝的Promise的理由就是传给Promise.reject()的第一个参数。这个参数也会传给后续的拒绝处理程序：

- 传入非Promise对象

```js
let p = Promise.reject(3);
setTimeout(console.log, 0, p); // Promise <rejected>: 3
p.then(null, (e) => setTimeout(console.log, 0, e)); // 3
// 多余的参数会忽略
setTimeout(console.log, 0, Promise.resolve(4, 5, 6));
//Promise <rejected>: 4
//Uncaught (in promise) 4
```



- 传入Promise对象

Promise.reject()并没有照搬Promise.resolve()的幂等逻辑。如果给它传一个Promise对象，则这个Promise会成为它返回的拒绝Promise的理由：

```js
setTimeout(console.log, 0, Promise.reject(Promise.resolve()));
// Promise <rejected>: Promise <resolved>
```





## 6.同步/异步执行的二元性

两种模式下抛出错误的情形：

```js
try {
    throw new Error('foo');
} catch(e) {
    console.log(e); // Error: foo
}
try {
    Promise.reject(new Error('bar'));
} catch(e) {
    console.log(e);
}
// Uncaught (in promise) Error: bar
```







第一个try/catch 抛出并捕获了错误，第二个try/catch 抛出错误却没有捕获到

这里的同步代码之所以没有捕获Promise抛出的错误，是因为它没有通过异步模式捕获错误。

从这里就可以看出Promise真正的异步特性：它们是**同步对象（在同步执行模式中使用），但也是异步执行模式
的媒介**。在前面的例子中，**拒绝Promise的错误并没有抛到执行同步代码的线程里，而是通过浏览器异步消息队
列来处理的**。因此，try/catch 块并不能捕获该错误。代码一旦开始以异步模式执行，则唯一与之交互
的方式就是使用异步结构——更具体地说，就是Promise的方法。





# 实例方法





## Promise.prototype.then()

> 为Promise实例添加处理程序

该方法接受两个可选参数: onResolved处理程序和onRejected处理程序,会在Promise分别进入“兑现”(resolved)和“拒绝”(rejected)状态时执行。



**Promise.prototype.then()方法返回一个新的Promise实例**：

**传给then()的任何非函数类型的参数都会被静默忽略**。



```js
function onResolved(id) {
    setTimeout(console.log, 0, id, 'resolved');
}
function onRejected(id) {
    setTimeout(console.log, 0, id, 'rejected');
}
let p1 = new Promise((resolve, reject) => setTimeout(resolve, 3000));
let p2 = new Promise((resolve, reject) => setTimeout(reject, 3000));
// 非函数处理程序会被静默忽略，不推荐
p1.then('gobbeltygook');
// 不传onResolved 处理程序的规范写法
p2.then(null, () => onRejected('p2'));
// p2 rejected（3 秒后）
```





```js
let p1 = new Promise(() => {});
// 若调用then()时不传处理程序，则原样向后传
let p2 = p1.then();
setTimeout(console.log, 0, p1); // Promise <pending>
setTimeout(console.log, 0, p2); // Promise <pending>
setTimeout(console.log, 0, p1 === p2); // false
```



新Promise实例基于onResovled 处理程序的返回值构建:



1.如果没有提供这个处理程序，则Promise.resolve()就会包装上一个Promise解决之后的值。

2.如果没有显式的返回语句，则Promise.resolve()会包装默认的返回值undefined。



3.如果有显式的返回值，则Promise.resolve()会包装这个值：

```js
let p1 = Promise.resolve('foo');
// 若调用then()时不传处理程序，则原样向后传
let p2 = p1.then();

setTimeout(console.log, 0, p2); // Promise <resolved>: foo
// 这些都一样
let p3 = p1.then(() => undefined);
let p4 = p1.then(() => {});
let p5 = p1.then(() => Promise.resolve());
setTimeout(console.log, 0, p3); // Promise <resolved>: undefined
setTimeout(console.log, 0, p4); // Promise <resolved>: undefined
setTimeout(console.log, 0, p5); // Promise <resolved>: undefined
```





```js
// 这些都一样
let p6 = p1.then(() => 'bar');
let p7 = p1.then(() => Promise.resolve('bar'));
setTimeout(console.log, 0, p6); // Promise <resolved>: bar
setTimeout(console.log, 0, p7); // Promise <resolved>: bar
// Promise.resolve()保留返回的Promise
let p8 = p1.then(() => new Promise(() => {}));
let p9 = p1.then(() => Promise.reject());
// Uncaught (in promise): undefined
setTimeout(console.log, 0, p8); // Promise <pending>
setTimeout(console.log, 0, p9); // Promise <rejected>: undefined
```





4.抛出异常会返回拒绝的Promise

```js
let p10 = p1.then(() => { throw 'baz'; });
// Uncaught (in promise) baz
setTimeout(console.log, 0, p10); // Promise <rejected> baz
```



5.返回错误值不会触发上面的拒绝行为，而会把错误对象包装在一个解决的Promise中

```js
let p11 = p1.then(() => Error('qux'));
setTimeout(console.log, 0, p11); // Promise <resolved>: Error: qux
```





```js
let p1 = Promise.reject('foo');
// 调用then()时不传处理程序则原样向后传
let p2 = p1.then();
// Uncaught (in promise) foo
setTimeout(console.log, 0, p2); // Promise <rejected>: foo
// 这些都一样
let p3 = p1.then(null, () => undefined);
let p4 = p1.then(null, () => {});
let p5 = p1.then(null, () => Promise.resolve());
setTimeout(console.log, 0, p3); // Promise <resolved>: undefined
setTimeout(console.log, 0, p4); // Promise <resolved>: undefined
setTimeout(console.log, 0, p5); // Promise <resolved>: undefined
// 这些都一样
let p6 = p1.then(null, () => 'bar');
let p7 = p1.then(null, () => Promise.resolve('bar'));
setTimeout(console.log, 0, p6); // Promise <resolved>: bar
setTimeout(console.log, 0, p7); // Promise <resolved>: bar
// Promise.resolve()保留返回的Promise
let p8 = p1.then(null, () => new Promise(() => {}));
let p9 = p1.then(null, () => Promise.reject());
setTimeout(console.log, 0, p8); // Promise <pending>
setTimeout(console.log, 0, p9); // Promise <rejected>: undefined
// Uncaught (in promise): undefined
let p10 = p1.then(null, () => { throw 'baz'; });
// Uncaught (in promise) baz
setTimeout(console.log, 0, p10); // Promise <rejected>: baz
let p11 = p1.then(null, () => Error('qux'));
setTimeout(console.log, 0, p11); // Promise <resolved>: Error: qux
```







## Promise.prototype.catch()

> 给Promise添加拒绝处理程序。

相当于调用Promise.prototype.then(null, onRejected)。

下面的代码展示了这两种同样的情况：



```js
let p = Promise.reject();
let onRejected = function(e) {
    setTimeout(console.log, 0, 'rejected');
};
// 这两种添加拒绝处理程序的方式是一样的：
p.then(null, onRejected); // rejected
p.catch(onRejected); // rejected

let p1 = new Promise(() => {});
let p2 = p1.catch();
setTimeout(console.log, 0, p1); // Promise <pending>
setTimeout(console.log, 0, p2); // Promise <pending>
setTimeout(console.log, 0, p1 === p2); // false
```



在返回新Promise实例方面，Promise.prototype.catch()的行为与Promise.prototype.then()的onRejected 处理程序是一样的。



## *Promise.prototype.finally()

> 给Promise添加onFinally 处理程序

在Promise转换为解决或拒绝状态时都会执行。这个方法可以避免onResolved 和onRejected 处理程序中出
现冗余代码。但onFinally 处理程序没有办法知道Promise的状态是解决还是拒绝

```js
let p1 = Promise.resolve();
let p2 = Promise.reject();
let onFinally = function() {
    setTimeout(console.log, 0, 'Finally!')
}
p1.finally(onFinally); // Finally
p2.finally(onFinally); // Finally
```



Promise.prototype.finally()方法返回一个新的Promise实例：

```js
let p1 = new Promise(() => { });

let p2 = p1.finally();

setTimeout(console.log, 0, p1); // Promise <pending>

setTimeout(console.log, 0, p2); // Promise <pending>

setTimeout(console.log, 0, p1 === p2); // false
```



这个新Promise实例不同于then()或catch()方式返回的实例。因为onFinally 被设计为一个**状态无关的方法**，所以在**大多数情况下它将表现为父Promise的传递。对于已解决状态和被拒绝状态都是如此**。



```js
let p1 = Promise.resolve('foo');
// 这里都会原样后传
let p2 = p1.finally();
let p3 = p1.finally(() => undefined);
let p4 = p1.finally(() => {});
let p5 = p1.finally(() => Promise.resolve());
let p6 = p1.finally(() => 'bar');
let p7 = p1.finally(() => Promise.resolve('bar'));
let p8 = p1.finally(() => Error('qux'));
setTimeout(console.log, 0, p2); // Promise <resolved>: foo
setTimeout(console.log, 0, p3); // Promise <resolved>: foo
setTimeout(console.log, 0, p4); // Promise <resolved>: foo
setTimeout(console.log, 0, p5); // Promise <resolved>: foo
setTimeout(console.log, 0, p6); // Promise <resolved>: foo
setTimeout(console.log, 0, p7); // Promise <resolved>: foo
setTimeout(console.log, 0, p8); // Promise <resolved>: foo
```





如果返回的是一个待定的Promise，或者onFinally 处理程序抛出了错误（显式抛出或返回了一个拒
绝Promise），则会返回相应的Promise（待定或拒绝），

```js
// Promise.resolve()保留返回的Promise
let p9 = p1.finally(() => new Promise(() => {}));
let p10 = p1.finally(() => Promise.reject());
// Uncaught (in promise): undefined
setTimeout(console.log, 0, p9); // Promise <pending>
setTimeout(console.log, 0, p10); // Promise <rejected>: undefined
let p11 = p1.finally(() => { throw 'baz'; });
// Uncaught (in promise) baz
setTimeout(console.log, 0, p11); // Promise <rejected>: baz
```



返回待定Promise的情形并不常见，这是因为只要Promise一解决，新Promise仍然会原样后传初始的Promise：

```js
let p1 = Promise.resolve('foo');
// 忽略解决的值
let p2 = p1.finally(
    () => new Promise((resolve, reject) => setTimeout(() => resolve('bar'), 100)));
setTimeout(console.log, 0, p2); // Promise <pending>
setTimeout(() => setTimeout(console.log, 0, p2), 200);
// 200 毫秒后：
// Promise <resolved>: foo
```



## 非重入Promise方法

> 当Promise进入落定状态时，与该状态相关的处理程序都是异步执行的

当Promise进入落定状态时，与该状态相关的处理程序仅仅会被排期，而非立即执行。跟在添加这个处
理程序的代码之后的同步代码一定会在处理程序之前先执行。即使Promise一开始就是与附加处理程序关联
的状态，执行顺序也是这样的。这个特性由JavaScript 运行时保证，被称为“非重入”（non-reentrancy）
特性。下面的例子演示了这个特性：

```js
// 创建解决的Promise
let p = Promise.resolve();
// 添加解决处理程序
// 直觉上，这个处理程序会等Promise一解决就执行
p.then(() => console.log('onResolved handler'));
// 同步输出，证明then()已经返回
console.log('then() returns');
// 实际的输出：
// then() returns
// onResolved handler
```

在这个例子中，**在一个解决Promise上调用then()会把onResolved 处理程序推进消息队列**。但这个
处理程序在当前线程上的同步代码执行完成前不会执行。因此，跟在then()后面的同步代码一定先于
处理程序执行。





```js
let synchronousResolve;
// 创建一个Promise并将解决函数保存在一个局部变量中
let p = new Promise((resolve) => {
    synchronousResolve = function() {
        console.log('1: invoking resolve()');
        resolve();
        console.log('2: resolve() returns');
    };
});
p.then(() => console.log('4: then() handler executes'));
synchronousResolve();//Promise状态变化发生在添加处理程序之后
console.log('3: synchronousResolve() returns');
// 实际的输出：
// 1: invoking resolve()
// 2: resolve() returns
// 3: synchronousResolve() returns
// 4: then() handler executes
```



即使Promise状态变化发生在添加处理程序之后，处理程序也会等到运行的消息队列让它出列时才会执行。





非重入适用于onResolved/onRejected 处理程序、catch()处理程序和finally()处理程序。
下面的例子演示了这些处理程序都只能异步执行：

```js
let p1 = Promise.resolve();
p1.then(() => console.log('p1.then() onResolved'));
console.log('p1.then() returns');
let p2 = Promise.reject();
p2.then(null, () => console.log('p2.then() onRejected'));
console.log('p2.then() returns');
let p3 = Promise.reject();
p3.catch(() => console.log('p3.catch() onRejected'));
console.log('p3.catch() returns');
let p4 = Promise.resolve();
p4.finally(() => console.log('p4.finally() onFinally'));
console.log('p4.finally() returns');
// p1.then() returns
// p2.then() returns
// p3.catch() returns
// p4.finally() returns
// p1.then() onResolved
// p2.then() onRejected
// p3.catch() onRejected
// p4.finally() onFinally
```







6. 邻近处理程序的执行顺序

如果给Promise添加了多个处理程序，当Promise状态变化时，相关处理程序会按照添加它们的顺序依次执行。无论是then()、catch()还是finally()添加的处理程序都是如此。

```js
let p1 = Promise.resolve();
let p2 = Promise.reject();
p1.then(() => setTimeout(console.log, 0, 1));
p1.then(() => setTimeout(console.log, 0, 2));
// 1
// 2
p2.then(null, () => setTimeout(console.log, 0, 3));
p2.then(null, () => setTimeout(console.log, 0, 4));
// 3
// 4
p2.catch(() => setTimeout(console.log, 0, 5));
p2.catch(() => setTimeout(console.log, 0, 6));
// 5
// 6
p1.finally(() => setTimeout(console.log, 0, 7));
p1.finally(() => setTimeout(console.log, 0, 8));
// 7
// 8
```







7. 传递解决值和拒绝理由

  到了落定状态后，Promise会提供其解决值（如果兑现）或其拒绝理由（如果拒绝）给相关状态的处理
  程序。

 在执行函数中，解决的值和拒绝的理由是分别作为resolve()和reject()的第一个参数往后传的。然后，这些值又会传给它们各自的处理程序，作为onResolved 或onRejected 处理程序的唯一
  参数。

  ```js
  let p1 = new Promise((resolve, reject) => resolve('foo'));
  p1.then((value) => console.log(value)); // foo
  let p2 = new Promise((resolve, reject) => reject('bar'));
  p2.catch((reason) => console.log(reason)); // bar
  ```

  Promise.resolve()和Promise.reject()在被调用时就会接收解决值和拒绝理由。同样地，它
  们返回的Promise也会像执行器一样把这些值传给onResolved 或onRejected 处理程序：

  ```js
  let p1 = Promise.resolve('foo');
  p1.then((value) => console.log(value)); // foo
  let p2 = Promise.reject('bar');
  p2.catch((reason) => console.log(reason)); // bar
  ```

  

8. 拒绝Promise与拒绝错误处理

拒绝Promise类似于throw()表达式，因为它们都代表一种程序状态，即需要中断或者特殊处理。在期
约的执行函数或处理程序中抛出错误会导致拒绝，对应的错误对象会成为拒绝的理由。因此以下这些期
约都会以一个错误对象为由被拒绝：



```js
let p1 = new Promise((resolve, reject) => reject(Error('foo')));
let p2 = new Promise((resolve, reject) => { throw Error('foo'); });
let p3 = Promise.resolve().then(() => { throw Error('foo'); });
let p4 = Promise.reject(Error('foo'));
setTimeout(console.log, 0, p1); // Promise <rejected>: Error: foo
setTimeout(console.log, 0, p2); // Promise <rejected>: Error: foo
setTimeout(console.log, 0, p3); // Promise <rejected>: Error: foo
setTimeout(console.log, 0, p4); // Promise <rejected>: Error: foo
// 也会抛出4 个未捕获错误
```







在通过throw()关键字抛出错误时，JavaScript运行时的错误处理机制会停止执行抛出错误之后的任何指令

```js
throw Error('foo');
console.log('bar'); // 这一行不会执行
// Uncaught Error: foo
```





但是，在Promise中抛出错误时，因为错误实际上是从消息队列中异步抛出的，所以并不会阻止运行时
继续执行同步指令：

```js
Promise.reject(Error('foo'));
console.log('bar');
// bar
// Uncaught (in promise) Error: foo
```



异步错误只能通过异步的onRejected 处理程序捕获：

```js
// 正确
Promise.reject(Error('foo')).catch((e) => {});
// 不正确
try {
    Promise.reject(Error('foo'));
} catch(e) {}
```



这不包括捕获执行函数中的错误，在解决或拒绝Promise之前，仍然可以使用try/catch 在执行函数
中捕获错误：

```js
let p = new Promise((resolve, reject) => {
    try {
        throw Error('foo');
    } catch(e) {}
    resolve('bar');
});
setTimeout(console.log, 0, p); // Promise <resolved>: bar
```





then()和catch()的onRejected 处理程序在语义上相当于try/catch。出发点都是捕获错误之
后将其隔离，同时不影响正常逻辑执行。为此，onRejected 处理程序的任务应该是在捕获异步错误之
后返回一个解决的Promise。下面的例子中对比了同步错误处理与异步错误处理：

```js
console.log('begin synchronous execution');
try {
    throw Error('foo');
} catch(e) {
    console.log('caught error', e);
}
console.log('continue synchronous execution');
// begin synchronous execution
// caught error Error: foo
// continue synchronous execution
new Promise((resolve, reject) => {
    console.log('begin asynchronous execution');
    reject(Error('bar'));
}).catch((e) => {
    console.log('caught error', e);
}).then(() => {
    console.log('continue asynchronous execution');
});
// begin asynchronous execution
// caught error Error: bar
// continue asynchronous execution
```



# Promise连锁与Promise合成

## Promise连锁



每个Promise实例的方法（then()、catch()和finally()）都会返回一个新的Promise对象，而这个新Promise又有自己的实例方法,把Promise逐个地串联起来,构成所谓的“Promise连锁” 或 “链式调用”



```js
let p1 = new Promise((resolve, reject) => {
    console.log('p1 executor');
    setTimeout(resolve, 1000);
});
p1.then(() => new Promise((resolve, reject) => {
    console.log('p2 executor');
    setTimeout(resolve, 1000);
}))
    .then(() => new Promise((resolve, reject) => {
    console.log('p3 executor');
    setTimeout(resolve, 1000);
}))
    .then(() => new Promise((resolve, reject) => {
    console.log('p4 executor');
    setTimeout(resolve, 1000);
}));
// p1 executor（1 秒后）
// p2 executor（2 秒后）
// p3 executor（3 秒后）
// p4 executor（4 秒后）
```





每个后续的处理程序都会等待前一个期约解决，然后实例化一个新期约并返回它。这种结构可以简洁地将异步任务串行化，解决之前依赖回调的难题



## Promise合成



### Promise.all()

> Promise.all()静态方法创建的Promise会在一组Promise全部解决之后再解决

接收一个可迭代对象，返回一个新Promise

```js
let p1 = Promise.all([
  Promise.resolve(),
  Promise.resolve()
]);
// 可迭代对象中的元素会通过Promise.resolve()转换为Promise
let p2 = Promise.all([3, 4]);
// 空的可迭代对象等价于Promise.resolve()
let p3 = Promise.all([]);
// 无效的语法
let p4 = Promise.all();
// TypeError: cannot read Symbol.iterator of undefined

```





合成的Promise只会在每个包含的Promise都解决之后才解决

```js
let p = Promise.all([
    Promise.resolve(),
    new Promise((resolve, reject) => setTimeout(resolve, 1000))
]);
setTimeout(console.log, 0, p); // Promise <pending>
p.then(() => setTimeout(console.log, 0, 'all() resolved!'));
// all() resolved!（大约1 秒后）
```





1.如果所有Promise都成功解决，则合成Promise的解决值就是所有包含Promise解决值的数组，按照迭代器顺序：

```js
let p = Promise.all([
    Promise.resolve(3),
    Promise.resolve(),
    Promise.resolve(4)
]);
p.then((values) => setTimeout(console.log, 0, values)); // [3, undefined, 4]
```





2.至少有一个包含的Promise待定，则合成的Promise也会待定。如果有一个包含的Promise拒绝，则合成的Promise也会拒绝：

```js
// 永远待定
let p1 = Promise.all([new Promise(() => {})]);
setTimeout(console.log, 0, p1); // Promise <pending>
// 一次拒绝会导致最终Promise拒绝
let p2 = Promise.all([
    Promise.resolve(),
    Promise.reject(),
    Promise.resolve()
]);
setTimeout(console.log, 0, p2); // Promise <rejected>
// Uncaught (in promise) undefined
```





如果有Promise拒绝，则**第一个拒绝的Promise会将自己的理由作为合成Promise的拒绝理由**。

之后再拒绝的期约不会影响最终Promise的拒绝理由。不过，这并不影响所有包含Promise正常的拒绝操作。合成的Promise会静默
处理所有包含Promise的拒绝操作，如下所示：

```js
// 虽然只有第一个Promise的拒绝理由会进入
// 拒绝处理程序，第二个Promise的拒绝也
// 会被静默处理，不会有错误跑掉
let p = Promise.all([
    Promise.reject(3),
    new Promise((resolve, reject) => setTimeout(reject, 1000))
]);
p.catch((reason) => setTimeout(console.log, 0, reason)); // 3
// 没有未处理的错误
```







### 









### Promise.race()

> 返回一个包装Promise，是一组集合中最先解决或拒绝的Promise的镜像



```js
let p1 = Promise.race([
    Promise.resolve(),
    Promise.resolve()
]);
// 可迭代对象中的元素会通过Promise.resolve()转换为Promise
let p2 = Promise.race([3, 4]);
// 空的可迭代对象等价于new Promise(() => {})
let p3 = Promise.race([]);
// 无效的语法
let p4 = Promise.race();
// TypeError: cannot read Symbol.iterator of undefined
```







Promise.race()不会对解决或拒绝的期约区别对待。无论是解决还是拒绝，只要是第一个落定的
期约，Promise.race()就会包装其解决值或拒绝理由并返回新期约



```js
// 解决先发生，超时后的拒绝被忽略
let p1 = Promise.race([
    Promise.resolve(3),
    new Promise((resolve, reject) => setTimeout(reject, 1000))
]);
setTimeout(console.log, 0, p1); // Promise <resolved>: 3
// 拒绝先发生，超时后的解决被忽略
let p2 = Promise.race([
    Promise.reject(4),
    new Promise((resolve, reject) => setTimeout(resolve, 1000))
]);
setTimeout(console.log, 0, p2); // Promise <rejected>: 4
// 迭代顺序决定了落定顺序
let p3 = Promise.race([
    Promise.resolve(5),
    Promise.resolve(6),
    Promise.resolve(7)
]);
setTimeout(console.log, 0, p3); // Promise <resolved>: 5
```







如果有一个期约拒绝，只要它是第一个落定的，就会成为拒绝合成期约的理由。之后再拒绝的期约
不会影响最终期约的拒绝理由。不过，这并不影响所有包含期约正常的拒绝操作。与Promise.all()
类似，合成的期约会静默处理所有包含期约的拒绝操作，如下所示：

```js
// 虽然只有第一个期约的拒绝理由会进入
// 拒绝处理程序，第二个期约的拒绝也
// 会被静默处理，不会有错误跑掉
let p = Promise.race([
Promise.reject(3),
new Promise((resolve, reject) => setTimeout(reject, 1000))
]);
p.catch((reason) => setTimeout(console.log, 0, reason)); // 3
// 没有未处理的错误
```







4. 串行期约合成

异步产生值并将其传给处理程序。基于后续期约使用之前期约的返回值来串联期约是期约的基本功能。这很像
函数合成，即将多个函数合成为一个函数

```js
function addTwo(x) {return x + 2;}
function addThree(x) {return x + 3;}
function addFive(x) {return x + 5;}
function addTen(x) {
return addFive(addTwo(addThree(x)));
}
console.log(addTen(7)); // 17
```



使用期约：

```js
function addTwo(x) {return x + 2;}
function addThree(x) {return x + 3;}
function addFive(x) {return x + 5;}
function addTen(x) {
    return Promise.resolve(x)
        .then(addTwo)
        .then(addThree)
        .then(addFive);
}
addTen(8).then(console.log); // 18
```



使用Array.prototype.reduce()可以写成更简洁的形式：

```js
function addTwo(x) {return x + 2;}
function addThree(x) {return x + 3;}
function addFive(x) {return x + 5;}
function addTen(x) {
    return [addTwo, addThree, addFive]
        .reduce((promise, fn) => promise.then(fn), Promise.resolve(x));
}
addTen(8).then(console.log); // 18
```







这种模式可以提炼出一个通用函数，可以把任意多个函数作为处理程序合成一个连续传值的期约连
锁。这个通用的合成函数可以这样实现：

```js
function addTwo(x) {return x + 2;}
function addThree(x) {return x + 3;}
function addFive(x) {return x + 5;}
function compose(...fns) {
    return (x) => fns.reduce((promise, fn) => promise.then(fn), Promise.resolve(x))
}
let addTen = compose(addTwo, addThree, addFive);
addTen(8).then(console.log); // 18
```





# async/await 



异步函数，也称为“async/await”（语法关键字），是ES6 Promise模式在ECMAScript 函数中的应用。async/await 是ES8 规范新增的。这个特性从行为和语法上都增强了JavaScript，让**以同步方式写的代码能够异步执行**。下面来看一个最简单的例子，这个Promise在超时之后会解决为一个值





```js
let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));
p.then((x) => console.log(x));
```



# 期约扩展

ES6 期约实现是很可靠的，但它也有不足之处。比如，很多第三方期约库实现中具备而ECMAScript
规范却未涉及的两个特性：期约取消和进度追踪。



1. 期约取消



2.期约进度通知

# 异步函数



异步函数，也称为“async/await”（语法关键字），是ES6 期约模式在ECMAScript 函数中的应用。
async/await 是ES8 规范新增的，从行为和语法上都增强了JavaScript，让以同步方式写的代码能够异步执行



```js
let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));
```



这个期约在1000 毫秒之后解决为数值3。如果程序中的其他代码要在这个值可用时访问它，则需要
写一个解决处理程序：

```js
let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));
p.then((x) => console.log(x)); // 3
```



这其实是很不方便的，因为其他代码都必须塞到期约处理程序中。不过可以把处理程序定义为一个
函数：

```js
function handler(x) { console.log(x); }
let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));
p.then(handler); // 3
```



这个改进其实也不大。这是因为任何需要访问这个期约所产生值的代码，都需要以处理程序的形式
来接收这个值。也就是说，代码照样还是要放到处理程序里。ES8 为此提供了async/await 关键字。





## async

> async 关键字用于声明异步函数。

async关键字可以用在函数声明、函数表达式、箭头函数和方法上

```js
async function foo() {}
let bar = async function() {};
let baz = async () => {};
class Qux {
    async qux() {}
}
```





使用async 关键字可以让函数具有异步特征，但总体上其代码仍然是同步求值的。而在参数或闭
包方面，异步函数仍然具有普通JavaScript 函数的正常行为。正如下面的例子所示，foo()函数仍然会
在后面的指令之前被求值



```js
async function foo() {
    console.log(1);
}
foo();

console.log(2);
// 1
// 2
```





**异步函数始终返回Promise对象**，异步函数的返回值会被Promise.resolve()包装成一个Promise对象

```js
async function foo () {

}
console.log(foo() instanceof Promise);
//true
```



```js
async function foo () {
  console.log(1);
  return 3;//return Promise.resolve(3);
}
// 给返回的Promise添加一个解决处理程序
foo().then(console.log);
console.log(2);
// 1
// 2
// 3
```







```js
// 返回一个原始值

async function foo () {

    return 'foo';

}

foo().then(console.log);

// foo

// 返回一个没有实现thenable 接口的对象

async function bar () {

    return ['bar'];

}

bar().then(console.log);

// ['bar']

// 返回一个实现了thenable 接口的非Promise对象

async function baz () {

    const thenable = {

        then (callback) { callback('baz'); }

    };

    return thenable;

}

baz().then(console.log);

// baz

// 返回一个Promise

async function qux () {

    return Promise.resolve('qux');

}

qux().then(console.log);

// qux
```





与在Promise处理程序中一样，在异步函数中抛出错误会返回拒绝的Promise：

```js
async function foo () {

 console.log(1);

 throw 3;

}

// 给返回的Promise添加一个拒绝处理程序

foo().catch(console.log);

console.log(2);

// 1

// 2

// 3
```





## await

> 暂停async函数代码的执行，等待Promise解决





```js
let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));

p.then((x) => console.log(x)); // 3
```

使用async / await 可以写成这样：

```js
async function foo () {
    let p =  new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));
    let x = await p;
    console.log(x);
}

foo();

// 3
```





**await 关键字会暂停执行异步函数后面的代码，让出JavaScript 运行时的执行线程**。这个行
为与生成器函数中的yield 关键字是一样的。await 关键字同样是尝试“解包”对象的值，然后将这
个值传给表达式，再异步恢复异步函数的执行













JavaScript 运行时在碰到await 关键字时，会记录在哪里暂停执行。等到await 右边的值可用了，JavaScript 运行时会向消息
队列中推送一个任务，这个任务会恢复异步函数的执行。



1.await 后面跟着一个立即可用的值，函数的其余部分也会被异步求值。



```js
async function foo() {
    console.log(2);
    await null;
    console.log(4);
}
console.log(1);
foo();
console.log(3);
// 1
// 2
// 3
// 4
```





2.await 后面是一个Promise



```js
async function foo () {
    console.log(2);
    console.log(await Promise.resolve(8));
    console.log(9);
}
async function bar () {
    console.log(4);
    console.log(await 6);
    console.log(7);
}
console.log(1);
foo();
console.log(3);
bar();
console.log(5);
// 1
// 2
// 3
// 4
// 5
// 8
// 9
// 6
//7
```













## 异步函数策略



1. 实现sleep()
    很多人在刚开始学习JavaScript 时，想找到一个类似Java 中Thread.sleep()之类的函数，好在程
    序中加入非阻塞的暂停。以前，这个需求基本上都通过setTimeout()利用JavaScript 运行时的行为来
    实现的。
    有了异步函数之后，就不一样了。一个简单的箭头函数就可以实现sleep()：





```js


async function sleep(delay) {
return new Promise((resolve) => setTimeout(resolve, delay));
}
async function foo() {
const t0 = Date.now();
await sleep(1500); // 暂停约1500 毫秒
console.log(Date.now() - t0);
}
foo();
// 1502
```







> 参考资料

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise





