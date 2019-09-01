# Higher Order Function

接下來介紹幾個 Array.prototype 上的 method ，注意回傳陣列的 method 都會是回傳新的，不會更改原本的值。(Immutability)

跟 Python 裡面的 `map`, `filter`, `functools.reduce` 一樣

## Array.prototype.map

把所有東西按照順序傳入 function，並把結果收集在陣列裡回傳

[a, b, c] -> [f(a), f(b), f(c)]

- 用 Python 的話來說就是 [f(i) for i in a]

```javascript
let a = [1, 2, 3];
const isOdd = num => num % 2 === 1;
console.log(a.map(isOdd));
console.log(a);
```

## Array.prototype.find, Array.prototype.findIndex, Array.prototype.filter

滿足條件:傳入的 function(predicate) 在接收 element 之後回傳 true 的話就是滿足條件

- find: 找滿足條件的第一個 element 並回傳 element 本身

  - 用 Python 的話來說就是 `next((i for i in a if predicate(i)), None)`

- findIndex: 找滿足條件的第一個 element 並回傳他的 index

  - 用 Python 的話來說就是 `next((index for index, i in enumerate(a) if predicate(i)), -1)`

- filter: 找滿足條件的所有 element 並回傳 element 本身(回傳一個陣列)

  - 用 Python 的話來說就是 `[i for i in a if predicate(i)]`

```javascript
let a = [1, 2, 3];
const isOdd = num => num % 2 === 1;
console.log(a.filter(isOdd));
console.log(a);
```

## Array.prototype.reduce

在某些語言被稱為 `lfold`, `accumulate`，
每次把兩個 element 傳入 function，再把得到的值與剩下的值傳入 function，最後剩下一個結果

- [a, b, c] -> f(f(a, b), c)

第二個參數可以傳入初始值(initialValue)

- [a, b, c] -> f(f(f(initialValue, a), b), c)

```javascript
let a = [1, 2, 3];
const add = (a, b) => a + b;
console.log(a.reduce(add)); // add(add(1, 2), 3)
```

## Array.prototype.sort

需要傳入比較大小的 function(compareFunction)，不傳的話預設是字典排序(1 > 99, 110 > 99)

`compareFunction(a, b)` 由回傳 `> 0`, `== 0`, `< 0` 的值來決定 `a > 0`, `a == b`, `a < b`

也就是說，要用數字的排序，可以用 a - b 當作 compareFunction，最後就會得到遞增數列

**這個 method 會 in-place 改變原本的 Array**

```javascript
let a = [1, 3, 11, 6, 2];
console.log(a.sort());
console.log(a.sort((a, b) => a - b));
console.log(a);
```
