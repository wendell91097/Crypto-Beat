const getData = async () => {
    let response = await axios.get('https://api.coingecko.com/api/v3/coins/');
    console.log(response.data);
    return response.data;
};


// Create constants to hold DOM elements

const DOM_Elements = {
    coin_list : '.coin-list',
    clicked_coin : '.clicked-coin',
    last_update : '.update-cap'
};

// Create arrow function to display coin movement

const arrow = ( percentage ) => {
    if(percentage < 0){
        return `<img src="./static/SVG/arrow-down.svg" alt="down arrow" class="px-1 down-arrow" title="Down ${percentage}%"></img>`
    } else {
        return `<img src="./static/SVG/arrow-up.svg" alt="up arrow" class="px-1 up-arrow" title="Up ${percentage}%"></img>`
    }
}

// Create the diplay_coin function

function display_coin( icon, name, symbol, price, high, low, supply, percentage) {
    // const coin_info = input.split(',');
    const coin_html = `<img src="${icon}" class="img-fluid my-2 py-3" alt=""></img>
                        <ul>
                        <li class="d-flex fd-row"><h6 class="text-info mx-2">Name: </h6><h6 class="text-light">${name}</h6></li>
                        <li class="d-flex fd-row"><h6 class="text-info mx-2">Price: </h6><h6 class="text-light">${arrow(percentage)}$${price}</h6></li>
                        <li class="d-flex fd-row"><h6 class="text-info mx-2">24 Hour High: </h6><h6 class="text-light">$${high}</h6></li>
                        <li class="d-flex fd-row"><h6 class="text-info mx-2">24 Hour Low: </h6><h6 class="text-light">$${low}</h6></li>
                        <li class="d-flex fd-row"><h6 class="text-info mx-2">Symbol: </h6><h6 class="text-light">${symbol}</h6></li>
                        <li class="d-flex fd-row"><h6 class="text-info mx-2">Supply:</h6><h6 class="text-light">${supply}</h6></li></ul>`;
    document.querySelector(DOM_Elements.clicked_coin).innerHTML = '';
    document.querySelector(DOM_Elements.clicked_coin).insertAdjacentHTML('beforeend', coin_html);
}
// Create the Coin List HTML

const create_list = ( symbol, icon, name, market) => {
    let supply = 0
    if(market.total_supply) {
        supply = market.total_supply
    } else {
        supply = 0
    }
    const html = `<tr>
                    <th scope="row">
                    <img src="${icon.thumb}" class="img-fluid p-1" style="height:30px; width:30px"></img></th>
                    <td class="symbol-col">${symbol}</td>
                    <td onclick="display_coin('${icon.large}','${name}','${symbol}',${market.current_price.usd},${market.high_24h.usd}, ${market.low_24h.usd}, ${supply}, ${market.price_change_percentage_24h})">
                    <a href="#">${name}</a></td>
                    <td>${arrow(market.price_change_percentage_24h)}$${market.current_price.usd}</td>
                    <td class="symbol-col">${supply}</td></tr>`;
    document.querySelector(DOM_Elements.coin_list).insertAdjacentHTML('beforeend', html);
    // onclick="show_info(${symbol})";
};

// Functions to load data and display the HTML


const load_coins = async () => {
    document.querySelector(DOM_Elements.coin_list).innerHTML = '';
    const coins = await getData();
    console.log(coins)
    document.querySelector(DOM_Elements.last_update).innerHTML = ''
    let update = "Last Updated: " + coins[0]["last_updated"].slice(11,19) + " " + " " + coins[0]["last_updated"].slice(0,10) + " UTC"
    document.querySelector(DOM_Elements.last_update).insertAdjacentHTML('beforeend', update)
    for(let x = 0; x < coins.length; x++){
        create_list(coins[x]['symbol'], coins[x]['image'], coins[x]['name'], coins[x].market_data)
    }
        
};

const clear_data = () => {
    document.querySelector(DOM_Elements.coin_list).innerHTML = '';
};

