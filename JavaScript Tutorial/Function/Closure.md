# Closure

## 什麼是 closure

closure 就是指同時儲存 function 和他周遭環境這件事

簡單來說，每次產生 function 的時候，都會產生自己的 scope，並且記下外層的 scope 。
尋找變數時，會從自己開始一層一層往外找 。

最後達成的效果就是，每個 function 都可以 看到(get/set) 外層的變數。

## 為什麼需要 closure

1. callback(Higher order function)

   ```javascript
   let timeElapsed = 0;
   setInterval(function() {
     timeElapsed += 1;
   }, 1000);
   ```

   如果沒有 closure 的話：(我們改不了 setInterval 的實作)

   ```javascript
   let context = { timeElapsed: 0 };
   function addOneSec() {
     this.timeElapsed += 1;
   }
   setInterval(addOneSec.bind(context), 1000);
   ```

   題外話：python 也有 closure，不過要改外面的變數的值的時候要加關鍵字

2. private

   ```javascript
   function counterFactory() {
     let count = 0;
     return {
       increase() {
         ++count;
       },
       reset() {
         count = 0;
       },
       get() {
         return count;
       }
     };
   }
   let counter = counterFactory();
   ```

   經由 counterFactory 產生的 counter 只能透過三個 method 去得到 count，不能隨意更改

## Arrow function

> An ArrowFunction does not define local bindings for arguments, super, this, or new.target. Any reference to **arguments, super, this, or new.target** within an ArrowFunction must resolve to a binding in a lexically enclosing environment.

### Syntax

一般的 function

```javascript
function add(a, b) {
  return a + b;
}
```

中括號版本的 arrow function(如果 function 不只有 return 的話可以用)

```javascript
const add = (a, b) => {
  return a + b;
};
```

只有 return 的 arrow function

```javascript
const add = (a, b) => a + b;
```

### What's this

```javascript
function doSomeIO(callback) {
  let data;
  // some I/O intensive works
  callback();
  return data;
}

let obj = {
  name: 'Mac',
  birthDay: '1984/1/24',
  getAge() {
    console.log(this);
    return new Date().getFullYear() - new Date(this.birthDay).getFullYear();
  },
  doSomething() {
    doSomeIO(this.getAge);
  }
};

obj.doSomething(); // window ??
```

#### What happened

```javascript
doSomeIO(this.getAge); // `this` is gone
/// In function doSomeIO
callback = this.getAge;
let data;
// some works
callback(); // <- 不是用 this.callback() 呼叫的話，不會有 `this`，this 會變成 `window`
```

#### Arrow function version

Arrow function 裡面的 arguments, super, this, new.target 會使用外面的 scope

```javascript
let obj = {
  name: 'Mac',
  birthDay: '1984/1/24',
  doSomething() {
    if (!this.getAge) {
      this.getAge = () => {
        console.log(this);
        return new Date().getFullYear() - new Date(this.birthDay).getFullYear();
      };
    }
    doSomeIO(this.getAge);
  }
};
// 正常來說不會用object literal產生物件，這裡只是為了簡潔而這樣寫
```

## 總結

- 所有 function 都可以看到外層的變數
- this 不會包含在 closure 裡面(所以才有 arrow function)
- callback 盡量用 arrow function(如果你不確定的話)
