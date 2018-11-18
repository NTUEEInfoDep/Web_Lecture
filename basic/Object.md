# Object

- Associative array (key: value pair)
- key(property) must be unique
- keys(property) are unordered
- python dict with dot notation

## Object literal

```javascript
let a = {a: Infinity, "b": true, "c": "str", d: Math, e: function() { return 3; }, add(a, b) { return a+b; }};
/* Pretty printed: */
let a = {
    a: Infinity,// Number as value (key can be bare word)
    "b": true,  // boolean as value (key can also be String)
    0: "str",   // String as value (key can be Number)
	Math: Array,// Another Object as value (also as key)
	e: function(a, b) { return a+b; }, // Function as value
	add(a, b) { return a+b; }       // Syntax sugar of above
}
```

## JSON

>JavaScript Object Notation, ECMA 404

JavaScript Object with the following constraint:

- Key must be string
- Value can be string, number, object, bool, array, null

## Property accessors

### Dot notation

```javascript
a.a       // Infinity
a.b       // Infinity
a.Math    // Array
a.e(1, 2) // 3

a."a"     // Syntax Error, the token after dot must be valid javascript identifier 
```

Cannot access property conveniently

- a.0 // error, a."0" // error
- Given a key, cannot access the corresponding value

### Bracket notation

```javascript
a['a']       // Infinity
a[Math]      // Array
a['e'](1, 2) // 3
a[0]         // "str"
```

## Removal of property

```javascript
delete a['a']
```

## Constructor function

- Constructor won't create object
- Constructor takes in new object(instance), and add new property(key) to it (just like`__init__` in Python)
- Constructors are just normal functions (Except for built-in, class, arrow functions, functions in JavaScript can be use as constructor, no matter it makes sense or not)

```javascript
function Animal(name) {
	this.name = name // the constructor add new property to the newly created object
} /* Extra detail: constructor set the __proto__ of new object to Animal.prototype*/
let doge = new Animal('doge'); // object is created by new
```

```python
class Animal:
	def __init__(this, name):
		this.name = name # the constructor add new attribute to the newly created object
doge = Animal('doge') # object is created by __new__
```

### Method declaration

instance method

```javascript
function Animal() {
	this.bark = function () { return "Hello"; }
	// Bad practice, create new function for every instance
}
// Do this instead
Animal.prototype.bark = function() {
	return "Hello";
}
```

class method / static method

```javascript
Animal.count = function () { ... }
```

### Syntax sugar: class notation

```javascript
class Animal extends Creature {
    constructor(name) {
        super();
        this._name = name;
        Animal.counter = Animal.counter++ || 1;
    }
    
    static count() { return Animal.counter; }
    bark() { return "Hello"; }
 	get name() { return this._name; }   
}
```

```python
def Animal(Creature):
    counter = 0
	def __init__(self, name):
        super().__init__()
		self._name = name
		counter += 1

    @staticmethod
    def count():
        return Animal.counter
    
    def bark():
        return "Hello"
    
    @property
    def name(self):
        return self._name
```

## `this` binding

1. directly call (either by dot notation or bracket notation)

   ```javascript
   let k = {a: function() { console.log(this); }}
   k.a() // `this` is k
   k['a']() // `this` is k
   // Extreme example
   a.b.['c'].d.['e'].f()['g'].h()
   // `this` inside `h` is a.b.['c'].d.['e'].f()['g']
   ```

2. new Constructor() (inside constructor, `this` is the newly created object)

3. explicit binding

   ```javascript
   function what() { console.log(this); }
   const bound = what.bind({a: 3});
   bound() // `this` inside `bound` is {a: 3} 
   
   let wrap = {0: bound}
   wrap[0]() // still {a: 3}, not wrap / {0: bound}
   ```

4. No binding

   ```javascript
   what() // undefined
   ```


