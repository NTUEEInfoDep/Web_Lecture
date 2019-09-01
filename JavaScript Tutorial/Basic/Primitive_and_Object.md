# [Type](https://www.ecma-international.org/ecma-262/#sec-ecmascript-language-types)

> An ECMAScript language type corresponds to values that are directly manipulated by an ECMAScript programmer using the ECMAScript language. The ECMAScript language types are **Undefined, Null, Boolean, String, Symbol, Number, and Object**. An ECMAScript language value is **a value that is characterized by an ECMAScript language type**.

## ECMAScript Language Types

總共有七種 type，如下面所示：
| Type | Value |
|:-------:|:--:|
|Undefined| undefined|
|Null| null |
|Boolean| true, false|
|String| "", "a", "字串", '單引號還是字串'|
|Symbol| @@iterator, @@toPrimitive|
|Number| 42, -0.3, NaN, Infinity|
|Object| {}, Object |

- 可以用`typeof`這個 operator 「大略」看到一個 value 的 type
  - `typeof` 的結果會根據[這個表](https://www.ecma-international.org/ecma-262/#table-35)而定
  - 可以看到有幾個不同的地方
    1. `typeof null` 會是 "object"
    2. `typeof callableObject` 會是 "function"

## Value

跟 Python 一樣，JavaScript 的 `type` 是在 `runtime value` 身上 (dynamic typed)，不像 c++ 一樣在 `compile time` 時候就知道一個 expression 的 type(static typed)

- 此外，JavaScript 的 `variable` 沒有 `type`，只有 `variable` 裡面的 `value` 才有 `type`

```javascript
let a = 'something'; // 宣告變數`a`
a = 2.0;
```

因為 a 這個 `variable` 沒有 `type`，所以 a 身上可以放 `type` 是 `string` 的 "something" 或是 `type` 是 `number` 的 2.0

- 如果在 c++ 裡面，`a` 和 等號右邊的 `expression` 都會有 `type`

```cpp
int a = 2.0; // a 是一個 `int` 的 lvalue， 2.0 則是 `int` 的 prvalue
a = "something"; // 因為 "something" 是 `const char*` 的 prvalue，不能被 implicit convert 成 `int`，所以會有 compile error
```

編譯器在 `compile time` 就會決定每一個東西的 `type`，跟 JavaScript 不同

雖然很明顯可以看到 `a` 和 "something" 是兩個完全不同的東西，但是在之後的教學中，我們有時候會以 `a` 來稱呼對應到的 `value`，例如：

```
a是一個字串，長度是9。（這裡的 a 是指"something"(value)，而不是 a 這個名字/變數(variable)）
```

## Primitive and Object

> A primitive value is a member of one of the following built-in types: **Undefined, Null, Boolean, Number, String, and Symbol**; an object is a member of the built-in type **Object**; and a function is a callable object.

可以看到，JavaScript 的 `value` 分成 `primitive` 和 `object` 兩種。但是在說明為什麼要這樣區分之前，需要知道什麼是 `object`

### 什麼是 `object`

> In ECMAScript, an object is **a collection of zero or more properties each with attributes that determine how each property** can be used

> Properties are **containers that hold other objects, primitive values, or functions**.

`object` 和 `primitive` 不同，`object`是 `property`的集合，`property` 則可以放 `primitive`與 `object`。

- 簡單來說，就是一堆變數的集合。

```javascript
let college = { name: '電資學院', departments: ['電機', '資工'] };
```

上面 `college` 所指的 `value` 是一個 `object`，其中有我們定的兩個`property`，分別是 `college.name` 以及 `college.departments`。

可以看到 `object` 可以很自然的把一個東西用跟他相關的其他東西描述出來。

```javascript
college.email; // undefined
```

因為沒有定義 `college` 的 `email` 這個 `property`，所以看到 `undefined`

> Unlike most class-based object languages, **properties can be added to objects dynamically by assigning values to them**.

JavaScript 允許動態更改 `object` 上的 `property`

```javascript
college.email = 'eecs@ntu.edu.tw'; // 雖然看起來很像變數，不過`property`不需要宣告
console.log(college);
/*{ name: '電資學院',
    departments: [ '電機', '資工' ],
    email: 'eecs@ntu.edu.tw' }*/
```

### 什麼是 `primitive`

介紹完 `object` 之後，就可以說明什麼是 `primitive`了。

- 簡單來說 `primitive` 就是「不能有 `property` 的 `value`」。

由於 `object` 需要儲存 `property` ，需要較多記憶體來存資料，能夠用 `primitive` 的時候盡量用。

```javascript
let a = 3; // 盡量使用 primitive 3
let b = new Number(3); // 盡量不要使用 object 3
```

## 總結

- 只有七種 `type` ，不是 `primitive` 的東西都是 `object`

  - 例如 `Array`, `Function` 都會是 `object`

- `type` 在 `value` 身上

- 盡量用 `primitive`

## 補充：`Number`

- JavaScript 沒有整數，Number 是 IEEE 754 的 64-bit floating point number(也就是`double`)

- Infinity, NaN 也是 IEEE 754 的規範

- 值得注意的是，0 與 NaN 會被當成 false, 其他則是 true。

- 另外，NaN 不能與任何東西比較，包含 NaN 。要判斷一個數字是不是 NaN，請使用 `isNaN` 或是`Number.isNaN`(比較推薦使用後者)
  - python 裡面也是這樣
  - IEEE 754 裡面有規定 floating point 比較
