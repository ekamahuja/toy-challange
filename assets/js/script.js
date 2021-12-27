let currentPosition;
let xAxis = document.querySelector('#x-axis-input');
let yAxis = document.querySelector('#y-axis-input');
let fAxis = document.querySelector('#f-axis-input');
const moveBtn = document.querySelector('#move-btn');
const reportBtn = document.querySelector('#report-btn');
let arrowInputs = document.querySelector("#arrow-input").children;
let directionButtons = document.querySelector("#direction").children;
const manualInputBtn = document.querySelector('#submit-manual-input');


// Event listener for when the manual input button is clicked
manualInputBtn.addEventListener('click', event => {
    // Checks If there are any errors in the users Input (If yes then uses alert/notice function to alert the user and end the function)
    if (!xAxis.value || !yAxis.value) return alert("The X-axis and Y-axis boxes are required!", "danger");
    if (isNaN(xAxis.value)) return alert("The X-axis must be a number.", "danger");

    // Disables Input boxes and buttons while actions are being performed
    xAxis.disabled = true;
    yAxis.disabled = true;
    fAxis.disabled = true;
    manualInputBtn.disabled = true;
    manualInputBtn.innerHTML = 'Loading...'

    // Once everything is disabled to run the function and send parms of the values grabbed from the input boxes and await until it is done (once it is completed, to reenable the the inputs and buttons for further use)
    setPosition(xAxis.value, yAxis.value, fAxis.value).then(() => {
        xAxis.disabled = false;
        yAxis.disabled = false;
        fAxis.disabled = false;
        manualInputBtn.disabled = false;
        manualInputBtn.innerHTML = 'Submit'
    });
});



moveBtn.addEventListener("click", () => {
    direction = currentPosition.fAxis;
    direction = direction.replace("f-", "");
    moveInDirection(direction);
});

reportBtn.addEventListener('click', () => {
    alert(`X-Axis: ${currentPosition.xAxis}<br>Y-Axis: ${currentPosition.yAxis}<br>Facing: ${currentPosition.fAxis.replace("f-", "").charAt(0).toUpperCase() + currentPosition.fAxis.slice(3)}`, "success");
});

for (let i = 0; i < directionButtons.length; i++) {
    directionButtons[i].addEventListener("click", event => {
        let directCommand = directionButtons[i].id;
        let currentF = currentPosition.fAxis;
        switch (currentF) {
            case "f-north":
                (directCommand == "left") ? applyDirection("f-west") : applyDirection("f-east");
                break;
            case "f-south":
                (directCommand == "left") ? applyDirection("f-east") : applyDirection("f-west");
                break;
            case "f-west":
                (directCommand == "left") ? applyDirection("f-south") : applyDirection("f-north");
                break;
            case "f-east":
                (directCommand == "left") ? applyDirection("f-north") : applyDirection("f-south");
                break;
        };
        updateInputBox();
    });
};

for (let i = 0; i < arrowInputs.length; i++) {
    arrowInputs[i].addEventListener("click", event => {
        const direction = arrowInputs[i].id;
        moveInDirection(direction);
    });
};

function moveInDirection(direction) {
    let currentX = parseInt(currentPosition.xAxis);
    let currentY = parseInt(currentPosition.yAxis);
    let currentF = currentPosition.fAxis;
    switch (direction) {
        case "north":
            currentY = currentY + 1;
            currentF = "f-north";
            break;
        case "south":
            currentY = currentY - 1;
            currentF = "f-south";
            break;
        case "west":
            currentX = currentX - 1;
            currentF = "f-west";
            break;
        case "east":
            currentX = currentX + 1;
            currentF = "f-east";
            break;
    };
    setPosition(currentX, currentY, currentF).then(() => {
        updateInputBox();
    });
};



function resetPosition() {
    let i = document.querySelector(`${currentPosition.xYPositionId}`);
    i.innerHTML = '';
    i.classList.remove(currentPosition.fAxis);
};

async function setPosition(xPosition, yPosition, fPosition) {
    if (currentPosition) applyDirection(fPosition);
    if (xPosition > 4) return alert("Cannot move toy robot over X-4 axis!", "danger");
    if (xPosition < 0) return alert("Cannot move toy robot lower than X-0 axis!", "danger");
    if (yPosition > 4) return alert("Cannot move toy robot over Y-4 axis!", "danger");
    if (yPosition < 0) return alert("Cannot move toy robot lower than Y-0 axis!", "danger");
    if (currentPosition) resetPosition();

    let newPosition = document.querySelector(`#y-${yPosition}-x-${xPosition}`);
    newPosition.innerHTML = `<img width="30px" src="./assets/images/arrow.png">`;
    newPosition.classList.add(fPosition);
    currentPosition = {
        xAxis: xPosition,
        yAxis: yPosition,
        xYPositionId: `#y-${yPosition}-x-${xPosition}`,
        fAxis: fPosition
    };
};


function applyDirection(fPosition) {
    let currentP = document.querySelector(`${currentPosition.xYPositionId}`)
    currentP.classList.remove(currentPosition.fAxis);
    currentP.classList.add(fPosition);
    currentPosition.fAxis = fPosition;
};


// Function for sending alerts/notices to the user
function alert(message, type) {
    let alert = document.createElement('div');
    alert.innerHTML = `<div class="alert alert-${type} alert-dismissible" role="alert">${message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
    document.querySelector("#notice").appendChild(alert);
    setTimeout(function () {
        alert.remove();
    }, 3000);
}


// Updates the input box values to the current positions
function updateInputBox() {
    xAxis.value = currentPosition.xAxis;
    yAxis.value = currentPosition.yAxis;
    fAxis.value = currentPosition.fAxis;
}


// Origin Position
manualInputBtn.click();