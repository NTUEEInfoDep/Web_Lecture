# Tic-Tac-Toe in Pure HTML, JS, and CSS
> 以古為鏡，可以知興替。

## 1. HTML 架構
> HTML 有哪些 tags？

### `<head>`: The Document Metadata Element
定義網頁的各種資訊。
- `<title>`：網頁名稱（你在瀏覽器的bar上看到的字)。
- `<link>`：定義某外部資源跟網站的關係。
- `<script>`：網頁對應的 `.js`檔案。
- `<meta>`：其他資訊。
#### `<link>`
> 連結到外部資源。

連結到 stylesheet。
```html
<link rel="stylesheet" href="styles.css">
```
除了 local files 也可以連結到其他資源。
```html
<link href="https://fonts.googleapis.com/css?family=Chilanka&display=swap" rel="stylesheet"> 
```
***
### `<body>`：實際在網頁上顯示的內容
***
### 其他 tags
看這裡：https://developer.mozilla.org/zh-TW/docs/Web/HTML
- 文字內容我沒用過 `<h1>`, `<p>` 之類的，都只用 `<div>`。

## 2. 版面設計
> 結合 HTML 和 CSS。

### 思考有哪些區塊
- 標題
- OOXX 棋盤
    - 三橫列（還是三直行？）、九宮格。要怎麼切區塊？
- 贏家顯示區
***
### 設計棋盤

- 用 `<table>`
- **用 `<div>` + flexbox**
> 由上而下的規劃 layout 

- 棋盤本身是一個 `<div>`，裡面有三個橫列。
- 一個橫列是一個 `<div>`，裡面有三個小 block，各是一個 `<div>`

**總共有 1 + 3 + 3 * 3 = 13 個 `<div>`。**

#### 棋盤 `<div>`
用 `margin: 0 auto`置中（置中是黑魔法）。

#### 橫列 `<div>`
裡面會有三個**橫放**的block，所以要定義 `display: flex`（如果沒有會發生什麼事？）。

#### 一個格子的 `<div>`

## 3. 寫 code 啦！
> 請看 `src.js`

### 思考架構
> 思考有什麼變數需要紀錄起來。
- 當前玩家是誰：可以用一個 `Boolean`？
- 每個 block 的狀態（已填滿、圈或叉）：一個`Array`（什麼的`Array`）？
- 贏家顯示內容：如何對特定 `div`操作？
***
### 實作
#### `document` 變數
是一個Javascript物件，代表瀏覽器載入的頁面，可以針對他的node進行各種操作。

```javascript
let winnerDiv = document.getElementById("winner");
```
`winnerDiv` 這時就是DOM裡面id為winner的那個node，可以進行任何對node的操作。
   
Reference：https://developer.mozilla.org/zh-TW/docs/Web/API/document。

#### 創建一個 `Object`