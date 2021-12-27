document.querySelector("#y-0-x-0").innerHTML = "R"


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

    let newPosition = document.querySelector(`#y-${yAxis.value}-x-${xAxis.value}`);
    newPosition.innerHTML = "R";

    // document.querySelector(`body > div.game-board.mt-5 > div:nth-child(${xAxis.value})`).innerHTML = "R"


   console.log(`${xAxis.value}\n${yAxis.value}\n${fAxis.value}`)
});