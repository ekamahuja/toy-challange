let currentPosition;
let xAxis = document.querySelector('#x-axis-input');
let yAxis = document.querySelector('#y-axis-input');
let fAxis = document.querySelector('#f-axis-input');
let arrowInputs = document.querySelector("#arrow-input").children; 
const reportBtn = document.querySelector('#report-btn');
const manualInputBtn = document.querySelector('#submit-manual-input');



reportBtn.addEventListener('click', () => {
    alert(`X-Axis: ${currentPosition.xAxis}<br>Y-Axis: ${currentPosition.yAxis}<br>Facing: ${currentPosition.fAxis.replace("f-", "").charAt(0).toUpperCase()+currentPosition.fAxis.slice(3)}`, "success")
})

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
    if (xPosition > 4) return alert("Cannot move toy robot over X5 axis!", "danger");
    if (xPosition < 0) return alert("Cannot move toy robot lower than X0 axis!", "danger");
    if (yPosition > 4) return alert("Cannot move toy robot over Y5 axis!", "danger");
    if (yPosition < 0) return alert("Cannot move toy robot lower than Y0 axis!", "danger");
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


function alert(message, type) {
    let alert = document.createElement('div');
    alert.innerHTML = `<div class="alert alert-${type} alert-dismissible" role="alert">${message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
    document.querySelector("#notice").appendChild(alert);
    setTimeout(function () {    
        alert.remove();
    }, 2500)
}

manualInputBtn.click();