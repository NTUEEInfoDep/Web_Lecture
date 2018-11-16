let temp = window.onload; // Save the previous window.onload function (Although in this example, temp is `undefined`)
window.onload = function(...args) {
    temp && temp(...args); // Short circuit evaluation / Coercion, if temp is defined, execute temp, forwarding all arguments
    let BMICalc = document.getElementById('BMI-Calc'); // <section id='BMI-Calc'></section>
    let [_, height, __, ___, weight, ____, button, result, progressBar] = BMICalc.children;
    /*
        height: <input name='BMI-Calc_Height' type="number" min='0'></input>
        weight: <input name='BMI-Calc_Weight' type="number" min='0'></input>
        button: <input type='button' value='Submit'></input>
        result: <p></p>
        progressBar: <progress min='0' max='100'></progress>
     */
    button.addEventListener('click', () => {
        let BMI = +weight.value/(+height.value/100)**2;
        result.textContent = `Your BMI is ${BMI}`;
        if(BMI >= 0 && BMI <= 100)
            progressBar.value = BMI;
        // <p>textContent</p> => <p>`Your BMI is ${+weight.value/(+height.value/100)**2}`</p>
    });
}