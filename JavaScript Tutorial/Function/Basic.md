# Basic

## Function definition

> ECMA-262 [14.1 Function Definitions](https://www.ecma-international.org/ecma-262/#sec-function-definitions)

```javascript
function identity(x) {
  return x;
}
console.log(identity(3));
console.log(identity(identity)(3));
console.log(identity(identity(identity)(3)));
```

- 沒有限制 return type (建議一個 function return 一種 type 就好)

```javascript
function nonsense(x) {
  if (!x) return Infinity;
  if (x < 3) return [];
  if (x < 42) return { some: 'object' };
}
```

- 這個東西有 Syntax 幾乎一樣的 Expression 版本，也就是可以出現在 `=` 右邊

```javascript
let a = function() {
  return 3;
};

let b = function c() {
  // c 不會被 declare
  return 2;
};
```

- (因為是用 `let`，所以跟一般 function hoist 不太一樣)

## Function call

- 可以用任意多個參數呼叫 function， JavaScript 會自己加上 undefined

```javascript
function shouldTake3(a, b, c) {
  console.log(this, a, b, c);
}

shouldTake3(); // Window {} undefined undefined undefined
shouldTake3(1); // Window {} 1 undefined undefined
shouldTake3(1, 2); // Window {} 1 2 undefined
shouldTake3(1, 2, 3); // Window {} 1 2 3
shouldTake3(1, 2, 3, 4); // Window {} 1 2 3
```

> The value of the "length" property is an integer that indicates **the typical number of arguments expected by the function**. However, the language **permits** the function to **be invoked with some other number of arguments**. The behaviour of a function when invoked on a number of arguments other than the number specified by its "length" property **depends on the function**.

因為定義的時候寫了三個參數，所以`shouldTake3.length` 是 3，但是也可以用不同數量的參數呼叫

## this

- function 有個特殊的參數叫做 this，this 不會在括號內傳進來，而是 function 是作為**誰**的 property value 而被**直接**呼叫的

  > ECMA-262 [7.3.18 Invoke](https://www.ecma-international.org/ecma-262/#sec-invoke)

  > The operation is called with arguments V, P, and optionally argumentsList where V serves as both the **lookup point for the property** and the **this value** of the call

  - 準確來說，作為 **this** 的 value 是 **function 被找到的地方**

    ```javascript
    function printThis() {
      console.log(this);
    }
    let a = { b: printThis };
    let b = [printThis];
    printThis(); // Window {}
    a.b(); // {b: f}, a 有個 property，它的 value 是 printThis，所以在 a 找到 printThis
    b[0](); // [f]， b 有個 property，它的 value 是 printThis，所以在 b 找到 printThis
    ```

- 當 function 作為 global 被呼叫的時候，this 的值會變成 global object

  > ECMA-262 [9.2.1.2 OrdinaryCallBindThis](https://www.ecma-international.org/ecma-262/#sec-ordinarycallbindthis)

  > If thisArgument is undefined or null, then ... **Let thisValue be globalEnvRec.[[GlobalThisValue]].**

- 使用 strict mode 可以正常得到 undefined

  > A this value of undefined or null is **not** converted to the global object and primitive values are not converted to wrapper objects.

- global object 在瀏覽器叫做 window，在 node.js 叫做 global
  - 所有 `var`宣告 或是 `function declaration` 都會出現在 global object 的 property
