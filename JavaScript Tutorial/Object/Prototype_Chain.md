# Prototype Chain

## Inheritance

```javascript
class Anonymous extends Person {
  getFullName() {
    return '[Hidden]';
  }
}
let anotherGuy = new Anonymous('Ricardo', 'Millos');
console.log(anotherGuy.getFullName()); // [Hidden]
```

- 單繼承
  - extends 後面只能接一個 class
- constructor 會自動產生
  > ECMA-262 [14.6.13 Runtime Semantics: ClassDefinitionEvaluation](https://www.ecma-international.org/ecma-262/#sec-runtime-semantics-classdefinitionevaluation)
  - 自動產生的 `constructor` 會把所有 argument 傳給 `super`
    也就是 Anonymous 會把 `constructor` 接到的所有 argument 傳給 Person 的 `constructor`

## Inheritance 的意義

### inheritance 代表：

1. 所有 instance 都會經過上層的 `constructor`，也就是會拿到所有上層定義的 member/property
2. 所有 instance 會間接連到上層的 `prototype`，也就是上層所有 `non-static method` 都可以被下層 instance 使用

### 優先順序

現在我們看到 `instance.getFullName` ，`instance` 是 `Anonymous` 時，總共有三種可能：

1. `getFullName` 是 `instance` 身上的 property，是產生 `instance` 之後再 `instance.getFullName = () => "something"`
2. `getFullName` 是 `Anonymous` 身上的 method
3. `getFullName` 是 `Person` 身上的 method

那麼當我們說 `instance.getFullName` 的時候會拿到什麼呢？

> When a reference is made to a property in an object, that reference is to **the property of that name in the first object in the prototype chain that contains a property of that name**. In other words, first **the object mentioned directly** is examined for such a property; if that object contains the named property, that is the property to which the reference refers; if that object does not contain the named property, **the prototype for that object** is examined next; and so on.

從 standard 可以看出來，順序會是

1. `instance` 本身，也就是 `instance` 身上的 `getFullName`
2. `instance` 的 `prototype`，也就是 `Anonymous.prototype.getFullName`
3. `instance` 的 `prototype` 的 `prototype`，也就是 `Person.prototype.getFullName`

- 簡單來說，就是先找自己，再按照繼承順序往上找

### Overload

可以發現上層同樣名子的 method 會被下層蓋掉

如果我們想要在 `Anonymous` 裡面新增新的 `method`，但是需要真正的 fullName 而不是 '[Hidden]' 時該怎麼做？

- `super`
  - super 可以用來拿到上層的 method
    - `super.getFullName()` 可以正常拿到 'Ricardo Millos' 而不是 '[Hidden]'
  - super 也可以用來呼叫上層的 `constructor`
    - 以 `Anonymous` 為例子，他自動產生的 `constructor` 會呼叫 `super('Ricardo', 'Millos');`

## Prototype

- 有認真看得人可以發現上面已經提到過很多次 `prototype` 了，這裡開始大略介紹什麼是 `prototype`

首先先聲明容易令人混淆的一點：

`Constructor.prototype` 並**不是**指 `Constructor` 的 `prototype` 是 `Constructor.prototype` 指向的物件

以下說到 `A` 的 `prototype` 是 `B` 的時候，代表的是以下三點會滿足：

1.  `A.__proto__` 可以拿到 `B`
2.  `A.constructor.prototype` 可以拿到 `B`
3.  `Object.getPrototypeOf(A)` 可以拿到 `B`

由以上定義，任何一個 `Constructor` 的 `prototype` 都會是 `Function.prototype`

### 如何知道一個東西的 prototype 是誰

1. [Object.getPrototypeOf(x)](https://www.ecma-international.org/ecma-262/#sec-object.getprototypeof)
2. [x.\_\_proto\_\_](https://www.ecma-international.org/ecma-262/#sec-get-object.prototype.__proto__)

### Prototype 是做什麼用的

> The value of a constructor's prototype property is a prototype object that is used to **implement inheritance and shared properties**.

- 實作 Inheritance
  - 跟 Python 的 `mro` 一樣，定義了找 `property` 的順序
- 共享 Property
  - `this` 開發的目的就是不需要每個 `instance` 身上都放同樣功能的 function
  - 但是要實現 `instance.method` 能夠自動找到每個 `instance` 共通的那個 function，就需要額外的設計

### Prototype Chain

- 其實看不懂這裡說的也沒差，知道 JavaScript 找 property 的順序就夠了

#### 什麼是 Prototype chain

> Every object created by a constructor **has an implicit reference (called the object's prototype)** to the value of its constructor's "prototype" property. Furthermore, a prototype may **have a non-null implicit reference to its prototype**, and so on; this is called **the prototype chain**.

被 `constructor` 「製造」出來的 `object` 以 `implicit reference` 連接到 `constructor.prototype`；
`prototype` 之間以 `implicit reference` 連接，這就是 `prototype chain`

#### 如何觀察 Prototype chain

```javascript
console.log(anotherGuy.__proto__ === Anonymous.prototype); // true
console.log(Anonymous.prototype.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // true
```

(有在 Python 寫過 Singly-linked list 的人會覺得很熟悉)

由上面的結果，我們可以看到一條 `prototype chain`：

- anotherGuy -> Anonymous.prototype -> Person.prototype -> Object.prototype -> null

而 JavaScript 所作的事情如下:

1. 實作 Inheritance
   - 當你繼承的時候自動連接 prototype，`Anonymous.prototype -> Person.prototype`
   - 所以 `instanceof` 才會檢查 `prototype chain`
2. 共享 Property

   - 當你產生 `instance` 的時候自動連接 prototype，`anotherGuy -> Anonymous.prototype`
   - 尋找 property 的方法類似下面：

     > ECMA-262 [9.1.8.1 OrdinaryGet](https://www.ecma-international.org/ecma-262/#sec-ordinaryget)

   ```javascript
   // ignores Receiver
   function OrdinaryGet(object, propertyKey) {
     // check if propertyKey is string or symbol
     let desc = object[propertyKey];
     if (desc) {
       return /* desc.[[value]] or call getter of desc */;
     } else {
       let parent = Object.getOwnPrototypeOf(desc);
       if (parent) {
         return OrdinaryGet(parent, propertyKey);
       }
     }
     return undefined;
   }
   ```

   - 簡化版如下

   ```javascript
   function getProperty(obj, key) {
     let curr = obj;
     while (curr !== null) {
       if (curr[key]) return curr[key];
       curr = curr.__proto__;
     }
   }
   ```

## 總結

- 用 `extends` 繼承
- 同名 method 會被 overload
- `super` 可以呼叫上層 `constructor` 或是上層 method
- 找 `property` 時，先找自己，再按照繼承順序往上找
  - 所以另外一種 `static` 是：把 `property` 放在 `Constructor.prototype` 上
