// document.querySelector("#y-0-x-0").innerHTML = "R"
let currentPosition;
let xAxis = document.querySelector('#x-axis-input');
let yAxis = document.querySelector('#y-axis-input');
let fAxis = document.querySelector('#f-axis-input');

let arrowInputs = document.querySelector("#arrow-input").children; 
for (let i = 0; i < arrowInputs.length; i++) {
    arrowInputs[i].addEventListener("click", event => {
        const direction = arrowInputs[i].id;
        let currentX = parseInt(currentPosition.xAxis);
        let currentY = parseInt(currentPosition.yAxis);
        switch(direction) {
            case "up":
                currentY = currentY + 1;
                break;
            case "down":
                currentY = currentY - 1;
                break;
            case "left":
                currentX = currentX - 1;
                break;
            case "right":
                currentX = currentX + 1;
                break;
        };
        setPosition(currentX, currentY, currentPosition.fAxis).then(() => {
            xAxis.value = currentPosition.xAxis;
            yAxis.value = currentPosition.yAxis;
        })
    });
};


const manualInputBtn = document.querySelector('#submit-manual-input');
manualInputBtn.addEventListener('click', event => {
    xAxis.disabled = true;
    yAxis.disabled = true;
    fAxis.disabled = true;
    manualInputBtn.disabled = true;
    manualInputBtn.innerHTML = 'Loading...'

    setPosition(xAxis.value, yAxis.value, fAxis.value).then(() => {
        xAxis.disabled = false;
        yAxis.disabled = false;
        fAxis.disabled = false;
        manualInputBtn.disabled = false;
        manualInputBtn.innerHTML = 'Submit'
    });


});

function resetPosition() {
    let i = document.querySelector(`${currentPosition.xYPositionId}`);
    i.innerHTML = '';
    i.classList.remove(currentPosition.fAxis);
};

async function setPosition(xPosition, yPosition, fPosition) {
    if (currentPosition) resetPosition();
    let newPosition = document.querySelector(`#y-${yPosition}-x-${xPosition}`);
    newPosition.innerHTML = "R";
    newPosition.classList.add(fPosition);
    currentPosition = {
        xAxis: xPosition,
        yAxis: yPosition,
        xYPositionId: `#y-${yPosition}-x-${xPosition}`,
        fAxis: fPosition
    };
};