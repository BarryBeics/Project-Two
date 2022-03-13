
 
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
        '<div class="data"><p>' +  "RESULT" + "</p>" + "<span>" + (i+1) + "</span>" + "</div>" +
        '<div class="data"><p>' +  "Stake" + "</p>" + "<span>" +  "£" + ResultsList[i].stake + "</span>" + "</div>" +
        '<div class="data"><p>' +  "Trading Fee" + "</p>" + "<span>" +  "%" + ResultsList[i].tradingFee + "</span>" + "</div>" +
        '<div class="data"><p>' +  "Take Profit" + "</p>" + "<span>" +  "%" + ResultsList[i].takeProfit + "</span>" + "</div>" +
        '<div class="data"><p>' +  "Stop Loss" + "</p>" + "<span>" +  "%" + ResultsList[i].stopLoss + "</span>" + "</div>" +
        '<div class="data"><p>' +  "ATR" + "</p>" + "<span>" +  "%" + ResultsList[i].avgTrueRange + "</span>" + "</div>" +
        '<div class="data"><p>' +  "Market Momentum" + "</p>" + "<span>" +  "£" + ResultsList[i].marketMommentum + "</span>" + "</div>" +
        '<div class="data"><p>' +  "Minutes" + "</p>" + "<span>" +  "£" + ResultsList[i].minutes + "</span>" + "</div>" +
        '<div class="data"><p>' +  "Number of days" + "</p>" + "<span>" +  "£" + ResultsList[i].days + "</span>" + "</div>" +
        '<div class="data"><p>' +  "New Balance £" + "</p>" + "<span>" + ResultsList[i].newBalance + "</span>" + "</div>" +
        '<div class="data"><p>' +  "Net Profit £" + "</p>" + "<span>" +  "£" +  ResultsList[i].netProfit + "</span>" + "</div>" +
        '<div class="data"><p>' +  "Profit %" + "</p>" + "<span>" +  ResultsList[i].percentageProfit + "%" +  "</span>" + "</div>" +
        '<div class="data"><p>' +  "Total Fees" + "</p>" + "<span>" +  "£" +  ResultsList[i].totalFees + "</span>" +  "</div>" +
        '<div class="data"><p>' +  "Success Rate" + "</p>" + "<span>" + ResultsList[i].successRate + "%"  + "</span>" + "</div>" +
        '<div class="data"><p>' +  "Wins" + "</p>" +  "<span>" + ResultsList[i].win  + "</span>" + "</div>" + 
        '<div class="data"><p>' +  "Timed Out" + "</p>" + "<span>" + ResultsList[i].timedOut + "</span>" + "</div>" +
        '<div class="data"><p>' +  "Losses" + "</p>" + "<span>" + ResultsList[i].losses + "</span>" + "</div>" +
        '<div class="data"><p>' +  "Total Trades" + "</p>" + "<span>" + ResultsList[i].totalTrades + "</span>" + "</div>" +
        "</div>";
    };
};


