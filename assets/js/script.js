// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
  let buttons = document.getElementsByTagName("button");

  for (let button of buttons) {
      button.addEventListener("click", function() {
          if (this.getAttribute("data-type") === "calculate") {
              alert("You clicked calculate!");
          } else {
              let timeOption = this.getAttribute("data-type");
              alert(`You clicked ${timeOption}`);
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

function generateRandonMove() {

}

function timeIntoTrade() {

}

function checkVolatility() {

}

function winLossAnalysis() {

}

function strategyReport() {

}