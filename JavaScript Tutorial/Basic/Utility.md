# Utility

## Spread Syntax

創造 Array 和 Object 的時候可以用，當你不想要改到原本 Array 或 Object 的時候可以用

### Array

顧名思義，就是直接展開

```javascript
let a = [1, 2, 3];
let b = [4, 5];
// 複製 a 的內容，注意是真正的「展開」，所以是對 a 最外層的 shallow copy
let c = [...a]; // [1, 2, 3]
let d = [...a, ...b]; // [1, 2, 3, 4, 5]
let e = [...b, 1, 2, 3, ...a, 4, ...c]; // [4, 5, 1, 2, 3, 1, 2, 3, 4, 1, 2, 3]
```

### Object

還是一樣直接展開，如果有同名的 property，後面會蓋掉前面的

```javascript
let a = { x: 1, a: 3 };
let b = { x: 2, b: 4 };
let c = { ...a, ...b, c: 5 }; // {x: 2, a: 3, b: 4, c: 5}
let d = { c: 6, ...b, ...a }; // {c: 6, x: 1, b: 4, a: 3}
let e = { ...b, ...a, x: 5 }; // {x: 5, b: 4, a: 3}
```

- **以下的東西不會也沒關係**

## Destructuring assignment

使用[MDN 上的例子](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Syntax)

### Array

#### 對應位置的東西直接 assign

```javascript
let a, b;
[a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20
```

#### 用`...`把剩下的收集起來

```javascript
let a, b, rest;
[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a); // 10
console.log(b); // 20
console.log(rest); // [30, 40, 50]
```

### Object

#### 拿出物件裡對應名字的東西

```javascript
let a, b;
({ a, b } = { a: 10, b: 20 });
console.log(a); // 10
console.log(b); // 20
```

- 不是在宣告的時候需要用括號

```javascript
let { a, b } = { a: 10, b: 20 };
console.log(a); // 10
console.log(b); // 20
```

- 當你想要拿出來卻想要用另外一個名字的時候

```javascript
let { a = c, b } = { a: 10, b: 20 };
console.log(c); // 10
console.log(b); // 20
```

#### 用`...`把剩下的收集起來

```javascript
let a, b, rest;
({ a, b, ...rest } = { a: 10, b: 20, c: 30, d: 40 });
console.log(a); // 10
console.log(b); // 20
console.log(rest); // {c: 30, d: 40}
```

- 以上說的都可以在 function 的參數使用

```javascript
function test({ a, b }) {
  console.log(a, b);
}
test({ a: 10, b: 20 });
```

#### 可以 nested，但是要注意可讀性

```javascript
let {
  head: {
    children: [{ innerText: title }, ..._]
  }
} = document;
console.log(title); // 實際上只有 title 被宣告
```

## Rest Parameters

很像 destructuring，讓 function 能夠接任意個參數，收集在 array 裡面

```javascript
function printf(formatString, ...rest) {
  console.log('What is rest: ', rest);
  console.log(formatString, ...rest); // 把 rest 展開
}

printf('%.2f %s %.2d', 2.5, 'not work on all browsers', 1.2);
```

## 總結

- React 和 Redux 為了維持 Immutability，所以用 Spread Syntax 會比較輕鬆
- Destructuring Assignment 和 Rest Paramenters 不用會也沒關係
