let counterValueDiv = document.getElementById("counterDiv");
let counterValue = parseInt(counterValueDiv.textContent);

const increment = inc => {
    counterValue += inc;
    counterValueDiv.textContent = counterValue;
}

