// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
  let buttons = document.getElementsByTagName("button");

  for (let button of buttons) {
    console.log(button);
      button.addEventListener("click", function() {
          if (this.getAttribute("data-type") === "submit") {
              alert("You clicked days");
              let days = this.getAttribute("data-type");
          } else {
              alert(`You clicked option not reckonised`);
          }
      });
  }
});
 


 
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