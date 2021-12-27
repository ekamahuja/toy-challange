// document.querySelector("#y-0-x-0").innerHTML = "R"
let currentPosition;

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

    if (currentPosition) {
        let i = document.querySelector(`${currentPosition.xYPositionId}`);
        i.innerHTML = '';
        i.classList.remove(currentPosition.fAxis);
    }

    let newPosition = document.querySelector(`#y-${yAxis.value}-x-${xAxis.value}`);
    newPosition.innerHTML = "R";
    newPosition.classList.add(`${fAxis.value}`);
    currentPosition = {
        xYPositionId: `#y-${yAxis.value}-x-${xAxis.value}`,
        fAxis: fAxis.value
    };


    xAxis.disabled = false;
    yAxis.disabled = false;
    fAxis.disabled = false;
    manualInputBtn.disabled = false;
    manualInputBtn.innerHTML = 'Submit'
    console.log(currentPosition);
});