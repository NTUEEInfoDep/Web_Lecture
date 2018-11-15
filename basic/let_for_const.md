# Let, Var, and Const

## Hoisting

Declaration of variable and function are automatically moved to the top of code

```javascript
test();

function test() {
    console.log("I'm hoisted");
}
```

## `var` weirdness
>  function scope, hoisting

```javascript
function weirdVar() {
    console.log(a);
    var a = 5;
    console.log(a);
}
```

```javascript
function weirdVar2() {
	console.log(a, b);
    if(!a) {
        var b = 5;
        console.log(a, b);
    }
    for(var a=0; a<5; a++);
    console.log(a, b);
}
```


## `let` to the rescue
>  block scope, non hoisting

### Change all `var`s above to `let`, what's the result?

### What do we lose from using `let`?

```javascript
var a = 3;
console.log(a);
var a = 4;
console.log(a)
```

```javascript
let b = 2;
console.log(b);
let b = 3;
console.log(b);
```

## `const` pitfall

### What does `const` do?

```javascript
const a = 5;
a = 4; //Uncaught TypeError: Assignment to constant variable.

let b = a;
b = 3;
console.log(a, b);
```

```javascript
let shouldBeConst = {};
shouldBeConst.x = 3;
console.table(shouldBeConst);
```

