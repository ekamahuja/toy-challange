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

    // Once everything is disabled to run the function and send parms of the values grabbed from the input boxes and await until it is done (once it is completed, to reenable the the inputs and buttons for further use)
    setPosition(xAxis.value, yAxis.value, fAxis.value)
});


// Event listener for all children of #arrow-input 
for (let i = 0; i < arrowInputs.length; i++) {
    arrowInputs[i].addEventListener("click", event => {
        const direction = arrowInputs[i].id;

        // Once even listener is triggered, it calls the moveInDirection function in order to sort get the new value of x or y based on the button clicked (by looking at its id)
        moveInDirection(direction);
    });
};


// Event listener for all the children of #direction (2 children - left & right) using a for loop
for (let i = 0; i < directionButtons.length; i++) {
    directionButtons[i].addEventListener("click", event => {
        let directCommand = directionButtons[i].id;
        let currentF = currentPosition.fAxis;
        
        // based on the current direction the robot is facing and based on what button is clicked (button is grabbed via the id of the button), it calls applyDirection() function and passes in the direction the function should move the robot
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

        // Once the direction is applied, it calls the updateInputBox function that updates all the x/y/f values on the manual input section
        updateInputBox();
    });
};


// Event listener for when the #move-btn is clicked
moveBtn.addEventListener("click", () => {
    direction = currentPosition.fAxis;

    // As the move btn just moves in the current facing direction, it grabs the current positions and removes "f-" in front of it to pass it onto the moveInDirection() function
    direction = direction.replace("f-", "");

    // calls the moveInDirection function in order to sort get the new value of x or y based on the current direction (the value passed)
    moveInDirection(direction);
});


// When report button is clicked, it just uses the notice/alert function to create an alert with the information stored about the current position from the currentPosition variable
reportBtn.addEventListener('click', () => {
    alert(`X-Axis: ${currentPosition.xAxis}<br>Y-Axis: ${currentPosition.yAxis}<br>Facing: ${currentPosition.fAxis.replace("f-", "").charAt(0).toUpperCase() + currentPosition.fAxis.slice(3)}`, "success");
});


// function that actually sets the position of the robot based on the valued passed in
async function setPosition(xPosition, yPosition, fPosition) {
    if (currentPosition) applyDirection(fPosition);
    // Error handling to make sure all inputs are valid 
    if (xPosition > 4) return alert("Cannot move toy robot over X-4 axis!", "danger");
    if (xPosition < 0) return alert("Cannot move toy robot lower than X-0 axis!", "danger");
    if (yPosition > 4) return alert("Cannot move toy robot over Y-4 axis!", "danger");
    if (yPosition < 0) return alert("Cannot move toy robot lower than Y-0 axis!", "danger");
    
    // Removes the robot from the current position by calling in a resetPosition function if currentPosition exist
    if (currentPosition) resetPosition();

    // Selects the newPosition
    let newPosition = document.querySelector(`#y-${yPosition}-x-${xPosition}`);

    // Places the robot on the newPosition
    newPosition.innerHTML = `<img width="30px" src="./assets/images/arrow.png">`;
    
    // Adds the class for the new position (for the appearance of direction the robot is facing)
    newPosition.classList.add(fPosition);

    // Saves the current/new position of the robot to a variable for future reference
    currentPosition = {
        xAxis: xPosition,
        yAxis: yPosition,
        xYPositionId: `#y-${yPosition}-x-${xPosition}`,
        fAxis: fPosition
    };
};


// based on the direction given by the move function or the arrow function, it moves the robot in one step in that direction
function moveInDirection(direction) {
    // turns the variables into integers and grabs necessary variables
    let currentX = parseInt(currentPosition.xAxis);
    let currentY = parseInt(currentPosition.yAxis);
    let currentF = currentPosition.fAxis;

    // runs a switch/case statement, based on the direction - it adjusts the X/Y/F values accordingly 
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
    // Once the new x/y/f values have been configured it runs the setPosition function to actually set the robot to that position and once the operation completes it runs updateInputBox() to update the new values in the input box section
    setPosition(currentX, currentY, currentF).then(() => {
        updateInputBox();
    });
};


// Resets the current position and rotation of the robot when the function is called
function resetPosition() {
    let i = document.querySelector(`${currentPosition.xYPositionId}`);
    i.innerHTML = '';
    i.classList.remove(currentPosition.fAxis);
};


// Based on the param that was passed in, removes the old direction class from the robot and applies the new one then updates the new direction (f-axis) to the currentPosition variable for future use
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

    // Appends the created alert inside the #notice
    document.querySelector("#notice").appendChild(alert);

    // Deletes the element after 3 seconds automatically
    setTimeout(function () {
        alert.remove();
    }, 3000);
};


// Updates the input box values to the current positions (grabbing the data from currentPosition constant)
function updateInputBox() {
    xAxis.value = currentPosition.xAxis;
    yAxis.value = currentPosition.yAxis;
    fAxis.value = currentPosition.fAxis;
};


// Origin Position
manualInputBtn.click();