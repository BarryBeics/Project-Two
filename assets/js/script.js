// The application has been enclosed within the init function so as to avoid any variable being classed as global
function init(){



// Wait for the DOM to finish loading before taking values from the inputs
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function() {
  
  let buttons = document.getElementsByTagName("button");

  for (let button of buttons) {
    
      button.addEventListener("click", function() {
          console.log(button);
          if (this.getAttribute("data-type") === "trade") {
            // On click runs trading function
            
            validate();
          } else if (this.getAttribute("data-type") === "save") {
            // On click runs save function
            saveResults();
          }
          else {
            console.log(" Info Popup! ");
              
          }
      });
  }

});




// This block handles the functionality of the drop down menu used to select the fees value

document.body.addEventListener("change", function(event){
  if(event.target.classList.contains("select")){
    event.target.previousElementSibling.textContent = event.target.value
  }
});


/**
* Checks each field to see if the user have entered a number other than zero, if the valuse remains at zero an alert pops up 
prompting the user to enter and amount.
The user cannot progress until all fields are complete.
*/
function validate() {
  stake = parseInt(document.getElementById('stake').value);
  tradingFee = parseFloat(document.getElementById('tradingFee').innerText);
  takeProfit = parseFloat(document.getElementById('takeProfit').innerText);
  stopLoss = parseFloat(document.getElementById('stopLoss').innerText);
  avgTrueRange = parseFloat(document.getElementById('avgTrueRange').innerText);
  marketMommentum = parseFloat(document.getElementById('marketMommentum').innerText);
  minutes = parseInt(document.getElementById('minutes').innerText);
  days = parseInt(document.getElementById('days').innerText);


  if (stake === 0) {
    alert("Please enter a stake amount");
    return false;
  } else if (tradingFee === 0) {
    alert("Select the appropreate trading fee");
    return false;
  } else if (takeProfit === 0) {
    alert("Use the slider to choose the desired take profit amount");
    return false;
  } else if (stopLoss === 0) {
    alert("Use the slider to choose the desired stop loss amount");
    return false;
  } else if (avgTrueRange === 0) {
    alert("Use the slider to choose the desired average true range amount");
    return false;
  } else if (marketMommentum === 0) {
    alert("Use the slider to choose the desired market momentum amount");
    return false;
  } else if (minutes === 0) {
    alert("Select the appropreate duration in minutes");
    return false;
  } else if (days === 0) {
    alert("Select the appropreate number of trading days");
    return false;
  } else {
    trading(); //  block of code to be executed once all fields have been completed
  }
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
 
 let tradingFee = 0; // 2nd of 8 options the user will set the user on the calculator.html page


  /****************************************
 *      TAKE PROFIT & STOP LOSS OPTIONS
 ****************************************/

   let takeProfit = 0; // 3rd of 8 options the user will set the user on the calculator.html page
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

   
/* THIS COULD BE SIMPLIFIED AS JUST HALFING THE VOLATILITY INPUT */
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
let tradeDuration = 10; // This will need to be multipled by 60 secound, but not while we are develpoing the application


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
let totalTrades = 0;
let newBalance = 0;

let tradeApplied = false;
let percentageProfit = 0;
let successRate = 0;

/* These allow for a runing total of each to be recorded and updated from trade to trade (what do you mean trade to trade) */
let totalFees = 0;
let profit = 0;
let netProfit = 0;

/* Function to calculate avergage */
function getAvg(value) {
  var total = 0;
  for (var i = 0; i < value.length; i++) {
    total += value[i];
  }
  var avg = total / value.length;
}

/**
* Moment by moment the assets price can increase or decrease 
* this function replicates this by generating random moves
*/
function generateRandonMove(min, max, decimalPlaces) {
  return (Math.random() * (max - min) + min).toFixed(decimalPlaces) * 1;
}

/**
* This function saves the results to the users local storage
*/
function SaveDataToLocalStorage(data)
{
    var saving = [];
    saving = JSON.parse(localStorage.getItem('results')) || [];
    saving.push(data);
    alert("The results have been saved and can be viewed on the results page. All fields will now be cleared ready for you to try different parameters");  // Should be something like [Object array]
    localStorage.setItem('results', JSON.stringify(saving));
    console.log(saving)
}


/**
* Moment by moment the assets price can increase or decrease 
* this function replicates this by generating random moves
*/
function saveResults() {

if (tradeApplied === false) {
  alert("Nothing to save!");
  return false;
} else {
  const result = {
"stake" : stake,
"Trading Fee" : tradingFee, 
  "takeProfit" : takeProfit, 
  "stopLoss" : stopLoss, 
  "avgTrueRange" : avgTrueRange, 
  "marketMommentum" : marketMommentum, 
  "minutes" : minutes, 
  "days" : days, 
    "win" : win,
    "timedOut" : timedOut,
    "losses" : losses, 
    "totalTrades" : totalTrades, 
    "newBalance" : newBalance, 
    "totalFees" : totalFees, 
    "netProfit" : netProfit, 
    "percentageProfit": percentageProfit,
    "successRate": successRate 
     };

  SaveDataToLocalStorage(result);
  location.reload()
}

}


/**
* This function contains the logic of the application
*/
function trading(){

  tradeApplied = true;

  let carriedBalance = stake;  
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
console.log('takeProfit:', takeProfit.toFixed(2));
console.log('stopLoss:', stopLoss.toFixed(2));
console.log('avgTrueRange:', avgTrueRange.toFixed(2));
console.log('marketMommentum:', marketMommentum.toFixed(2));
console.log('tradingFee:', tradingFee.toFixed(2));


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
    console.log('  *********************************************** TOTAL OF', frequency + 1, 'TRADING INSTANCE *********');
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
          console.log('seconds past', eachSecond + 1, ' --- Open to trade?', tradeOpen,);
          let move = generateRandonMove( -volatility, volatility, 1);
          
          let moveAmount = assetPrice * (move / 100);

          let movePerSecound = moveAmount + incrementMove;
          console.log('MOVE:', move, '% - ', moveAmount.toFixed(2), 'plus the average move of ', incrementMove.toFixed(2), 'equals =', movePerSecound.toFixed(2));

          assetPrice = assetPrice + movePerSecound;
          
      averagePrice = averagePrice + incrementMove; 
      
      console.log('This is the Asset Value is now: ', assetPrice.toFixed(2));
      console.log('The underlying average price is: ', averagePrice.toFixed(2));

/****************************************
##     TAKE PROFIT - - - - - - - - - IF STATEMENT
****************************************/
if (averagePrice >= takeProfitAmount && tradeOpen == true){
console.log('************************************** Take Profit conditions have been met');
console.log('Carried balance is: £', carriedBalance.toFixed(2));
let gain = carriedBalance * (takeProfit / 100);
carriedBalance = carriedBalance += gain;

let fee = gain * (tradingFee / 100);
carriedBalance -= fee;

console.log('From this trade we gained: £', gain.toFixed(2));
console.log('The fee from this trade was: £', fee.toFixed(2));
console.log('New balance is now: £', carriedBalance.toFixed(2));
win += 1;
profit += gain;
totalFees += fee;
tradeOpen = false;
break
};


/****************************************
##     STOP LOSS - - - - - - - - - IF STATEMENT
****************************************/
if (averagePrice <= stopLossAmount && tradeOpen == true){
console.log('************************************** Stop Loss conditions have been met');
console.log('Carried balance is: £', carriedBalance.toFixed(2));
let loss = carriedBalance * (stopLoss / 100);
carriedBalance = carriedBalance += loss;
fee = loss * (tradingFee / 100);
carriedBalance -= fee;
console.log('From this trade we lossed: £', loss.toFixed(2));
console.log('The fee from this trade was: £', fee.toFixed(2));
console.log('New balance is now: £', carriedBalance.toFixed(2));
losses += 1;
profit += loss;
totalFees += fee;
tradeOpen = false;
break
};

/****************************************
##     TIMED OUT MARKET ORDER - - - - - - - - - IF STATEMENT
****************************************/
if (eachSecond == tradeDuration - 1 && tradeOpen == true){
console.log('************************************** Timed out Market order');
console.log('Carried balance is: £', carriedBalance.toFixed(2));
changePercentage = (assetPrice - averagePrice) / averagePrice;

change = carriedBalance * changePercentage;
fee = change * (tradingFee / 100);
carriedBalance -= fee;
carriedBalance = carriedBalance += change;

console.log('The change was: £',change.toFixed(2));
console.log('The fee from this trade was: £', fee.toFixed(2));
console.log('New balance is now: £', carriedBalance.toFixed(2));
timedOut += 1;
profit += change;
totalFees += fee;
tradeOpen = false;
};

  }
}

}

/****************************************
##     STRATEGY OUTCOME
****************************************/
console.log('From a possible number of trades there have been', win, 'successes', timedOut, 'timed out trades', losses, 'losses');

win = document.getElementById("win").innerHTML = win;
timedOut = document.getElementById("timedOut").innerHTML = timedOut;
losses = document.getElementById("losses").innerHTML = losses;

totalTrades = (win + timedOut + losses);
totalTrades = document.getElementById("totalTrades").innerHTML = totalTrades;

newBalance = carriedBalance.toFixed(2);
newBalance = document.getElementById("newBalance").innerHTML = newBalance;

totalFees = totalFees.toFixed(2);
totalFees = document.getElementById("totalFees").innerHTML = totalFees;

netProfit = (profit - totalFees);
netProfit = netProfit.toFixed(2);
netProfit = document.getElementById("netProfit").innerHTML = netProfit;

percentageProfit = ((profit / totalFees) / carriedBalance) * 100;
percentageProfit = percentageProfit.toFixed(1);
percentageProfit = document.getElementById("percentageProfit").innerHTML = percentageProfit;

successRate = (win + losses) / 100 * win;
successRate = successRate.toFixed(1);
successRate = document.getElementById("successRate").innerHTML = successRate;

console.log('GROSS PROFIT: £', profit.toFixed(2));
console.log('NET PROFIT: £', netProfit);
console.log('PROFIT:', percentageProfit, '%');
console.log('SUCCESS:', successRate, '%');

}
};

init();