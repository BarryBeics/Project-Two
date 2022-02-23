// Set up a single handler at a common ancestor of all the select elements
document.body.addEventListener("change", function(event){
  // event.target references the element that actually triggered the event
  // Check to see if the event was triggered by a DOM element you care to handle
  if(event.target.classList.contains("select")){
    // Access the <p> element that is the previous sibling to the 
    // select that triggered the event and update it
    event.target.previousElementSibling.textContent = event.target.value
  }
});


// Wait for the DOM to finish loading before taking values from the inputs
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
  let buttons = document.getElementsByTagName("button");

  for (let button of buttons) {
      button.addEventListener("click", function() {
          console.log(button);
           if (this.getAttribute("data-type") === "submit") {
              validateInputs();
          } else {
              
              alert(`nope`);
          }
      });
  }

  

});


/**
* Checks the sum value of all the inputs and displays an alert to help with debuging
*/
function validateInputs() {
  
  let userAnswer = parseInt(document.getElementById("answer-box").value);
  let calculatedAnswer = calculateCorrectAnswer();
  let isCorrect = userAnswer === calculatedAnswer[0];

  if (isCorrect) {
      alert(" Hey! You got it right! ");
  } else {
      alert('Something doesnt add up here!');
  }

 

}

/**
* Gets the values from the various input types and checks they add up
* Adding up the sum of each allows us to besure all awil be sent to the script 
*/
function calculateCorrectAnswer() {
  
  let stake = parseInt(document.getElementById('stake').value);
  let takeProfit = parseInt(document.getElementById('takeProfit').innerText);
  let stopLoss = parseInt(document.getElementById('stopLoss').innerText);
  let avgTrueRange = parseInt(document.getElementById('avgTrueRange').innerText);
  let marketMommentum = parseInt(document.getElementById('marketMommentum').innerText);
  let tradingFee = parseInt(document.getElementById('tradingFee').innerText);
  let duration = parseInt(document.getElementById('duration').innerText);
  let days = parseInt(document.getElementById('days').innerText);
  return [stake + takeProfit + stopLoss + avgTrueRange + marketMommentum + tradingFee + duration + days ];
 
}

 


 
 // info popover functionality

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})


function chooseVolatility() {

}

function exchangeRate(){

}

function takeProfit(){

}

function stopLoss(){

}

function timedOutMarketOrder() {

}
/**
 * 
 * @param {*} min 
 * @param {*} max 
 * @param {*} decimalPlaces 
 * @returns 
 */
// generate random market fluxtuations
function generateRandonMove(min, max, decimalPlaces) {
  return (Math.random() * (max - min) + min).toFixed(decimalPlaces) * 1;
}

generateRandonMove()
function timeIntoTrade() {

}

function checkVolatility() {

}

function winLossAnalysis() {

}

function strategyReport() {

}

function getDetails() {
  let 
}