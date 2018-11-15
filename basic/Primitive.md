# Primitives

## What's so special about primitives?

- immutable
- has no methods

### Immutability

```javascript
let a = 3;
a = 4; // The `3` inside memory is not replaced by `4`, the a is "pointing" to the memory of `4` instead
```

```javascript
let a = 'H';
let b = a + 'el' + 'lo w' + 'orl' + 'd!';
// 'Hel', 'Hello w', 'Hello worl', 'Hello world!' are created
```

[Example provided by MDN](https://developer.mozilla.org/en-US/docs/Glossary/Primitive#JavaScript)

using an object method does not necessarily mutate the object itself;

### Automatic conversion to object

#### If string is primitive, then how does `'apple'.toUpperCase()` work?

- All primitives have corresponding object type(except for null and undefined)

  String, Number, Boolean, Symbol

- When the user tries to call the method of primitive, the primitive is temporarily converted to corresponding object

  ```javascript
  var a = 'apple'; // a is a primitive
  a.toUpperCase();
  console.log(a); // a is not modified
  a.x = 3;
  console.log(a.x); // property on the temporarily object is not stored
  ```

- Minor detail:

  ```javascript
  4.toString();
  (4).toString();
  4 .toString();
  4..toString();
  // 4. is a valid number literal, so 4.toString() is equal to 4 toString();
  // Python also have this issue (Although python have no primitive)
  ```
