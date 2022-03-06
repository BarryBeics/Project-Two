
 fetch('./data/records.json')
 .then(function (response) {
      return response.json();
  })
  .then(function (data) {
      for(var i=0; i<data.length; i++) {
          document. getElementById("data").innerHTML +=
          data[i].id + "=>" + 
          data[i].losses + " " + 
          data[i].netProfit + " " + 
          data[i].newBalance + " " + 
          data[i].percentageProfit + 
          data[i].successRate + " " + 
          data[i].timedOut + " " +  
          data[i].totalFees + " " +  
          data[i].totalTrades + " " + 
          data[i].win + "<br />";
      }
  })
  .catch(function (err) {
      console.log(err);
  });


