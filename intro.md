# Introduction to Web Development

## VSCode
> Visual Studio Code - Code Editing. Redefined
> Free. Open source. Runs everywhere.

[VSCode](https://code.visualstudio.com/)


## Node.js
> *Node*.*js*® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
<iframe src='https://nodejs.org/en/' height='600'>Node.js official website</iframe>

## HTML
> HyperText Markup Language

### Syntax
```html
<tag attribute='value' attribute2="value2">Content</tag>
<!-- This is a comment -->

<p>I'm a paragraph</p>
```
<p>I'm a paragraph</p>

### Empty element
```html
<img src='https://upload.wikimedia.org/wikipedia/en/7/7d/Lenna_%28test_image%29.png' alt='Lena'>
<br>
<input>
```
<img src='https://upload.wikimedia.org/wikipedia/en/7/7d/Lenna_%28test_image%29.png' alt='Lena'>
<br>
<input>

## JavaScript
> ECMA-262, ECMAScript

###  Primitive Type
|   Type    |                   Example                   |
| :-------: | :-----------------------------------------: |
|  string   |              'Hello', "World"               |
|  number   | 1, .2, 1e4, 0b111, 010, 0xFF, NaN, Infinity |
|  boolean  |                 true, false                 |
|   null    |                    null                     |
| undefined |                  undefined                  |
|  symbol   |             Symbol.toPrimitive              |

### Object
Date, Set, Map, Array, Function, Error, Math, RegExp, etc

### Variable Declaration
```javascript
let i = 3;
const PI = 3.1415926535;
```

### Conditional Statement
```javascript
if(expression) {
    /* Some statements */
} else {
    // Other statements
}

switch(expression) { /* Not only for integral type cases (Does not work for array literal)*/
    case 1:
        console.log('1');
        /* fall through */
    case 1.5:
        console.log('1 or 1.5');
        break;
    case 'Abc':
        console.log('Abc');
        break;
    case undefined:
        console.log('undefined');
        break;
    default:
        console.log('default');
}
```

### Loops
```javascript
while(expression)
    [statement]

do
    statement
while(expr)
    
for([expr]|[var declaration]; [expr]; [expr])
    [statement]

for(let|var <declaration> in|of <iterable>)
    [statement]
```

### Function
```javascript
function functionName(positional, defaultArg=1, ...rest) {
	console.log(positional, defaultArg, rest);
    return;
}

functionName(); // undefined "2" []
```

### Hello World!

#### hello.js
```javascript
console.log('Hello world');
```
#### Terminal
```bash
node hello.js
```

## CSS
> Cascading Style Sheets

```css
Selector {
    Property: Value;
}

p {
    font-size: 20px;
}
```

[CSS Diner](https://flukeout.github.io/)

## Simple web app - BMI calculator
### ...