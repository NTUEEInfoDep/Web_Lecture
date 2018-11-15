var button_dom = document.querySelector('#calc-button')
var w_dom = document.querySelector('#weight-input')
var h_dom = document.querySelector('#height-input')
var bmi_dom = document.querySelector('#bmi-value')
// 當按下button時, 會觸發此函式
button_dom.onclick = (e) =>{
   // 使用.value取出input tag的值
   var w = w_dom.value;
   var h = h_dom.value;
   // error handling
   if(w == '' || h == ''){
      alert('Input box should not be empty!');
      return;
   }
   // 轉形態為float
   w = parseFloat(w);
   h = parseFloat(h);
   // 計算bmi
   var bmi = w / (h * h);
   bmi = bmi.toFixed(2)
   console.log(w, h);
   console.log(bmi);
   // 把bmi render到網頁上
   bmi_dom.innerHTML = bmi
}