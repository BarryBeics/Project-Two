


    const btc_url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin';
    const eth_url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum';
    const xrp_url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ripple';
    const ada_url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=cardano';

    async function getBTC() {
        const responce = await fetch(btc_url);
        const data = await responce.json();
        const price = data[0].current_price;
        document.getElementById('BTCprice').value = price;

    }
    
    async function getETH() {
        const responce = await fetch(eth_url);
        const data = await responce.json();
        const price = data[0].current_price;
        document.getElementById('ETHprice').value = price;
    }

    async function getXRP() {
        const responce = await fetch(xrp_url);
        const data = await responce.json();
        const price = data[0].current_price;
        document.getElementById('XRPprice').value = price;
    }
    
    async function getADA() {
        const responce = await fetch(ada_url);
        const data = await responce.json();
        const price = data[0].current_price;
        document.getElementById('ADAprice').value = price;
    }

    getBTC();
    getETH();
    getXRP();
    getADA();