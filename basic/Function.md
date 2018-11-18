# Function

## Normal function

```javascript
function basic(pos, def=1, ...args) {
    console.log(pos, def, args);
    return 0;
}
```

## Function expression

```javascript
// can also be var, let
const basic = function (pos, def=1, ...args) {
    console.log(pos, def, args);
    return 0;
}
```

## Arrow function

```javascript
// can also be var, let
const basic = (pos, def=1, ...args) => {
    console.log(pos, def, args);
    return 0;
}
```

```javascript
const identity = x => x;
// const identity = function(x) { return x; };
const add = (a, b) => a+b;
// const add = function(a, b) { return a+b; };

// For higher order functions, thing gets really complicated 
const curryAdd = a => b => a+b;
/* const curryAdd = function(a) {
	return function(b) {
        return a+b;
    };
}*/
const add3 = curryAdd(3);
```
### What's `this`

if the function is not bound by `Function.prototype.bind`, `this` can be known by examine the call site

#### Can we always see the call site?

```javascript
let randomP = document.getElementsByTagName('p')[0]
randomP.addEventListener('click', function(event) {
 	alert(this); // What is the `this` here?
});
```

#### `this` inside arrow function

always the same as the environment (context)

```javascript
function SomeFunction() {
    console.log(this);
    randomP.addEventListener('click', event => {
        alert(this); // Same `this` as in SomeFunction
    })
}
randomP.addEventListener('click', event => {
    alert(this); // Same `this` as in Global (window/global)
})
```
Actually, arrow funtion does not have `this ` (Closure)

```javascript
function SomeFunction() {
    let a = 3;
    randomP.addEventListener('click', function(event) {
        alert(a) // The `this` above is just like this `a`
    })
}
```

## Summary

### Use function(){} when ...

1. Constructor
2. You want to bind `this` to function and pass to another function

### Use () => {} when ...

1. It is better to have same `this` as outside
2. Whenever you think function() {} is hard to read