# Table of Contents

1. Basic
   1. [JSX](Basic/JSX.md)
   2. [Components and Props]()
   3. [State and Lifecycle]()
   4. [Events]()
   5. [Conditional Rendering]()
   6. [List and Keys]()
2. Advanced
   1. [Render Function]()
   2. [Higher order Components]()

## Introduction

### What is React

> React - A JavaScript library for building user interfaces

React 的最主要功能就是建造 UI，不只是網頁，手機、電腦的 App 的 UI 也可以用 React 產生。

React 主要負責把你產生的 object 變成 HTMLElement 並 Render 到網頁上、負責控制各個 Element 的更新。

### Hello world

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Document</title>
  </head>
  <body>
    <main id="root"></main>
    <script
      src="https://unpkg.com/react@16/umd/react.development.js"
      crossorigin
    ></script>
    <script
      src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"
      crossorigin
    ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
    <script type="text/babel">
      ReactDOM.render(<p>Hello world!</p>, document.getElementById('root'));
    </script>
  </body>
</html>
```

- 把上面的 HTML 存成檔案，用瀏覽器打開，就可以看到 React render 出了一個 `<p>Hello world!</p>`
- 除了用 `<script>` 引入 library 之外，有幾個地方比較特殊：
  1. Babel
     > Babel is a JavaScript compiler.
     - Babel 能夠處理你寫的 JavaScript，把它 compile 成舊版的 JavaScript，讓所有瀏覽器都能跑
     - 也能夠處理 JSX，讓你在 JavaScript 裡面可以用像是 HTML 的寫法
  1. ReactDOM
     - React 在 render 的時候需要知道它要 render 在哪裡，作法就是在 ReactDOM.render 傳入 React 要 render 的地方
- 這個範例只是簡單介紹 React，實際使用會用 minimized 的 development version，而且會用 npm 來加入 React，在丟到網路上公開之前先用 Babel/Webpack 處理好。

### 總結

- 簡單來說，正常使用 React 會是以下的情況：

1. 用 JavaScript / TypeScript 開心的寫 JSX
2. 寫完之後用 Babel compile 成瀏覽器支援的 JavaScript（通常這步你只要打一個 command 就好了）
3. 開個 http server，回傳 compile 出來的 html / js
4. 連到你的網站，React 開始作用：生成 JSX 指定的 Element，並開始處理 資料流(dataflow) / 生命週期(lifecycle)

- 當然看你的需求，你也可以用不同方式使用 React：

1. 事前將 React 變成 html，讓 client 不用花時間跑 JS (適合網頁的靜態部份)
2. 根據 client 傳來的資料，在 server 上跑 React 生成對應的 html
   - 跟 `1.` 不同， `1.` 只跑一次，每個人看到的網頁都一樣
   - `2.` 則是每次接到 request 都會跑（當然可以 cache）
