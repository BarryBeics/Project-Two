/*jshint esversion: 6 */

// Set initial values
let stake = 0;
let cryptoPrice = 0;
let takeProfit = 0;
let stopLoss = 0;
let avgTrueRange = 0;
let volatility = 0;
let marketMommentum = 0;
let minutes = 0;
let days = 0;
let tradeDuration = 0;
let newBalance = 0;
let profitLoss = 0;
let percentageProfit = 0;
let cryptoSelection = 0;
let wins = 0;
let timedOut = 0;
let losses = 0;
let avgDailyTrades = 0;
let totalTrades = 0;
let tradeApplied = false;
let next = 0;
let selector = 0;
let correction = [];


// Wait for the DOM to finish loading before taking values from the inputs
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function () {

  let buttons = document.getElementsByTagName("button");
  for (let button of buttons) {
    button.addEventListener("click", function () {
      if (this.getAttribute("data-type") === "trade") {
        validate();
      } else if (this.getAttribute("data-type") === "save") {
        saveResults();
      }
    });
  }
});

// This block handles the functionality of the drop down menu used to select the Crypto Price
document.body.addEventListener("change", function (event) {
  if (event.target.classList.contains("select")) {
    event.target.previousElementSibling.textContent = event.target.value;
  }
});

/**
* Checks each field for a correct input, if incorrect an alert pops up 
prompting the user to enter a correct amount. The user cannot progress until all fields are complete.
*/
function validate() {
  stake = parseInt(document.getElementById('stake').value);
  cryptoPrice = parseFloat(document.getElementById('cryptoPrice').innerText);
  takeProfit = parseFloat(document.getElementById('takeProfit').innerText);
  stopLoss = parseFloat(document.getElementById('stopLoss').innerText);
  avgTrueRange = parseFloat(document.getElementById('avgTrueRange').innerText);
  marketMommentum = parseFloat(document.getElementById('marketMommentum').innerText);
  minutes = parseInt(document.getElementById('minutes').innerText);
  days = parseInt(document.getElementById('days').innerText);

  if (stake <= 0 || stake > 10000) {
    alert("Please enter a stake amount up to 10,000");
    return false;
  } else if (cryptoPrice === 0) {
    alert("Select your preferred crypto currency");
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
    tradeDuration = (minutes * 60);
    trading();
  }
}

/**
 * Moment by moment the assets price can increase or decrease 
 * this function replicates this by generating random moves
 */
function generateRandonMove(min, max, decimalPlaces) {
  return (Math.random() * (max - min) + min).toFixed(decimalPlaces) * 1;
}

/**
 * Generates a random number between 4 and (1440 = 24hours in minutes) / trade duration selection
 * this function ensures there are a random number of daily trade oppotunities
 */
function generateRandomDaily(minTrades, maxTrades) {
  minTrades = 3;
  maxTrades = 1440 / minutes;
  return Math.floor(Math.random() * (maxTrades - minTrades) + minTrades);
}

/**
 * Generates a random number between 23 and 112 to populate a list of when
 * to pull the price back to the moving average 
 */
function avgPriceCorrection() {
  let workings = 0;
  let min = 23;
  let max = 112;

  for (let i = 0; i < 100; i++) {
    let randomSelect = Math.floor(Math.random() * (max - min + 1)) + min;
    workings += randomSelect;
    correction.push(workings);
    if (workings >= tradeDuration) {
      break;
    }
  }
}

/**
 * This function saves the results to the users local storage
 */
function SaveDataToLocalStorage(data) {
  var saving = [];
  saving = JSON.parse(localStorage.getItem('results')) || [];
  saving.push(data);
  alert("The results have been saved and can be viewed on the results page. All fields will now be cleared ready for you to try different parameters");
  localStorage.setItem('results', JSON.stringify(saving));
}

/**
 * Checks to see if there are results to be saved 
 * Gathers the relavent data then calls the SaveDataToLocalStorage function
 * then clears the fields ready for a new strategy
 */
function saveResults() {

  if (tradeApplied === false) {
    alert("Nothing to save!");
    return false;
  } else {
    const result = {
      "stake": stake,
      "cryptoPrice": cryptoPrice,
      "takeProfit": takeProfit,
      "stopLoss": stopLoss,
      "avgTrueRange": avgTrueRange,
      "marketMommentum": marketMommentum,
      "minutes": minutes,
      "days": days,
      "newBalance": newBalance,
      "profitLoss": profitLoss,
      "percentageProfit": percentageProfit,
      "wins": wins,
      "timedOut": timedOut,
      "losses": losses,
      "avgDailyTrades": avgDailyTrades,
      "totalTrades": totalTrades
    };

    SaveDataToLocalStorage(result);
    location.reload();
  }
}

/**
 * Resets values to zero 
 */
function clearResult() {
  wins = 0;
  timedOut = 0;
  losses = 0;
  totalTrades = 0;
  newBalance = 0;
  profitLoss = 0;
  percentageProfit = 0;
  cryptoSelection = 0;
}

/**
 * Takes users input and makes a calculation by running the market simulation
 * Contains other functions which are each called at the appropriate time 
 */
function trading() {
  clearResult();
  tradeApplied = true;
  let carriedBalance = stake;

  volatility = avgTrueRange / 2;
  let projectedGain = cryptoPrice * (marketMommentum / 100);
  let incrementMove = projectedGain / (60);


  // for loop to control the NUMBER OF DAYS 
  for (let eachDay = 0; eachDay < days; eachDay++) {


    // for loop to control the NUMBER OF TRADES
    for (let frequency = 0; frequency < generateRandomDaily(); frequency++) {
      /* This initial sets the */
      let averagePrice = cryptoPrice;
      let assetPrice = cryptoPrice;
      let tradeOpen = true;
      let takeProfitAmount = assetPrice + (assetPrice * (takeProfit / 100));
      let stopLossAmount = assetPrice + (assetPrice * (stopLoss / 100));

      next = 0;
      tradeDuration = tradeDuration;
      correction = [];
      avgPriceCorrection();

      // for loop to control the TRADE DURATION 
      for (let eachSecond = 0; eachSecond < tradeDuration; eachSecond++) {

        let move = generateRandonMove(-volatility, volatility, 1);
        let moveAmount = assetPrice * (move / 100);
        let movePerSecound = moveAmount + incrementMove;
        assetPrice = assetPrice + movePerSecound;
        averagePrice = averagePrice + incrementMove;


        selector = correction[next];
        if (eachSecond == selector) {
          next += 1;
          assetPrice = averagePrice;
        }

        // if statement to action TAKE PROFIT conditions
        if (assetPrice >= takeProfitAmount && tradeOpen == true) {
          let gain = carriedBalance * (takeProfit / 100);
          carriedBalance = carriedBalance += gain;
          wins += 1;
          profitLoss += gain;
          tradeOpen = false;
          break;
        }

        // if statement to action STOP LOSS conditions
        if (assetPrice <= stopLossAmount && tradeOpen == true) {
          let loss = carriedBalance * (stopLoss / 100);
          carriedBalance = carriedBalance += loss;
          losses += 1;
          profitLoss += loss;
          tradeOpen = false;
          break;
        }

        // if statement to action TIMED OUT MARKET ORDER conditions
        if (eachSecond == tradeDuration - 1 && tradeOpen == true) {
          let changePercentage = (assetPrice - averagePrice) / averagePrice;
          let change = carriedBalance * changePercentage;
          carriedBalance = carriedBalance += change;
          timedOut += 1;
          profitLoss += change;
          tradeOpen = false;
        }

      }
    }

  }

  // STRATEGY OUTCOME updates variables with values then populate screen by getting elements by there id's
  wins = document.getElementById("wins").innerHTML = wins;
  timedOut = document.getElementById("timedOut").innerHTML = timedOut;
  losses = document.getElementById("losses").innerHTML = losses;

  cryptoSelection = cryptoPrice;
  // handle larger crypto values by removing decimals points
  if (cryptoSelection > 100) {
    cryptoSelection = cryptoSelection.toFixed(0);
  } else {
    cryptoSelection = cryptoSelection.toFixed(2);
  }
  cryptoSelection = document.getElementById("cryptoSelection").innerHTML = cryptoSelection;

  totalTrades = (wins + timedOut + losses);
  totalTrades = document.getElementById("totalTrades").innerHTML = totalTrades;

  avgDailyTrades = totalTrades / days;
  avgDailyTrades = avgDailyTrades.toFixed(1);
  avgDailyTrades = document.getElementById("avgDailyTrades").innerHTML = avgDailyTrades;

  newBalance = carriedBalance.toFixed(2);
  newBalance = document.getElementById("newBalance").innerHTML = newBalance;

  profitLoss = profitLoss.toFixed(2);
  profitLoss = document.getElementById("profitLoss").innerHTML = profitLoss;

  percentageProfit = (profitLoss / stake) * 100;
  percentageProfit = percentageProfit.toFixed(1);
  percentageProfit = document.getElementById("percentageProfit").innerHTML = percentageProfit;
}