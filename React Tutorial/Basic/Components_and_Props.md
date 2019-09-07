# Components and Props

## Components

- 寫 HTML 的時候常常遇到要重複寫類似的 tag，這時候就要不斷地複製貼上。
- 為了解決這個問題，React 讓你可以把 JSX 包成 Component，看起來比較簡潔。

假設你有需要寫一堆連結，你可能會寫這樣

```html
<div>
  <a href="/"><p class="linkText">首頁</p></a>
  <a href="/A"><p class="linkText">頁面A</p></a>
  <a href="/B"><p class="linkText">頁面B</p></a>
  <a href="/C"><p class="linkText">頁面C</p></a>
</div>
```

有了 JSX，你就可以寫成這樣

```JSX
const example = (
  <div>
    <Link href="/" class="linkText">首頁</Link>
    <Link href="/A" class="linkText">頁面A</Link>
    <Link href="/B" class="linkText">頁面B</Link>
    <Link href="/C" class="linkText">頁面C</Link>
  </div>
);
```

當然你可能會覺得差不了多少，不過自訂的 Component 可以任意地複雜，當你寫 HTML 寫到一定程度就能體會到 Component 的重要了

## 定義 Componenet

有 `class componenet` 和 `functional component` 兩種，兩者各有不同之處，但是在這一篇文章中兩個作用基本相同

1. ### Class component

```JSX
import React from 'react';
class Link extends React.Component {
  render() {
    return (
      <a href={this.props.href}>
        <p className={this.props.class}>{this.props.children}</p>
      </a>
    );
  }
}
```

2. ### Functional component

   - 注：只要是回傳 React Element 的 function 都是 component，就算是 Arrow Function 也可以

```JSX
import React from 'react';
function Link(props) {
  return (
    <a href={props.href}>
    <p className={props.class}>{props.children}</p>
    </a>
  );
}
```

## `Props`?

不論是 function 還是 class，都可以看到最關鍵的地方：`props`

### 什麼是 props 呢

- 簡單來說，就是 `parent` 傳下來的資料

```JSX
// 當我們寫這樣：
let ex = ( <Link href="/" class="linkText">首頁</Link>);
// 其實就是這樣：
ex = React.CreateElement(Link, {href: "/", class: "linkText"}, "首頁");
// 而 React.CreateElement最後會跑出來的值會是：（當然是簡化過後的）
ex = {type: Link. props: {href: "/", class: "linkText", children: "首頁"}}
```

所有 parent 決定的資料全部都塞在 `ex` 的 props 裡面，React 會把 資料包裝成 `props`，再由 `Link` 這個 Component 決定要怎麼產生 React Element

### Read only

- 不要改自己的 `props` 的值

```JSX
function Link(props) {
  props.class = ""; // 會出錯
  return (
    <a href={props.href}>
    <p className={props.class}>{props.children}</p>
    </a>
  );
}
```

後面會提到，props 會跟 React 決定要不要更新一個 element。所以請不要隨便改 props 裡面的值

無論 function 還是 class 都一樣，要改請在 parent(上層) 改變傳進來的值

## 總結

- 兩種寫法
- props
  - 不要亂改
