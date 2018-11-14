let temp = window.onload;
window.onload = function(...args) {
    temp && temp(...args);
    let BMICalc = document.getElementById('BMI-Calc');
    let [_, height, __, weight, button] = BMICalc.children;
    button.addEventListener('click', () => {
        alert(`Your BMI is ${+weight.value/(+height.value/100)**2}`);
    });
}