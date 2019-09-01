# Class

- 注意：這篇文章不會提到 `Constructor Function`，`class` 是 JavaScript 新版本 Standard 裡面的語法糖，舊版本如何定義 `class` 除非是看以前的 code，否則不太推薦使用。

## 定義 Class

```javascript
class Person {
  constructor(firstName, lastName) {
    if (!Person.humanity) {
      Person.humanity = [];
    }
    Person.humanity.push(this);
    this.firstName = firstName;
    this.lastName = lastName;
  }

  static getPopulation() {
    return Person.humanity ? Person.humanity.length : 0;
  }

  getFullName() {
    // 比較推薦使用 `getter`
    return `${this.firstName} ${this.lastName}`;
  }
}

let thatGuy = new Person('Ricardo', 'Millos');
console.log(thatGuy.getFullName()); // Ricardo Millos
console.log(Person.getPopulation()); // 1
```

1. `class` 就是負責產生/管理 `object` 的 `object`

   1. `class` 的大刮號裡面定義了跟 `class` 相關的操作
      1. `getFullName` 就是從 `Person` 產生的 `instance` 身上的資訊拿到 fullName
      2. `getPopulation` 則是拿到所有 `Person` 產生過的 `instance` 的數量
   2. 針對 `instance` 做的事情可以直接用 `instance.method` 呼叫
   3. 跟 `instance` 無關的事情可以用 `static` 定義，用 `class.staticMethod()` 呼叫
   4. `class` 產生的 `object` 就跟一般的 `object`(`{a: 3, b: 4}` 那種) 差不多
      1. `class` 的好處就是不用重複放同一個 `function` 在不同 `object` 身上
      2. 還有比起每次都手寫 literal，用 constructor 比較方便

2. 使用 `new Constructor(...params)` 產生新的 `instance`

   > **Objects are created by using constructors in new expressions;** for example, new Date(2009, 11) creates a new Date object. **Invoking a constructor without using new has consequences that depend on the constructor.** For example, Date() produces a string representation of the current date and time rather than an object.

3. 基本上產生 `instance` 的過程可以想像成這樣

   ```javascript
   let thatGuy = {}; // new 產生一個 `instance`
   thatGuy.__proto__ = Person.prototype; // 在prototype chain 上把 thatGuy 指向的 object 連上去
   thatGuy.constructor('Ricardo', 'Millos'); // 把 thatGuy 當成 `this` 傳到 Person 裡面
   // Person 在 thatGuy 身上加上 `firstName` 和 `lastName`
   // thatGuy 變成 {firstName: "Ricardo", lastName: "Millos"}
   ```

   看不懂也沒關係，會用就好

4. JavaScript 的 class definition 裡面只能定義 method
   1. 加 member 完全由 operator `.` 完成
      - 加在 `this` 身上 就是 `non-static` member
      - 加在 `class` 身上 可以當成 `static` member，不能由 `instance.staticMember` 找到

## 總結

- 在 class 裡面定義 method
- 用 new 產生 instance
- 用 class 產生的 instance 基本上跟一般 object 差不多

## 補充

- 基本上在 `class XXX` 裡面 method 定義 `static aaa`, `bbb` 兩個 method
  - `static aaa` 會跑到 `XXX` 身上，變成 `XXX.aaa`
  - `bbb` 會跑到 `XXX.prototype` 身上，變成 `XXX.bbb`
    - 包括 `constructor`
      > ECMA-262 [9.2.10 MakeConstructor](https://www.ecma-international.org/ecma-262/#sec-makeconstructor)
