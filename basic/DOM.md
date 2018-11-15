# DOM - Document Object Model

## Use CSS in HTML

### Internal CSS

```html
<head>
  <style>
      body {
          background-color: grey;
      }
      * {
          font-size: 1.5em;
      }
  </style>
</head>
```

### External CSS

```html
<head>
  <link rel='stylesheet' href='Path_To_CSS_File'>
</head>
```

### Inline CSS

```html
<p style='font-size: 2em; color: red;'></p>
```

## Use JavaScript in HTML

### Internal Script

```html
<body>
    <button onclick='test()'></button>
	...
    <script>
        function test() {
            alert('Hello world');
        }
    </script>
</body>
```

### External Script

```html
<head>
	<script type='text/javascript' src='Path_To_JavaScript_File'></script>
</head>
```

## Document Object Model

<table>
    <tr>
    	<td>
            <img src='./asset/DOM-model.png' alt='DOM-model'>
        </td>
        <td>
            <p>
                <html>
                    <head>
                        <title>My title</title>
                    </head>
                    <body>
                        <h1>A heading</h1>
                        <a href=''>Link text</a>
                    </body>
                </html>
            </p>
        </td>
    </tr>
</table>
### Class, tag, id, name

|      | Class                     | Tag          | ID       | Name         |
| ---- | ------------------------- | ------------ | -------- | ------------ |
| HTML | class='a b c'             | <p></p>      | id='sth' | name='sth'   |
| CSS  | .a .b .c                  | p            | #sth     | [name='sth'] |
| JS   | Elem.className/Elem.class | Elem.tagName | Elem.id  | Elem.name    |

### Manipulating DOM with ~~Vanilla.js~~ JavaScript

#### Get Element

| Method                                    |
| ----------------------------------------- |
| document / document.body / document.head  |
| Document/Element.getElementsByTagName()   |
| Document/Element.getElementsByClassName() |
| Document/Element.querySelector()          |
| Document/Element.querySelectorAll()       |
| Document.getElementById()                 |

#### Create Element

| Method                    |
| ------------------------- |
| document.createElement()  |
| document.createTextNode() |
| Node.cloneNode()          |


##### Element Properties

| Properties         |
| ------------------ |
| Node.textContent   |
| Element.classList  |
| Element.attributes |
| Element.innerHTML  |
| HTMLElement.style  |

#### Modifying Element

| Methods                        |
| ------------------------------ |
| Node.appendChild()             |
| Node.removeChild()             |
| Node.insertBefore()            |
| Element.removeAttribute()      |
| Element.setAttribute()         |
| Element.toggleAttribute()      |
| EventTarget.addEventListener() |

#### DOM tree traversal

| Method                                  |
| --------------------------------------- |
| Node.childNodes                         |
| Node.parentNode / Node.parentElement    |
| Node.nextSibling / Node.previousSibling |
