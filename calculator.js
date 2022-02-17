let inputDays = 2;
let numberOfTrades = 4;
let tradeDuration = 10;
let tradeOpen = true;



  // generate random market fluxtuations 
  
  function genRand(min, max, decimalPlaces) {
    return (Math.random() * (max - min) + min).toFixed(decimalPlaces) * 1;
  } 
  
  
/****************************************
 *      NUMBER OF DAYS - - - - - - - - - - FOR LOOP
 ****************************************/
for (let eachDay = 0; eachDay < inputDays; eachDay++) {
  console.log('Begining of trading day', eachDay + 1);

 /****************************************
 *     NUMBER OF TRADES - - - - - - - - - - FOR LOOP
 ****************************************/
  for (let frequency = 0; frequency < numberOfTrades; frequency++)
  // PRINT STATEMENT USED FOR DEBUGGING
  {
    console.log('*********************** THIS IS AN INSTANCES OF TRADING.  *************** TOTAL OF', frequency + 1, 'TRADING INSTANCE *********');


 /****************************************
        ##     TRADE DURATION - - - - - - - - - - FOR LOOP
 ****************************************/
        for (let eachSecond = 0; eachSecond < tradeDuration; eachSecond++)
        {
          console.log('seconds past', eachSecond + 1, ' --- Open to trade?', tradeOpen, 'move' , genRand(-5, 5, 1) );
          



        }
}
}


 


/****************************************
  if (each_day == 7) {
    break;
  }
 ****************************************/

