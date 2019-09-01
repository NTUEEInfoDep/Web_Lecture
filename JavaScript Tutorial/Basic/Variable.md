# Variable

## Variable declaration

請使用 `let`, `const`，盡量不要使用 `var`

由於 `type` 在 `value` 身上，宣告的時候不需要寫 `type`

```javascript
const a = [1, 2, 3];
let b = 'Hello';
```

## Literals

除了 null, undefined, true, false, NaN, Infinity ，還有以下幾種 literal

### Numeric literals

- Exponential
  - 1e3 === 1000
  - 1E3 === 1000
- Binary, Octal, Hexadecimal
  - 0b110, 0o132, 0xaf3
  - 0B110, 0O132, 0XAF3

### String literals

- 單引號或雙引號
  - 跟 c++, Python 一樣用 '\' 來 escape 特殊字元
- template literal
  ```javascript
  let a = 3;
  let b = 5;
  let c = `${a} / ${b} = ${a / b}`;
  ```
  - template literal 裡面可以插入 Expession ， 特殊字元（例如換行）會被保留
  - 比起連接字串，用 template literal 是比較建議的作法

### Object literals

- Arrow function
  - (a, b) => a+b
- Array
  - [1, 2, 3]
- Object
  - key 的引號可以不寫： {a: 123, "b": {a: function() {return 42;}}}
  - 使用 Expression evaluate 後的結果當成 key: {[Symbol.toPrimitive]() { return 42; }}
- RegExp
  - /[\r\n]|\r\n/g

## 補充

直接寫 `let a;` 的話，a 會是 `undefined`

其實可以用 `var a = 3;` 來宣告變數，不過行為和有效範圍會跟 `let` 不同，不太建議使用
