# Operator

除了常見的四則運算，比較，Bitwise (以及括號, 逗號)以外，JavaScript 還有以下幾種 operator

## Strict equality

如果`type`不同，即回傳 false

`type`相同時，`value`相同才回傳 true

```javascript
a === b;
a !== b;
```

如果你確定你在做什麼，才使用 `==` 與 `!=`

就算 `===` 和 `!==` 是推薦使用的 operator，比較兩個物件的時候還是不要用 operator 比較好

```javascript
let a = { a: 1, b: 2 };
let b = { a: 1, b: 2 };
console.log(a === b); // a 和 b 是在不同時間下分別產生的兩個 value，因此不相等
```

## Exponentiation

```javascript
2 ** 5; // 32
```

## Pre/Post Increment/Decrement

```javascript
a++;
--a;
```

## Operator New

產生出新的物件，傳給 constructor

```javascript
new Constructor();
```

## Operator In

確認 `property` 有沒有在 b 或是 b 的 `prototype chain` 上

```javascript
a in b; // not 'in' in Python
```

## Instanceof

看 `b.prototype` 有沒有在 a 的 `prototype chain` 上

```javascript
a instanceof b;
```

## Others

```javascript
typeof "I'm a string";
/* Asynchronous */
await awaitable;
/* Iterator */
yield 3;
yield* [1, 2, 3];
/* 很少用到 */
delete a.b;
void doSomething();
```

## 總結

- 比較 primitive 的相等性時，盡量用 `===` 與 `!==`
