// The application has been enclosed within the init function so as to avoid any variable being classed as global
function init(){


// Wait for the DOM to finish loading before taking values from the inputs
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function() {
  let buttons = document.getElementsByTagName("button");

  for (let button of buttons) {
      button.addEventListener("click", function() {
          console.log(button);
           if (this.getAttribute("data-type") === "submit") {
              validateInputs();
              
          } else if (this.getAttribute("data-type") === "trade") {
            // On click runs trading function
            trading();
            
          } else if (this.getAttribute("data-type") === "save") {
            // On click runs save function
            console.log(" Save results! ");
          }
          else {
            console.log(" Info Popup! ");
              
          }
      });
  }

});


 // info popover functionality 
 var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
 var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
   return new bootstrap.Popover(popoverTriggerEl)
 })


// This block handles the functionality of the drop down menu used to select the fees value
// RETURN TO THIS TO SEE IF THERES A BETTER WAY
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


/**
* WILL BE ROMVED
* Checks the sum value of all the inputs and uses consol.log to help with debuging
*/
function validateInputs() {
  
  let userAnswer = parseInt(document.getElementById("answer-box").value);
  let calculatedAnswer = calculateCorrectAnswer();
  let isCorrect = userAnswer === calculatedAnswer[0];

  if (isCorrect) {
      console.log("Selection Confirmed! ");
  } else {
    console.log('You have not entered any details!');
  }

}


/**
* Gets the values from the various input types and checks they add up
* Adding up the sum of each allows us to besure all are working as expected
*/
function calculateCorrectAnswer() {

  stake = parseInt(document.getElementById('stake').value);
  takeProfit = parseInt(document.getElementById('takeProfit').innerText);
  stopLoss = parseInt(document.getElementById('stopLoss').innerText);
  avgTrueRange = parseInt(document.getElementById('avgTrueRange').innerText);
  marketMommentum = parseInt(document.getElementById('marketMommentum').innerText);
  tradingFee = parseInt(document.getElementById('tradingFee').innerText);
  tradeDuration = parseInt(document.getElementById('tradeDuration').innerText);
  days = parseInt(document.getElementById('days').innerText);
  
  return [stake + takeProfit + stopLoss + avgTrueRange + marketMommentum + tradingFee + tradeDuration + days ];
}

// Define the variables as zero, then the users input can update these variables values
// THIS MAY NOT BE THE BEST WAY, REVIEW THIS ONCE APPLICTION IS FUNCTIONAL
let tradeOpen = true;
let stake = 0;
let takeProfit = 0;
let stopLoss = 0;
let avgTrueRange = 0;
let marketMommentum = 0;
let tradingFee = 0;
let tradeDuration = 3;
let days = 0;


/**
* tradesPerDay trades would be trade 24 hours / trade duration the would be a random amount from that range
* take 24hour / 1 day in minutes 1440 and divede by selected trade duration to produce the range
* from this generate a random number to similate a realife probability of trade oppotunities in any 1 given day
*/
 function generateRandomDaily(minTrades, maxTrades) {
  minTrades = 0;
  maxTrades = 1440 / tradeDuration; 
  return Math.floor(Math.random() * (maxTrades - minTrades) + minTrades); 
}


let volatility = 0;
/* Also the ATR here will need to be relative to the validation period the market momentum, so this serves a another condtion that needs to be met before we enter a trade.
#this determines the how far up and down from the average gain price the actual price moves, this script bedefault generates a move of up to 0.9%
# Therefore if you change this to 1 the move can be upto 1.9% in either direction making a an ATR of 3.8% which im calling upto 4% */
/* Users can select from a drop down menu of options */
function chooseVolatility(){
  
  let volatilityOptions = {
    2 : 0,
    4 : 1,
    6 : 2,
    8 : 3,
    10 : 4
  };
  volatility = volatilityOptions[avgTrueRange];
  
  }


/* Exchange rate */
function exchangeRate(cryptoPrice) {
let valueHeld = stake / cryptoPrice;
console.log('Exchange rate:  1 FIAT:', valueHeld.toFixed(2), 'CRYPTO')
}




function timedOutMarketOrder() {

}

/**
* Moment by moment the assets price can increase or decrease 
* this function replicates this by generating random moves
*/
function generateRandonMove(min, max, decimalPlaces) {
  return (Math.random() * (max - min) + min).toFixed(decimalPlaces) * 1;
}


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


  
  


/**
* This function contains the logic of the application
*/
function trading(){

  /* For development purpose we use a static amount as this will aid debugging */
  /* There's potential to use an API call to get live prices */
exchangeRate(10000);

chooseVolatility(avgTrueRange);
/****************************************
 *      NUMBER OF DAYS - - - - - - - - - - FOR LOOP
 ****************************************/
 for (let eachDay = 0; eachDay < days; eachDay++) {
  console.log(' *******  ******* Begining of trading day  *******', eachDay + 1);


 /****************************************
 *     NUMBER OF TRADES - - - - - - - - - - FOR LOOP
 ****************************************/
  for (let frequency = 0; frequency < generateRandomDaily(); frequency++)
  // PRINT STATEMENT USED FOR DEBUGGING
  {
    console.log('  ******** TOTAL OF', frequency + 1, 'TRADING INSTANCE *********');


 /****************************************
        ##     TRADE DURATION - - - - - - - - - - FOR LOOP
 ****************************************/
        for (let eachSecond = 0; eachSecond < tradeDuration; eachSecond++)
        {
          console.log('seconds past', eachSecond + 1, ' --- Open to trade?', tradeOpen, 'move' , generateRandonMove( -volatility, volatility, 1) );
        }
}

}
}

  
};

init();





 


/****************************************
  if (each_day == 7) {
    break;
  }
 ****************************************/