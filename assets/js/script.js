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
      console.log("Selection Confirmed!", takeProfit.toFixed(2));
  } else {
    console.log('You have not entered any details!', takeProfit.toFixed(2));
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
  inputTradingFee = parseInt(document.getElementById('inputTradingFee').innerText);
  minutes = parseInt(document.getElementById('minutes').innerText);
  days = parseInt(document.getElementById('days').innerText);
  
  return [stake + takeProfit + stopLoss + avgTrueRange + marketMommentum + inputTradingFee + minutes + days ];
}







  /************************************************************************************************************************************************************************************************************************************************
 *      TPC TRADE PROBABILTY CACULATOR
 * 
 * This application allows the user to experiment with the parameters to gain a better understadning of how their strategy would preform.
 * This application then simulates the market buy changing the assets price over a given period. Then off the incremental price the
 * application produces randomly generated moves Up and Down in order to create a realistic simulation of the market.
 ************************************************************************************************************************************************************************************************************************************************/

  /****************************************
 *      INVESTMENT AMOUNT  & FEES
 ****************************************/
   let stake = 0; // 1st of 8 options the user will set the user on the calculator.html page

/* For development purpose we use a static amount of 10,000 as this will aid debugging */
/* There's potential to use an API call to get live prices */
let cryptoPrice = 10000;
/* Exchange rate */
 function exchangeRate(cryptoPrice) {
 let valueHeld = stake / cryptoPrice;
 console.log('Exchange rate:  1 FIAT:', valueHeld.toFixed(2), 'CRYPTO')
 }
 
 let inputTradingFee = 0; // 2nd of 8 options the user will set the user on the calculator.html page


  /****************************************
 *      TAKE PROFIT & STOP LOSS OPTIONS
 ****************************************/

   let inputTakeProfit = 0; // 3rd of 8 options the user will set the user on the calculator.html page
   let stopLoss = 0; // 4th of 8 options the user will set the user on the calculator.html page



  /****************************************
 *      ATR (Average True Range) & MARKET MOMENTUM -- TRADE ENTRY CONDITIONS
 ****************************************/
  /* The condtions to enter a trade are that a coin has been trending and the uptrend gain for the period of time here confimation_duration
   * This allows the user to test the condtions of when a bot would enter a trade, for example if the assets in question had gained 4% over 60 minutes
   * then we would replicate this momentum with the following settings, if you looking of a 3 hour period just increase the input_confimation_duration = 180 */
 
   let avgTrueRange = 0;   // 5th of 8 options the user will set the user on the calculator.html page

   let volatility = 0;
   /* Also the ATR here will need to be relative to the validation period the market momentum, so this serves a another condtion that needs to be met before we enter a trade.

   #this determines the how far up and down from the average gain price the actual price moves, this script by default generates a move of up to 0.9%
   # Therefore if you change this to 1 the move can be upto 1.9% in either direction making a an ATR of 3.8% which im calling upto 4% */

   
   /* THIS COULD BE SOMPLIFIED AS JUST HALFING THE VOLATILITY INPUT */
   function chooseVolatility(){
     
     let volatilityOptions = {
       2 : 1,
       4 : 2,
       6 : 4,
       8 : 4,
       10 : 5
     };
     volatility = volatilityOptions[avgTrueRange];
     
     }

     let marketMommentum = 0;  // 6th of 8 options the user will set the user on the calculator.html page


 /****************************************
 *      PERCENATGES
 ****************************************/

let tradingFeeRate = inputTradingFee / 100;






let confirmationDuration = 60; // This will be kept at 60 but maybe become an input option for the user


function changePerSecond(price) {
/*  This will be used as the backbone of a strategy simulator ensuring the direction of the momentum can be controled */
let change = (price * marketMommentum) / confirmationDuration; 

console.log('CHANGE PER SECOND', change.toFixed(2));

}


/* ########################################
##     TRADE INTERVALS & TIME PERIOD
######################################## */

/* Here the user can adjust the duration to see if the strategy can return meaningful gains over time.
/*  In a real world senario the true number of times a trade would take place would depend on the number of times the "enter a trade conditions" are met */
let days = 0;


/*  This vaialble allows you to set the time in the trade before it times out and forces a market order at what ever the position is be it positive or negative.
# Define in input_minutes how long you will stay in the trade (5, 10, 15, 30, 60 must be in input_minutes) */
let minutes = 0;
let seconds = 10;

/*  This is the window of opportunity you allow for the trade to fulfill 1 of 3 criteria, Take Profit, Stop Loss or Timed Out Market Order 
let tradeDuration = minutes * seconds; */
let tradeDuration = 3; // This will need to be multipled by 60 secound, but not while we are develpoing the application


/**
* tradesPerDay trades would be trade 24 hours / trade duration the would be a random amount from that range
* take 24hour / 1 day in minutes 1440 and divede by selected trade duration to produce the range
* from this generate a random number to similate a realife probability of trade oppotunities in any 1 given day
*/
 function generateRandomDaily(minTrades, maxTrades) {
  minTrades = 0;
  maxTrades = 1440 / minutes; 
  return Math.floor(Math.random() * (maxTrades - minTrades) + minTrades); 
}



/* ########################################
##     count_each_secondING STUFF
######################################## */

/* Win count_each_seconds number of successful "take profit" instances, timed out records number of trades that result in a forced market order & losses record each instance of being stopped out of the trade */
let win = 0;
let timedOut = 0;
let losses = 0;
/* count_each_second is used to report on the duration into a trade an actins takes place  ...... sum moves is ..... min kilines is ...... */
let countEachSecond = 0;
let sumMoves = 0;
let minKlines = [];

/* These allow for a runing total of each to be recorded and updated from trade to trade (what do you mean trade to trade) */
let totalFees = 0;
let profit = 0;

/* These 2 arrays are used to track the time the average time into a trade before conditions are to be met */
let timeInWinTrade = [];
let timeInLossTrade = [];

/* This array records if the move was up, flat or down so that we can see if there is fair distributions of randomness */
let checkMoves = [];

/* Function to calculate avergage */
function getAvg(value) {
  var total = 0;
  for (var i = 0; i < value.length; i++) {
    total += value[i];
  }
  var avg = total / value.length;
}


let carriedBalance = stake;



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

/* This is the amount increase the crypto will gain on average during the trade (this ensures market momentum at the set amount but still allows the price to fluxuate randomly) */
exchangeRate(cryptoPrice);

chooseVolatility(avgTrueRange);
let projectedGain = cryptoPrice * (marketMommentum / 100);
let incrementMove = projectedGain / (6 * seconds);
let averageMove = minutes * changePerSecond(cryptoPrice);
console.log('Opening Steak Value: £', stake);
console.log('Opening Crypto Value:', cryptoPrice);
console.log('Crypto gain over validation period ', projectedGain.toFixed(2));
console.log('average gain per second:', incrementMove.toFixed(2));
console.log('average gain per trade:', averageMove.toFixed(2));


/* This initial sets the */
let averagePrice = cryptoPrice;
let assetPrice = cryptoPrice;
let perTrade = cryptoPrice;

/****************************************
 *      NUMBER OF DAYS - - - - - - - - - - FOR LOOP
 ****************************************/
 for (let eachDay = 0; eachDay < days; eachDay++) {
  console.log(' *******  ******* Begining of trading day  *******', eachDay + 1);


 /****************************************
 *     NUMBER OF TRADES - - - - - - - - - - FOR LOOP
 ****************************************/
  for (let frequency = 0; frequency < generateRandomDaily(); frequency++)
  // CONSOLE LOG USED FOR DEBUGGING
  {
    console.log('  ******** TOTAL OF', frequency + 1, 'TRADING INSTANCE *********');
/* trade open is used to validate where we are in a trade or not so that gains and losses are only based on time in trade and not the whole */
let tradeOpen = true;

let takeProfitAmount = assetPrice + (assetPrice * (takeProfit / 100));
let stopLossAmount = assetPrice + (assetPrice * (stopLoss / 100));
    console.log('Asset price:', assetPrice.toFixed(2));
    console.log('Take profit amount:', takeProfitAmount.toFixed(2));
    console.log('Stop Loss amount:', stopLossAmount.toFixed(2));

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