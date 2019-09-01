# What is JavaScript

- ~~A **trademark** owned by **Oracle**~~
- From [Wikipedia](https://en.wikipedia.org/wiki/JavaScript)
  > a high-level, interpreted scripting language that conforms to the ECMAScript specification. JavaScript has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.
- Hugely Influenced by Java

## ECMAScript specification

[ECMA-262](https://www.ecma-international.org/ecma-262/)

> 在教學中看到這種文字，就是引用 `standard` 裡面的話

## How to run JavaScript

1. Open your browser
2. Open `Developer tools` by pressing `F12`, `Ctrl-Shift-I`, or `Command-Shift-I`
3. Open `Console` tab

## Hello World

```javascript
console.log('Hello world!');
```

- semicolon is optional (but recommended)
- `console` is an `object`, `console.log` is an `function` of type `object`
  - Sadly, `console` is not in ECMA-262 standard, but major browsers usually implement their own `console`
  - However, WHATWG developed a standard of `console` (and many other web APIs)
- `console.log` can take any number of arguments(and not only for strings)
  - console.log(1, [2, 5], console)
- `console.log` can have `format string`(rarely used)

## 寫 JS 前的心裡準備

1. 小心 Implicit conversion，注意每個東西的 type
2. 小心 null 和 undefined
3. JS 的雛型在 10 天內就做出來了，所以有許多奇怪的設計
4. 每個瀏覽器的 Implementation 可能都不一樣，所以 `Babel` 很重要
5. 雖然 JS 是 dynamic typed，把他當成 static typed 寫會比較容易
   - 雖然一個 function 可以 return 任何 type，變數也可以接任何 type 的東西，固定一個 type 會比較好
