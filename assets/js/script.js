// The application has been enclosed within the init function so as to avoid any variable being classed as global
function init() {

  // Wait for the DOM to finish loading before taking values from the inputs
  // Get the button elements and add event listeners to them
  document.addEventListener("DOMContentLoaded", function () {

    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {

      button.addEventListener("click", function () {
        console.log(button);
        if (this.getAttribute("data-type") === "trade") {
          // On click runs trading function

          validate();
        } else if (this.getAttribute("data-type") === "save") {
          // On click runs save function
          saveResults();
        } else {
          console.log(" Info Popup! ");
        }
      });
    }

  });

  // This block handles the functionality of the drop down menu used to select the Crypto Price

  document.body.addEventListener("change", function (event) {
    if (event.target.classList.contains("select")) {
      event.target.previousElementSibling.textContent = event.target.value
    }
  });

  /**
  * Checks each field to see if the user have entered a number other than zero, if a value remains at zero an alert pops up 
  prompting the user to enter and amount.
  The user cannot progress until all fields are complete.
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
      trading(); 
    }
  }


  let stake = 0; 
  let takeProfit = 0; 
  let stopLoss = 0; 
  let avgTrueRange = 0; 
  let volatility = 0;

 
  /* Exchange rate */
  function exchangeRate(cryptoPrice) {
    let valueHeld = stake / cryptoPrice;
  }

 

  /* THIS COULD BE SIMPLIFIED AS JUST HALFING THE VOLATILITY INPUT */
  function chooseVolatility() {

    let volatilityOptions = {
      2: 1,
      4: 2,
      6: 4,
      8: 4,
      10: 5
    };
    volatility = volatilityOptions[avgTrueRange];

  }

  //volatility = avgTrueRange / 2;

  let marketMommentum = 0; 

  let days = 0;
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


  let win = 0;
  let timedOut = 0;
  let losses = 0;
  let totalTrades = 0;
  let newBalance = 0;

  let tradeApplied = false;
  let percentageProfit = 0;
  let successRate = 0;

  /* These allow for a runing total of each to be recorded and updated from trade to trade (what do you mean trade to trade) */

  let profit = 0;
  let netProfit = 0;


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
  function SaveDataToLocalStorage(data) {
    var saving = [];
    saving = JSON.parse(localStorage.getItem('results')) || [];
    saving.push(data);
    alert("The results have been saved and can be viewed on the results page. All fields will now be cleared ready for you to try different parameters"); // Should be something like [Object array]
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
        "win": win,
        "timedOut": timedOut,
        "losses": losses,
        "totalTrades": totalTrades,
        "newBalance": newBalance,
        "netProfit": netProfit,
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
  function trading() {

    tradeApplied = true;

    let carriedBalance = stake;
    /* This is the amount increase the crypto will gain on average during the trade (this ensures market momentum at the set amount but still allows the price to fluxuate randomly) */
    exchangeRate(cryptoPrice);

    chooseVolatility(avgTrueRange);
    let projectedGain = cryptoPrice * (marketMommentum / 100);
    let incrementMove = projectedGain / (6 * seconds);
    

    /* This initial sets the */
    let averagePrice = cryptoPrice;
    let assetPrice = cryptoPrice;
    

    /***   NUMBER OF DAYS - - ***/
    for (let eachDay = 0; eachDay < days; eachDay++) {
  

      /***  NUMBER OF TRADES - -******/
      for (let frequency = 0; frequency < generateRandomDaily(); frequency++)
      
      {

        let tradeOpen = true;

        let takeProfitAmount = assetPrice + (assetPrice * (takeProfit / 100));
        let stopLossAmount = assetPrice + (assetPrice * (stopLoss / 100));


        /***  TRADE DURATION - - - -******/
        for (let eachSecond = 0; eachSecond < tradeDuration; eachSecond++) {
      
          let move = generateRandonMove(-volatility, volatility, 1);
          let moveAmount = assetPrice * (move / 100);
          let movePerSecound = moveAmount + incrementMove;

          assetPrice = assetPrice + movePerSecound;
          averagePrice = averagePrice + incrementMove;


          /***  TAKE PROFIT - -*****/
          if (averagePrice >= takeProfitAmount && tradeOpen == true) {
   
            let gain = carriedBalance * (takeProfit / 100);
            carriedBalance = carriedBalance += gain;
            win += 1;
            profit += gain;
            tradeOpen = false;
            break
          };


          /****  STOP LOSS - - -****/
          if (averagePrice <= stopLossAmount && tradeOpen == true) {

            let loss = carriedBalance * (stopLoss / 100);
            carriedBalance = carriedBalance += loss;
            losses += 1;
            profit += loss;
            tradeOpen = false;
            break
          };

          /***  TIMED OUT MARKET ORDER - *****/
          if (eachSecond == tradeDuration - 1 && tradeOpen == true) {
            
            changePercentage = (assetPrice - averagePrice) / averagePrice;
            change = carriedBalance * changePercentage;
            carriedBalance = carriedBalance += change;

            timedOut += 1;
            profit += change;
            tradeOpen = false;
          };

        }
      }

    }

    /***  STRATEGY OUTCOME ****/
    console.log('From a possible number of trades there have been', win, 'successes', timedOut, 'timed out trades', losses, 'losses');

    win = document.getElementById("win").innerHTML = win;
    timedOut = document.getElementById("timedOut").innerHTML = timedOut;
    losses = document.getElementById("losses").innerHTML = losses;

    totalTrades = (win + timedOut + losses);
    totalTrades = document.getElementById("totalTrades").innerHTML = totalTrades;

    newBalance = carriedBalance.toFixed(2);
    newBalance = document.getElementById("newBalance").innerHTML = newBalance;

    netProfit = (profit);
    netProfit = netProfit.toFixed(2);
    netProfit = document.getElementById("netProfit").innerHTML = netProfit;

    percentageProfit = (netProfit / stake) * 100;
    percentageProfit = percentageProfit.toFixed(1);
    percentageProfit = document.getElementById("percentageProfit").innerHTML = percentageProfit;

  }
};

init();