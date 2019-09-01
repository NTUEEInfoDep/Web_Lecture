# [Iteration statements](https://www.ecma-international.org/ecma-262/10.0/index.html#sec-iteration-statements)

## while loop

```javascript
while (condition) {
  // Do something
}
```

```javascript
do {
  // Do something
} while (condition);
```

## for loop

```javascript
for (let i = 0; i < 3; i++) {
  // Do something
}
```

- Iterates over **properties** of an object

```javascript
for (let property in object) {
  // Do something
}
```

```javascript
for (let property in console) {
  console.log(property); // debug, error, info, log, ...
}
```

- Iterates over **values** of an object

```javascript
for (let value of iterable) {
  // Do something
}
```

```javascript
for (let i of [1, 4, 5, 0]) {
  console.log(i); // 1, 4, 5, 0
}
```

```javascript
for await (let value of asyncIterable) {
  // Do something
}
```

### Break, Continue Statements

- 在 Iteration Statement 裡面可以用 `break` 和 `continue`
- 可以 label 一個 statement，讓 `break` 和 `continue` 跳到指定的地方
  - 幾乎沒用過，就算需要用也會忘記有這個功能
  - Java 和 Kotlin 也有這個功能

```javascript
outer: for (let i = 0; i < 3; i++) {
  console.log(i);
  for (let j = 0; j < 10; j++) {
    console.log(j);
    if (j > i) break outer;
  }
}
```

## Switch Statement

```javascript
switch (value) {
  case 3:
    handle3();
    break;
  case 'hello':
    handleHello();
    break;
  case null:
  case undefined:
    handleFalsy();
    break;
  default:
    handleDefault();
    break;
}
```

case 可以放任何 Expression（建議不要用 Object）
不 break 的話會繼續執行後面的 expression

- 例如上面的 `case null` 以及 `case undefined` 會做同一件事
