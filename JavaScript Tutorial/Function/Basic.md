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

- 下面這一段是寫給只寫過 C/C++ 的人看的，已經學過 Java / C# / Python 其中一種的人可以直接跳到 `this` 那一段

JavaScript 傳東西到 Function 裡面究竟會不會改變值呢？實際測試就可以知道了：

```javascript
let a = 0;
function addOne(a) {
  a += 1;
}

addOne(a);
console.log(a);
```

看到這裡你可能會覺得是 Pass by value

```javascript
let b = { a: 0 };
function addOne(b) {
  b.a += 1;
}

addOne(b);
console.log(b);
```

會發現 b.a 實際上被改過了

那 JavaScript 是如何傳值的呢？

```c
typedef struct {
  int a;
} B;

void addOne(int a) {
  a += 1;
}

void addOne2(B* b_ref) {
  b_ref->a += 1;
}

int main() {
  int a = 0;
  B b_obj = { .a = 0 };
  B* b = &b_obj;

  addOne(a);
  addOne2(b);

  printf("a: %d\n", a); // a: 0
  printf("b.a: %d\n", b_obj.a); // b.a: 1
  return 0;
}
```

實際上，問題出在 `Object` 和 `Primitive` 的差別，對於兩者而言，變數宣告的意義不同

```javascript
let a = 0; // 有塊記憶體放了代表「0」的值
let b = { a: 0 }; // 產生一個 Reference，指向 {a: 0} 的 value
```

而在傳入的時候，都是以值來傳入的，但是 Reference 就類似 pointer，複製 pointer 的值的時候，還是可以藉由那個值去改變其他東西

所以最後才會變成用 b.a 去改會有變化(直接讓 b += 1)的話不會影響外界。

- 結論，傳入不是 Primitive 的值 `a`，使用 `a.b` 或是 `a['b']` 會改到外面的值
- 注：Python 的方式差不多，只不過 Python 沒有 primitive，只有 immutable object
  - 像是 0 和 1 是在記憶體中的兩個不同 object
  - 所有變數都是 name binding，也就是 PyObject\*

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

## 總結

- function 可以接受/回傳任意型態的 value，但是實際運用上建議固定一種 type，否則會 debug 得很辛苦
- JavaScript 不會檢查參數數量
- 在 function 中傳入 reference(object) 可以改變他的值
- 小心 `this`，如果你不確定的話，遇到 callback 的時候全部用 arrow function 就可以了
