
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


let inputDaysCount = 2;
let numberOfTradesCount = 4;
let tradeDurationCount = 10;
let tradeOpen = true;



function inputDays() {
  for (let eachDay = 0; eachDay < inputDaysCount; eachDay++) {
    console.log('Begining of trading day', eachDay + 1);
  }
}



function numberOfTrades() {
  for (let frequency = 0; frequency < numberOfTradesCount; frequency++)
  // PRINT STATEMENT USED FOR DEBUGGING
  {
    console.log('*********************** THIS IS AN INSTANCES OF TRADING.  *************** TOTAL OF', frequency + 1, 'TRADING INSTANCE *********');
}
}


function tradeDuration() {

        for (let eachSecond = 0; eachSecond < tradeDurationCount; eachSecond++)
        {
          console.log('seconds past', eachSecond + 1, ' --- Open to trade?', tradeOpen, 'move' , generateRandonMove(-5, 5, 1) );
        }
}

function trading(){
/****************************************
 *      NUMBER OF DAYS - - - - - - - - - - FOR LOOP
 ****************************************/
 inputDays();

 /****************************************
 *     NUMBER OF TRADES - - - - - - - - - - FOR LOOP
 ****************************************/
  numberOfTrades();

 /****************************************
        ##     TRADE DURATION - - - - - - - - - - FOR LOOP
 ****************************************/
tradeDuration();
}

trading();


  
  





 


/****************************************
  if (each_day == 7) {
    break;
  }
 ****************************************/