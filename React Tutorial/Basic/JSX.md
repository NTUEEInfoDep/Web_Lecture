# JSX

## JSX 是什麼

簡單來說，就是可以自訂 tag 的 HTML。

可以想像成每次寫 JSX 的地方都會變成 html element，JSX 會生成一個物件。

- 要注意的是，雖然長的像 HTML Tag，但是兩個東西完全不一樣

## JSX Syntax

```JSX
const something = (
  <div className="container">
    <h1 style={{color: "red"}}>I'm a JSX</h1>
    <p>{`Hello there! ${Math.pow(2, 5)}`}</p>
  </div>
);
```

上面的 JSX 會 render 出下面的 HTML

```html
<div class="container">
  <h1 style="color: red;">I'm a JSX<h1>
  <p>Hello there! 32</p>
</div>
```

- #### 注意：以下的內容非常多，如果覺得一次無法吸收，可以先讓自己接受上面的寫法，跳到下面 `寫JSX的好習慣` 與 `總結`，看完整個 Basic 再回來看

### 特徵 1 - Expression

- JSX 最終會變成 `object`，所以是一個 expression
  - 把他想成 `{type: "h1", children: "I'm a JSX", style: {color: "red"}}` 的一個`object`就好了（當然這是簡化模型）
- expression 當然可以 assign 給變數、存在陣列裡面、被 function 回傳
- 因為最終是一個物件，所以最外層只能有一個 tag
- 產生出來的物件會被叫做 `React Element`

  ```JSX
  const error = (
    <p>A</p>
    <p>B</p>
  );
  // Error: Adjacent JSX elements must be wrapped in an enclosing tag.
  ```

  - 你可以隨便找個 `<div>` 包起來，但是有時候多包一層會讓 CSS 壞掉，所以可以使用 `React Fragment`

    ```JSX
    const accepted = (
      <React.Fragment>
        <p>A</p>
        <p>B</p>
      </React.Fragment>
    );

    const alsoAccepted = (
      <>
        <p>A</p>
        <p>B</p>
      </>
    ); // 嫌字太多可以打這樣
    ```

    - 要注意的是，因為不會實際 render 出來，所以 `React Fragment` 身上不能有 `className`、`style`之類的東西（但是可以有 key）

### 特徵 2 - 類似 HTML

- 語法上 JSX 基本上跟 HTML 相近，但是要注意幾個地方

- 以下舉[合法的 HTML](https://html.spec.whatwg.org/#a-quick-introduction-to-html)與合法的 JSX 當例子

```html
<input name="address" data-dummy="" />
<!-- 這個也是合法的HTML，而且完全等於上面： <input name=address data-dummy > -->
<button onclick="echo()"></button>
<!-- button 不是 void element，不能寫成上面的 self-closing 版本 -->
```

```JSX
const anInput = (<input name="address" dataDummy />);
/* <input name="address" dataDummy={true}/>，結尾一定要加 `/`，否則是錯誤 */
const aButton = (<button onClick={echo} />);
```

1. attribute: camelCase
   - 因為最後會變成 object，所以 key 盡量是 dot notation 可以用的形式
   - 所以 React 選擇全部都用 camelCase: className, onClick, ......
   - style 同理，傳入物件，物件的 key 也使用 camelCase: font-size -> fontSize；傳值使用數字或單位：`{ lineHeight: 1.5 }`, `{ fontSize: "2rem" }`
2. tag
   - HTML 只有某些特定的 element 才可以寫成 self-closing tag
   - React 沒有限制，但是一定要寫 `/`
3. value
   - 不寫 `=` 的話預設是 `true`
     - 不是很重要，只是為了完整提出來
     - HTML 則是預設空字串 `""`
   - 傳 function 的時候傳入 function object 本身
     - HTML 則是[傳入合法的 JavaScript code](https://html.spec.whatwg.org/#event-handler-content-attributes)

### 特徵 3 - 插入 JavaScript Expression

在 React 裡面，想要用 JavaScript 的值決定 render 出來的東西，只要用大括號包住 JavaScript value，就可以在需要的地方放 JavaScript Expression

例如：

```JSX
let name = prompt("What's your name?");
const response = (<p>Hello {name}!</p>);
```

### 特徵 4 - 忽略 falsy value

只要 JSX render 的時候，遇到 falsy value 會忽略，不 render

方便根據條件決定要不要 render

例如：

```JSX
let inner = null;
if(show)
  inner = (<p>Hi!</p>);
const displayed = (
  <div>
    {inner}
  </div>
); // 此時 inner 是一個 JavaScript Expression，所以用大括號包住
```

```JSX
const displayed = (
  <div>
    {show && (<p>Hi!</p>)}
  </div>
); // 要寫很多個 if-else 很累，所以更常看到利用 `object` 轉成 `true` 的特性寫成這樣
```

### 寫 JSX 的好習慣

1. 最上面記得 `import React from 'react'`
2. 整個 JSX 用括號包住
   - 可以讓[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)之類的工具幫你加
3. 不要亂縮排，start tag 和 end tag 對齊
4. 縮排太多層的時候請包成 Component

## 總結

- JSX 回傳 React Element，也就是物件(`object`)
- JSX 跟 HTML 很像，但是不太一樣
- 在 JSX 裡面寫 JavaScript 的時候，用大括號包住
