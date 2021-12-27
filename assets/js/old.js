// // Event listener for when the manual input button is clicked
// manualInputBtn.addEventListener('click', event => {
//     // Checks If there are any errors in the users Input (If yes then uses alert/notice function to alert the user and end the function)
//     if (!xAxis.value || !yAxis.value) return alert("The X-axis and Y-axis boxes are required!", "danger");
//     if (isNaN(xAxis.value)) return alert("The X-axis must be a number.", "danger");

//     // Disables Input boxes and buttons while actions are being performed
//     xAxis.disabled = true;
//     yAxis.disabled = true;
//     fAxis.disabled = true;
//     manualInputBtn.disabled = true;
//     manualInputBtn.innerHTML = 'Loading...'

//     // Once everything is disabled to run the function and send parms of the values grabbed from the input boxes and await until it is done (once it is completed, to reenable the the inputs and buttons for further use)
//     setPosition(xAxis.value, yAxis.value, fAxis.value).then(() => {
//         xAxis.disabled = false;
//         yAxis.disabled = false;
//         fAxis.disabled = false;
//         manualInputBtn.disabled = false;
//         manualInputBtn.innerHTML = 'Submit'
//     });
// });