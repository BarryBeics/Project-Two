/*jshint esversion: 6 */

// Get JSON data from local storage
let resultsList = JSON.parse(localStorage.getItem('results'));
let bgcolor = '<div class="result-item-dark">';

if (resultsList !== null) {
    for(var i = 0; i < resultsList.length; i++) {
        // if the number is even use dark background
        if(i % 2 == 0) {
            bgcolor = '<div class="result-item-dark">';
        }
        // if the number is odd use light background
        else {
            bgcolor = '<div class="result-item-light">';
        }
        document.getElementById("resultsList").innerHTML +=
        bgcolor + '<div class="row">' +
        '<div class="col-md-3 col-sm-12"><h1>' +  "RESULT" +  "#" + (i+1) + "</h1>" + "</div>" +
        '<div class="col-md-9 col-sm-12"><h2>' +  "Your chosen parameters" + "</h2>" + "</div>" + "</div>" + '<div class="data-block">' +
        '<div class="data"><span>' +  "Stake" + "</span>" + "<p>" +  "£" + resultsList[i].stake + "</p>" + "</div>" +
        '<div class="data"><span>' +  "Crypto Price" + "</span>" + "<p>" + resultsList[i].cryptoPrice + "</p>" + "</div>" +
        '<div class="data"><span>' +  "Take Profit" + "</span>" + "<p>" + resultsList[i].takeProfit + "%" + "</p>" + "</div>" +
        '<div class="data"><span>' +  "Stop Loss" + "</span>" + "<p>" + resultsList[i].stopLoss +  "%" + "</p>" + "</div>" +
        '<div class="data"><span>' +  "ATR" + "</span>" + "<p>" + resultsList[i].avgTrueRange +  "%" + "</p>" + "</div>" +
        '<div class="data"><span>' +  "Market Momentum" + "</span>" + "<p>" + resultsList[i].marketMommentum + "%" + "</p>" + "</div>" +
        '<div class="data"><span>' +  "Minutes" + "</span>" + "<p>" + resultsList[i].minutes + "</p>" + "</div>" +
        '<div class="data"><span>' +  "Number of days" + "</span>" + "<p>" + resultsList[i].days + "</p>" + "</div>" + "</div>" + '<div class="data-block">' +
        '<div class="data-sub-title"><h2>' +  "Strategy Results" + "</h2>" + "</div>" +
        '<div class="data"><span>' +  "New Balance £" + "</span>" + "<p>" + "£" + resultsList[i].newBalance + "</p>" + "</div>" +
        '<div class="data"><span>' +  "Profit / Loss £" + "</span>" + "<p>" + resultsList[i].profitLoss + "</p>" + "</div>" +
        '<div class="data"><span>' +  "Profit %" + "</span>" + "<p>" +  resultsList[i].percentageProfit + "%" +  "</p>" + "</div>" +
        '<div class="data"><span>' +  "Wins" + "</span>" +  "<p>" + resultsList[i].wins  + "</p>" + "</div>" + 
        '<div class="data"><span>' +  "Timed Out" + "</span>" + "<p>" + resultsList[i].timedOut + "</p>" + "</div>" +
        '<div class="data"><span>' +  "Losses" + "</span>" + "<p>" + resultsList[i].losses + "</p>" + "</div>" +
        '<div class="data"><span>' +  "Avg Daily Trades" + "</span>" + "<p>" + resultsList[i].avgDailyTrades + "</p>" + "</div>" +
        '<div class="data"><span>' +  "Total Trades" + "</span>" + "<p>" + resultsList[i].totalTrades + "</p>" + "</div>" + "</div>" +
        "</div>";
    }
}else {
    // Displays by default when there are no results to load from local storage
    document.getElementById("resultsList").innerHTML +=
    bgcolor + 
    '<div class="data-title"><h1>' +  "Nothing to see here folks" + "</h1>" + "</div>" +
    '<div class="data-sub-title"><span>' +  "When you save trade calculations the will apear here" + "</span>" + "</div>" +
    "</div>";
    
  }
/**
   * Delete any results saved to users local storage
   */
  function deleteItem() {
    localStorage.removeItem('results');
    location.reload();
  }