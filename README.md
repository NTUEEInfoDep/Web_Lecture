# Web developement

## Client and Server

client 發 HTTP request 給 server，server 根據內容回傳 response，而瀏覽器把 response 的內容呈現給 client。

## HTML

HTML 定義了「有什麼東西在網頁上」，瀏覽器收到 HTML 文件的時候，會先解讀他的格式，試圖補上寫錯的部份，再 render 在網頁上。

沒有包含 JS / CSS 的 HTML，只能透過 HTTP request 跟 server 互動，產生動態效果(使用者按下按鈕/連結之後送 request 給 server，拿新的網頁回來)

## CSS

CSS 定義了「HTML 裡面的東西的外觀」，顏色、字體、長寬、排版、動畫……

## Server Side

PHP, ASP, JSP 都是用來寫 server side code 的東西。

他們主要的工作是根據你寫的 code，產生對應的 HTML，再傳給 client。

例如：根據 client 有沒有登入，傳不同的 HTML tag；或是根據 DB 傳進來的資料產生數量不固定的 tag。

## Client Side

HTML 寫的東西不會變，但是 JavaScript 可以改變記憶體裡面瀏覽器解析出來的網頁架構，讓瀏覽器可以動態 render 出跟 HTML 裡面不一樣的東西。

過去每次在網頁上做一件事，就會重新拿到另一個 http response，整個網頁都要重新 render 一次，還要下載整個網頁的內容。

如果用 JavaScript 向 server 發 request，就可以只拿到更小的資料。用 JS 更新網頁，會比拿整個網頁，重新 render 快。
