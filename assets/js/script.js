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
          validate();
        } else if (this.getAttribute("data-type") === "save") {
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
      event.target.previousElementSibling.textContent = event.target.value;
    }
  });

  /**
  * Checks each field to see if the user have entered a number other than zero, if a value remains at zero an alert pops up 
  prompting the user to enter and amount. The user cannot progress until all fields are complete.
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


  let stake = 0; 
  let takeProfit = 0; 
  let stopLoss = 0; 
  let avgTrueRange = 0; 
  let volatility = 0;
  let marketMommentum = 0; 
  let days = 0;
  let minutes =0;
  let tradeDuration = 0;

   /* Exchange rate */ //IT LOOKS LIKE THIS MAY WELL BE REDUNDENT CODE
   function exchangeRate(cryptoPrice) {
    let valueHeld = stake / cryptoPrice;
  }

  /*  This is the winsdow of opportunity you allow for the trade to fulfill 1 of 3 criteria, Take Profit, Stop Loss or Timed Out Market Order 

  //let tradeDuration = 30; // This will need to be multipled by 60 secound, but not while we are develpoing the application */
  
  let wins = 0;
  let timedOut = 0;
  let losses = 0;
  let totalTrades = 0;
  let newBalance = 0;
  let tradeApplied = false;
  let percentageProfit = 0;
  let profitLoss = 0;
  let cryptoSelection = 0;
  let cryptoPrice = 0;


  /**
   * Moment by moment the assets price can increase or decrease 
   * this function replicates this by generating random moves
   */
  function generateRandonMove(min, max, decimalPlaces) {
    return (Math.random() * (max - min) + min).toFixed(decimalPlaces) * 1;
  }

   /**
   * tradesPerDay trades would be trade 24 hours / trade duration the would be a random amount from that range
   * take 24hour / 1 day in minutes 1440 and divede by selected trade duration to produce the range
   * from this generate a random number to similate a realife probability of trade oppotunities in any 1 given day
   */
    function generateRandomDaily(minTrades, maxTrades) {
      minTrades = 0;
      maxTrades = 1440 / minutes ;
      return Math.floor(Math.random() * (maxTrades - minTrades) + minTrades);
    }

    let next = 0;
    let selector = 0; 
    let correction = [];

  function avgPriceCorrection(){
    let workings = 0;
    let min = 23;
    let max = 112;
     
     for(let i = 0; i < 100; i++) {
         let randomSelect = Math.floor(Math.random() * (max - min + 1)) + min;
         workings += randomSelect;
         correction.push(workings);
         if (workings >= tradeDuration) {
             break;
         }
     }
     console.log('thie list', correction);
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
        "wins": wins,
        "timedOut": timedOut,
        "losses": losses,
        "totalTrades": totalTrades,
        "newBalance": newBalance,
        "profitLoss": profitLoss,
        "percentageProfit": percentageProfit
      };

      SaveDataToLocalStorage(result);
      location.reload();
    }
  }

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

  function trading() {
    clearResult();
    tradeApplied = true;
    let carriedBalance = stake;
    
    console.log('carried balance at the start:', carriedBalance);
    console.log('Opening price for the crypto', cryptoPrice);
    /* This is the amount increase the crypto will gain on average during the trade (this ensures market momentum at the set amount but still allows the price to fluxuate randomly) */
    exchangeRate(cryptoPrice);

    volatility = avgTrueRange / 2;
    console.log('volatility', volatility);
    let projectedGain = cryptoPrice * (marketMommentum / 100);
    console.log('projectedGain', projectedGain.toFixed(2));
    let incrementMove = projectedGain / (60);
    console.log('incrementMove', incrementMove.toFixed(2));
    

   
     
    

    /***   NUMBER OF DAYS - - ***/
    for (let eachDay = 0; eachDay < days; eachDay++) {
      console.log('************************* ******************* Trading for day:', eachDay +1);

      /***  NUMBER OF TRADES - -******/
      for (let frequency = 0; frequency < generateRandomDaily(); frequency++) {
          /* This initial sets the */
        let averagePrice = cryptoPrice;
        let assetPrice = cryptoPrice;
        let tradeOpen = true;
        let takeProfitAmount = assetPrice + (assetPrice * (takeProfit / 100));
        let stopLossAmount = assetPrice + (assetPrice * (stopLoss / 100));


        console.log('take profit at:', takeProfitAmount.toFixed(2));
        console.log('Stop loss set at:',stopLossAmount.toFixed(2));
        next = 0;
        tradeDuration = tradeDuration;
        correction = [];
        avgPriceCorrection();

        /***  TRADE DURATION - - - -******/
        for (let eachSecond = 0; eachSecond < tradeDuration; eachSecond++) {

          let move = generateRandonMove(-volatility, volatility, 1);
          let moveAmount = assetPrice * (move / 100);
          let movePerSecound = moveAmount + incrementMove;
          assetPrice = assetPrice + movePerSecound;
          averagePrice = averagePrice + incrementMove;

          
          selector = correction[next];
          if (eachSecond == selector) {
            console.log('this is where the magichappens', selector)
            next += 1;
            console.log('THE NEXT SELCETOR',next)
            assetPrice = averagePrice;
          };
          

          console.log(eachSecond +1, 'seconds');
          console.log('move', move.toFixed(2));
          console.log('move amount', moveAmount.toFixed(2));
          console.log('assets Price', assetPrice.toFixed(2));
          console.log('underlying average price', averagePrice.toFixed(2));


          /***  TAKE PROFIT - -*****/
          if (assetPrice >= takeProfitAmount && tradeOpen == true) {

            let gain = carriedBalance * (takeProfit / 100);
            carriedBalance = carriedBalance += gain;

            console.log('********** TAKE PROFIT *****************');
            console.log('gain', gain.toFixed(2));
            console.log('carried balance', carriedBalance.toFixed(2));

            wins += 1;
            profitLoss += gain;
            tradeOpen = false;
            break;
          }

          /****  STOP LOSS - - -****/
          if (assetPrice <= stopLossAmount && tradeOpen == true) {

            let loss = carriedBalance * (stopLoss / 100);
            carriedBalance = carriedBalance += loss;

            console.log('********** STOP LOSS *****************');
            console.log('loss', loss.toFixed(2));
            console.log('carried balance', carriedBalance.toFixed(2));

            losses += 1;
            profitLoss += loss;
            tradeOpen = false;
            break;
          }

          /***  TIMED OUT MARKET ORDER - *****/
          if (eachSecond == tradeDuration - 1 && tradeOpen == true) {

            let changePercentage = (assetPrice - averagePrice) / averagePrice;
            let change = carriedBalance * changePercentage;
            carriedBalance = carriedBalance += change;

            console.log('********** TIMED OUT TRADE *****************');
            console.log('changePercentage', changePercentage);
            console.log('change', change.toFixed(2));
            console.log('carried balance', carriedBalance.toFixed(2));

            timedOut += 1;
            profitLoss += change;
            tradeOpen = false;
          }

        }
      }

    }

    /***  STRATEGY OUTCOME ****/
    wins = document.getElementById("wins").innerHTML = wins;
    timedOut = document.getElementById("timedOut").innerHTML = timedOut;
    losses = document.getElementById("losses").innerHTML = losses;
    
    cryptoSelection = cryptoPrice.toFixed(2);
    cryptoSelection = document.getElementById("cryptoSelection").innerHTML = cryptoSelection;
    console.log.apply(cryptoSelection);

    totalTrades = (wins + timedOut + losses);
    totalTrades = document.getElementById("totalTrades").innerHTML = totalTrades;

    newBalance = carriedBalance.toFixed(2);
    newBalance = document.getElementById("newBalance").innerHTML = newBalance;

    profitLoss = profitLoss.toFixed(2);
    profitLoss = document.getElementById("profitLoss").innerHTML = profitLoss;

    percentageProfit = (profitLoss / stake) * 100;
    percentageProfit = percentageProfit.toFixed(1);
    percentageProfit = document.getElementById("percentageProfit").innerHTML = percentageProfit;

    console.log('From a possible', totalTrades, 'of trades there have been', wins, 'successes', timedOut, 'timed out trades', losses, 'losses');

  }
}

init();