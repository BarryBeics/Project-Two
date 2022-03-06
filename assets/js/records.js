
 fetch('./data/records.json')
 .then(function (response) {
      return response.json();
  })
  .then(function (data) {
      for(var i=0; i<data.length; i++) {
          document. getElementById("data").innerHTML +=
          "<tr>" +
          "<td>" +  "£" + data[i].newBalance + "</td>" +
          "<td>" +  "£" +  data[i].netProfit + "</td>" + 
          "<td>" +  data[i].percentageProfit + "%" +  "</td>" +
          "<td>" +  "£" +  data[i].totalFees + "</td>" +  
          "<td>" + data[i].successRate + "%"  + "</td>" + 
          "<td>" + data[i].win  + "</td>" +
          "<td>" + data[i].timedOut + "</td>" +  
          "<td>" + data[i].losses + "</td>" + 
          "<td>" + data[i].totalTrades + "</td>" +
          "</tr>";
      }
  })
  .catch(function (err) {
      console.log(err);
  });


 

                     


