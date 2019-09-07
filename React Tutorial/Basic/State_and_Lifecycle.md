# State and Lifecycle

## 更新

- 目前看起來，一旦一個 component/element 被 render 出來之後，我們沒辦法改他的 props
- 也就是說，我們寫出來的東西是靜態的，要更新畫面/UI 的話就必須重新 `ReactDOM.render()`
  - 為什麼不用 `ReactDOM.render()` ?
    - 如果每次都用 ReactDOM.render，那你畫面更新小小的一個文字，整個畫面的 React component 都會重新 render，效率太差
- 我們需要一個方法告訴 React 什麼時候要更新一個 React component

## Props?

- 最簡單的想法就是 React 去監視 Props 變化，只要 parent(上層)傳進來的資料改變，就更新一個 component，間接更新畫面
- 但是 props 在 parent render() 的時候就已經決定了，除非我們手動拿到 component，重新呼叫 `render()`，否則就無法改變 props
  - 這樣做會有一個主要問題：你要拿到一個 element 的 component parent
    1.  必須是 component 才有 render，component 跟 render 出來的 element 沒有一對一對應關係
    2.  必須拿到 parent 的 reference，也就是一堆 document.getElement......

## State

- React 給出的答案很簡單，就是使用 `state`
- 簡單來說，(正常情況下) `state` 或是 `props` 改變的時候，都會觸發 `render`，更新 element
  - 這種更新會自動比較 `state` 和 `props` 的變化，只會改變資料有變動的 element，比較有效率

### 什麼是 state

- `state` 跟 `props` 不同，不是「上層的 `parent` 的 `render` 時候決定的定值」，而是「自己 `object` 內部的變數」，自己可以改，不像 `props` 是 read-only (再提醒一次，不要隨便改自己的 props)
- 因此需要更新的時候，就可以有以下的流程

1. 使用者觸發 event (onClick 之類的)
2. event handler 更新 component 裡面的 state
3. React 發現 state 改變了，進入 render function
4. render 的時候可以根據 state 變化來給 children 不同的 props
5. React 比對 props 變化，重新 render 有改變的 element

- `state` 有個限制，那就是只能在 `class component` 裡面使用（這就是為什麼 class 寫得比較冗但是還是存在）
  - 注：React hook 可以讓 `functional component`有類似 state 和 lifecycle 的效果，有興趣的人學完這一頁之後可以自己查

### 實際應用

- 目標：使用者按下按鈕之後變色

```JSX
import React from 'react';
class Chameleon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {colorChanged: false};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState, props) => ({colorChanged: !prevState.colorChanged}))
  }

  render() {
    return (
      <>
        <p style={{color: this.state.colorChanged ? "red" : "green"}}>Hi there!</p>
        <button onClick={this.handleClick}>Click Me!</button>
      </>
    );
  }
}
```

- 解釋：
- 顏色由 `this.state.colorChanged` 決定
- `this.state.colorChanged` 由 `this.setState` 改變

- 改變顏色的過程：

1. 使用者按下按鈕，觸發 onClick
2. handleClick 觸發 this.setState
3. 等到 React 覺得他有空更新 state 的時候，把 `this.state.colorChanged` 的值改變
4. state 被改變之後觸發了 render()
5. React 發現只有 `<p>` 的 props `style` 有改變，於是只重新 render `<p>`

##### 細節：

1. `this.state = ?`

   - state 可以不只一個東西，你想要 state 裡面放 object 或 Array 都可以，只要任何一個改變都會觸發 render
   - `this.state = {a: 1, b: [0, 1, 2], c: {d: 3}}`
   - 只有在 constructor 可以這樣做，不要在其他地方直接 assign `this.state`
     - 這樣 React 可以做更多 Optimization

2. `this.handleClick.bind(this)`

   - 沒有 `bind` 的話，傳 `this.handleClick` 當成 onClick，類似於呼叫 `onClick(event)`
   - this 會變成 window 或是 undefined (strict mode / browser / node 都會影響)

3. `this.setState(...)`

   - **`this.setState`不保證立刻更新**
     - 不要依賴多次 `this.setState` 或是 `state` 和 `props` 的更新順序
   - 所以 `this.setState` 提供兩種參數
     1. 直接寫出要變化的 state
        - `this.setState({ colorChanged: false })`
        - 跟前一次的 props, state 無關
     2. 根據舊的 state 和 props，傳進你給的 function 得到新的 state
        - 像這次的例子，我們要根據前一次的 state，取得他的相反

## Lifecycle

[官方 lifecycle diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

- 還是只有 `class component` 可以用
- 還是可以用 React hook 達到類似效果

Component 有 Lifecycle 的規定，讓你可以 override 對應的 method，改變預設的行為

- 例如：每次更新 state/props 都一定會重新進到 render，可以用 `shouldComponentUpdate` 決定要不要重新 render（通常這是優化效能用的）
- 最常用的是 `componenetDidMount` 和 `componentWillUnmount`，它們保證只會執行一次，當你的 Component 需要在其他地方(eg. window)放 event listener 的時候，在這兩個 lifecycle addEventListener 可以保證只有一個 event listener
- constructor 也是一個 lifecycle method

## 總結

- 需要動態更新的時候，使用 state
  - 用 event listener 處理使用者動作
  - 用 this.setState 更新 state
- 需要對 component 有更多控制的時候，可以用 lifecycle method
