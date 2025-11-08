# JavaScript中的继承

很多面向对象语言都支持两种继承：接口继承和实现继承。前者只继承方法签名，后者继承实际的方法。接口继承在ECMAScript 中是不可能的，因为函数没有签名。实现继承是ECMAScript 唯一支持的继承方式，而这主要是通过原型链实现的。

ECMA-262 把原型链定义为ECMAScript 的主要继承方式。其基本思想就是通过原型继承多个引用
类型的属性和方法。重温一下构造函数、原型和实例的关系：**每个构造函数都有一个原型对象，原型有
一个属性指回构造函数，而实例有一个内部指针指向原型。如果原型是另一个类型的实例呢？那就意味
着这个原型本身有一个内部指针指向另一个原型，相应地另一个原型也有一个指针指向另一个构造函
数。这样就在实例和原型之间构造了一条原型链**。



# 实现继承的方式

## 原型链继承

**子类构造函数的原型指向父类实例**，从而构成原型链

```js
    function Parent () {
      this.property = true;
    }
    Parent.prototype.getSuperValue = function () {
      return this.property;
    };
    function Child () {
      this.subproperty = false;
    }
    // 继承Parent
    Child.prototype = new Parent();
    Child.prototype.getSubValue = function () {
      return this.subproperty;
    };
    let instance = new Child();
    console.log(instance);
    console.log(instance.getSuperValue()); // true
```



## 构造函数继承

**在子类构造函数中调用父类构造函数来继承父类属性和方法**

```js
function Parent(name){
    this.name = name;
}
function Child() {
    // 继承Parent 并传参
    Parent.call(this, "Nicholas");
    // 实例属性
    this.age = 29;
}
let instance = new Child();
console.log(instance.name); // "Nicholas";
console.log(instance.age); // 29
```



缺点：无法继承父类原型上的属性和方法





## 组合继承



组合继承 综合了原型链和构造函数，将两者的优点集中了起来。基本的思路是**使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性**。

这样既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性

 

````js

    function Parent (name) {
      this.name = name;
      this.colors = ["red", "blue", "green"];
    }
    Parent.prototype.sayName = function () {
      console.log(this.name);
    };
    function Child (name, age) {
      // 继承属性
      Parent.call(this, name);
      this.age = age;
    }
    // 继承方法
    Child.prototype = new Parent();
	Child.prototype.constructor = Child
    Child.prototype.sayAge = function () {
      console.log(this.age);
    };
    let instance1 = new Child("Nicholas", 29);
    instance1.colors.push("black");
    console.log(instance1.colors); // "red,blue,green,black"
    instance1.sayName(); // "Nicholas";
    instance1.sayAge(); // 29
    let instance2 = new Child("Greg", 27);
    console.log(instance2.colors); // "red,blue,green"
    instance2.sayName(); // "Greg";
    instance2.sayAge(); // 27
````





## 原型式继承

即使不自定义类型也可以通过原型实现对象之间的信息共享，object()函数会创建一个临时构造函数，将传入的对象赋值给这个构造函数的原型，然后返回这个临时类型的一个实例。本质上，object()是对传入的对象执行了一次浅复制

```js
function object(o) {
function F() {}
F.prototype = o;
return new F();
}
let person = {
name: "Nicholas",
friends: ["Shelby", "Court", "Van"]
};
let anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");
let yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");
console.log(person.friends); // "Shelby,Court,Van,Rob,Barbie"
```



ECMAScript 5 通过增加Object.create()方法将原型式继承的概念规范化了。这个方法接收两个
参数：作为新对象原型的对象，以及给新对象定义额外属性的对象（第二个可选）。在只有一个参数时，
Object.create()与这里的object()方法效果相同:

```js
let person = {
name: "Nicholas",
friends: ["Shelby", "Court", "Van"]
};
let anotherPerson = Object.create(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");
let yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");
console.log(person.friends); // "Shelby,Court,Van,Rob,Barbie"
```





原型式继承非常适合不需要单独创建构造函数，但仍然需要在对象间共享信息的场合。属性中包含的引用值始终会在相关对象间共享，跟使用原型模式是一样的。





## 寄生式继承

寄生式继承背后的思路类似于寄生构造函数和工厂模式：创建一个实现继承的函数，以某种
方式增强对象，然后返回这个对象

```js
    function object (o) {
      function F () { }
      F.prototype = o;
      return new F();
    }
    function createAnother (original) {
      let clone = object(original); // 通过调用函数创建一个新对象
      clone.sayHi = function () { // 以某种方式增强这个对象
        console.log("hi");
      };
      return clone; // 返回这个对象
    }
    let person = {
      name: "Nicholas",
      friends: ["Shelby", "Court", "Van"]
    };
    let anotherPerson = createAnother(person);
    console.log(anotherPerson);
    anotherPerson.sayHi(); // "hi"
```





## 寄生组合式继承

使用寄生式继承来继承父类原型

```js
function inheritPrototype (Child, Parent) {
      let prototype = object(Parent.prototype); // 创建对象
      prototype.constructor = Child; // 增强对象
      Child.prototype = prototype; // 赋值对象
    }
    function Parent (name) {
      this.name = name;
      this.colors = ["red", "blue", "green"];
    }
    Parent.prototype.sayName = function () {
      console.log(this.name);
    };
    function Child (name, age) {
      Parent.call(this, name);
      this.age = age;
    }
    inheritPrototype(Child, Parent);
    Child.prototype.sayAge = function () {
      console.log(this.age);
    };
```







