
 
 var ResultsList = JSON.parse(localStorage.getItem('ResultsList'));
 
console.log(ResultsList);
 
for(var i=0; i<ResultsList.length; i++) {
    document. getElementById("ResultsList").innerHTML +=
    "<tr>" +
    "<td>" +  "£" + ResultsList[i].newBalance + "</td>" +
    "<td>" +  "£" +  ResultsList[i].netProfit + "</td>" + 
    "<td>" +  ResultsList[i].percentageProfit + "%" +  "</td>" +
    "<td>" +  "£" +  ResultsList[i].totalFees + "</td>" +  
    "<td>" + ResultsList[i].successRate + "%"  + "</td>" + 
    "<td>" + ResultsList[i].win  + "</td>" +
    "<td>" + ResultsList[i].timedOut + "</td>" +  
    "<td>" + ResultsList[i].losses + "</td>" + 
    "<td>" + ResultsList[i].totalTrades + "</td>" +
    "</tr>";
}
 
