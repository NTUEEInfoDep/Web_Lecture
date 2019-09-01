# Common Object

- ### [6.1.7 The Object Type](https://www.ecma-international.org/ecma-262/#sec-object-type)

> An Object is logically **a collection of properties**. Each property is either a data property, or an accessor property:

- 因為 object 就是一堆 property，所以 object literal 當然就是寫出一堆 property

> A **data property** associates **a key value** with **an ECMAScript language value** and a set of Boolean attributes.

> An **accessor property** associates **a key value** with **one or two accessor functions**, and a set of Boolean attributes. The accessor functions are used to store or retrieve an ECMAScript language value that is associated with the property.

- 這裡只考慮 data property，可以看到 data property 就是 key 對應到 value

> A property key value is either an **ECMAScript String value** or a **Symbol value**. All String and Symbol values, including the empty string, are valid as property keys.

- key 只能是 Symbol 或是 String

> An **integer index** is a String-valued property key that is a canonical numeric String (see 7.1.16) and whose numeric value is either +0 or a positive integer ≤ 2^53 - 1. An **array index** is an integer index whose numeric value i is in the range +0 ≤ i < 2^32 - 1.

- 因為 key 只能是 Symbol 或 String，而且 Array 是 object，所以 Array 其實是用 數字字串(也就是 index) 對應到 他的 element(value)

## Syntax

> ECMA-262 [Object Literal](https://www.ecma-international.org/ecma-262/#prod-ObjectLiteral)

```javascript
let a = {}; // 空物件
let b = { x: 1 }; // IdentifierName: AssignmentExpression
let c = {
  0: b, // NumericLiteral: AssignmentExpression
  a: 1, // StringLiteral: AssignmentExpression
  b() {
    // MethodDefinition
    return 2;
  },
  [Symbol.toPrimitive]: () => 3, // ComputedPropertyName: AssignmentExpression
  ...b // ...AssignmentExpression
};
```

### Syntax 解釋

1. 最基礎的語法： `key: value`

   - key 可以是以下任意東西
     1. 字串
     2. 可以被 implicit cast 成 string 的東西
     3. 任何合法的的 identifier
     4. Symbol
   - 當你的 key 是經由 expression 產生的時候

     ```javascript
     let a = { name: 'All' };
     let b = { a.name: 3 }; // wants { All: 3 };
     // Uncaught SyntaxError: Unexpected token .
     ```

     會發現 JavaScript 不接受任意 expression，此時就要使用 `computed property name`，用中括號包住

     ```javascript
     let a = { name: 'All' };
     let b = { [a.name]: 3 }; // { All: 3 };
     ```

     JavaScript 就會先 evaluate 中括號裡面的 expression，把他當成 key

2. Assignment Expression

   [下一篇文章](Utility.md)就會提到

3. Method Definition

   當你想要用 function 當成 value 的時候，你可以：

   ```javascript
   let a = {
     a: function() {
       // 使用 Function Expression
       return 3;
     },
     b: () => 3, // 使用 Arrow Function
     c() {
       // 使用 Method Definition
       return 3;
     }
   };
   ```

   選擇一種用就好，不要混在一起用

4. 雖然 JSON 是 JavaScript Object Notation，但是 JavaScript 的 Object Literal 跟 JSON 不同
   - JSON 比較嚴格
   - JSON 的標準定在 [ECMA-404](https://ecma-international.org/publications/standards/Ecma-404.htm) ~~Not Found~~
