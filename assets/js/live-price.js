// get the feed of data from just the crypto currencies your interested in
let streams = [
    "ethusdt@miniTicker",
    "btcusdt@miniTicker",
    "xrpusdt@miniTicker",
    "adausdt@miniTicker"
  ];
  let allCurrencies = [];
  let crypto = new WebSocket("wss://stream.binance.com:9443/ws/" + streams.join('/'));


// try to get the price & ticker for each currency
crypto.onmessage = function(lookFor) {
  try {
    let msgs = JSON.parse(lookFor.data);
    if (Array.isArray(msgs)) {
      for (let msg of msgs) {
        handleMessage(msg);
      }
    } else {
      handleMessage(msgs)
    }
  } catch (e) {
    console.log('Unknown message: ' + lookFor.data, e);
  }
}

// Build the HTML <option> values
function handleMessage(msg) {
  const stream = msg.s;
  if (allCurrencies.indexOf(stream) === -1) {
    document.getElementById('streams').innerHTML   += '<option id="stream_' + stream + '"' + 'value="' + stream +'">' + stream + '</option>';
    allCurrencies.push(stream);
  }
  document.getElementById('stream_' + stream).value = parseFloat(msg.c).toFixed(2);
}







 



