
 
var ResultsList = JSON.parse(localStorage.getItem('results'));
let bgcolor = '<div class="result-item-dark">';
console.log(ResultsList);

if (ResultsList !== null) {
    for(var i = 0; i < ResultsList.length; i++) {
    
        if(i % 2 == 0) {
            bgcolor = '<div class="result-item-light">';
        }
        
        // if the number is odd
        else {
            bgcolor = '<div class="result-item-dark">';
        }
        document.getElementById("ResultsList").innerHTML +=
        bgcolor + 
        '<div class="data-title"><h1>' +  "RESULT" +  "#" + (i+1) + "</h1>" + "</div>" +
        '<div class="data-sub-title"><span>' +  "Your chosen parameters" + "</span>" + "</div>" +
        '<div class="data"><span>' +  "Stake" + "</span>" + "<p>" +  "£" + ResultsList[i].stake + "</p>" + "</div>" +
        '<div class="data"><span>' +  "Trading Fee" + "</span>" + "<p>" + ResultsList[i].tradingFee + "%" + "</p>" + "</div>" +
        '<div class="data"><span>' +  "Take Profit" + "</span>" + "<p>" + ResultsList[i].takeProfit + "%" + "</p>" + "</div>" +
        '<div class="data"><span>' +  "Stop Loss" + "</span>" + "<p>" + ResultsList[i].stopLoss +  "%" + "</p>" + "</div>" +
        '<div class="data"><span>' +  "ATR" + "</span>" + "<p>" + ResultsList[i].avgTrueRange +  "%" + "</p>" + "</div>" +
        '<div class="data"><span>' +  "Market Momentum" + "</span>" + "<p>" + ResultsList[i].marketMommentum + "%" + "</p>" + "</div>" +
        '<div class="data"><span>' +  "Minutes" + "</span>" + "<p>" + ResultsList[i].minutes + "</p>" + "</div>" +
        '<div class="data"><span>' +  "Number of days" + "</span>" + "<p>" + ResultsList[i].days + "</p>" + "</div>" +
        '<div class="data-sub-title"><span>' +  "Strategy Results" + "</span>" + "</div>" +
        '<div class="data"><span>' +  "New Balance £" + "</span>" + "<p>" + "£" + ResultsList[i].newBalance + "</p>" + "</div>" +
        '<div class="data"><span>' +  "Net Profit £" + "</span>" + "<p>" + ResultsList[i].netProfit + "</p>" + "</div>" +
        '<div class="data"><span>' +  "Profit %" + "</span>" + "<p>" +  ResultsList[i].percentageProfit + "%" +  "</p>" + "</div>" +
        '<div class="data"><span>' +  "Total Fees" + "</span>" + "<p>" +  "£" +  ResultsList[i].totalFees + "</p>" +  "</div>" +
        '<div class="data"><span>' +  "Success Rate" + "</span>" + "<p>" + ResultsList[i].successRate + "%"  + "</p>" + "</div>" +
        '<div class="data"><span>' +  "Wins" + "</span>" +  "<p>" + ResultsList[i].win  + "</p>" + "</div>" + 
        '<div class="data"><span>' +  "Timed Out" + "</span>" + "<p>" + ResultsList[i].timedOut + "</p>" + "</div>" +
        '<div class="data"><span>' +  "Losses" + "</span>" + "<p>" + ResultsList[i].losses + "</p>" + "</div>" +
        '<div class="data"><span>' +  "Total Trades" + "</span>" + "<p>" + ResultsList[i].totalTrades + "</p>" + "</div>" +
        "</div>";
    };
};


