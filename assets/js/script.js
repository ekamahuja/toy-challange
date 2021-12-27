document.querySelector("#origin").innerHTML = "R"


const manualInputBtn = document.querySelector('#submit-manual-input');
manualInputBtn.addEventListener('click', event => {
    let xAxis = document.querySelector('#x-axis-input');
    let yAxis = document.querySelector('#y-axis-input');
    let fAxis = document.querySelector('#f-axis-input');

    xAxis.disabled = true;
    yAxis.disabled = true;
    fAxis.disabled = true;
    manualInputBtn.disabled = true;
    manualInputBtn.innerHTML = 'Loading...'




   console.log(`${xAxis.value}\n${yAxis.value}\n${fAxis.value}`)
});