/*
Jameson Railey
CS 546 - Lab 2
Three functions that pertain to strings
*/

import {checkStock, checkString} from "./helper.js";

export const emojiCounter = (message) => {
    message = message.trim();
    checkString(message);

    // Split the contents of message by the colon
    let emojis = message.split(":");

    // Trim any extra space between colons - code line inspired by https://stackoverflow.com/questions/19293997/javascript-apply-trim-function-to-each-string-in-an-array
    emojis = emojis.map(emoji => emoji.trim());

    // Join the message back together now that extra spaces are removed
    message = emojis.join(":");

    let count = message.match(/:([^:]+):/gi);

    if (count === null) return 0;
    else return count.length;
}

export const sortStockPrices = (lastStocks, currStocks) => {
    lastStocks = lastStocks.trim();
    currStocks = currStocks.trim();

    checkString(lastStocks);
    checkString(currStocks);

    // Split both sets of stocks by the | symbol
    let lastStockList = lastStocks.split("|");
    let currStockList = currStocks.split("|");

    // Make sure there is more than one stock and that there are the same amount of stocks in each input
    if (lastStockList.length < 2 || currStockList.length < 2) throw `${lastStockList}, ${currStockList}: There must be more than one stock`;
    if (lastStockList.length !== currStockList.length) throw `${lastStockList}, ${currStockList}: There must be the same amount of current and previous stocks`;

    let lastStockInfo = {};

    let currStockInfo = {};

    // For each stock in the list of previous stocks
    for (let stock of lastStockList) {
        // Ensure the stock ticker and stock price are valid
        checkStock(stock);

        // Store the stock ticker and stock price
        let lastStockTicker = stock.split(",")[0].toUpperCase();
        let lastStockPrice = parseFloat(stock.split(",")[1]);

        // Append the stock ticker and stock price to stock info object
        lastStockInfo[lastStockTicker] = lastStockPrice;
    }

    // For each stock in the list of current stocks
    for (let stock of currStockList) {
        // Ensure the stock ticker and stock price are valid
        checkStock(stock);

        let currStockTicker = stock.split(",")[0].toUpperCase();
        let currStockPrice = parseFloat(stock.split(",")[1]);

        // Append the stock ticker and stock price to current stock info object
        currStockInfo[currStockTicker] = currStockPrice;
    }

    // If the lists of stock tickers are not the same, then we have different stocks
    for (let ticker of Object.keys(lastStockInfo)) {
        if (!Object.keys(currStockInfo).includes(ticker)) {
            throw `${lastStockInfo},${currStockInfo}: The stocks in each input string must be the same`;
        }
    }

    // If the set of stock tickers is not the same length as the array of stock tickers, that means there is a duplicate ticker in the input
    if (new Set(Object.keys(lastStockInfo)).size !== Object.keys(lastStockInfo).length) throw `${lastStockInfo}: There cannot be duplicate stocks`;
    if (new Set(Object.keys(currStockInfo)).size !== Object.keys(currStockInfo).length) throw `${currStockInfo}: There cannot be duplicate stocks`;

    // Create an array to store the final stock objects
    let finalStockInfo = [];

    // For each key in the last stock object
    for (let key of Object.keys(lastStockInfo)) {
        // Create stock info object
        let stockInfoObject = {};
        // Update the stock ticker, current price, and percent change and push it to the finalStockInfo
        stockInfoObject["symbol"] = key;
        stockInfoObject["price"] = currStockInfo[key];
        stockInfoObject["change"] = Math.round((((currStockInfo[key] - lastStockInfo[key])/lastStockInfo[key]) * 100) * 1e1) / 1e1;
        finalStockInfo.push(stockInfoObject);
    }

    return finalStockInfo;
}

export const mashUp = (string1, string2) => {
    // Check if strings exists and are strings
    checkString(string1);
    checkString(string2);

    // Trim the strings
    string1 = string1.trim()
    string2 = string2.trim();

    // Make sure the strings are still defined
    checkString(string1);
    checkString(string2);

    // Check that each string is 4 or more characters
    if (string1.length < 4 || string2.length < 4) throw `${string1}, ${string2}: Input strings must contain four or more characters`;

    // Collect the first four characters of each input string
    let substring1 = string1.substring(0,4);
    let substring2 = string2.substring(0,4);

    // Create the new strings composed of the substring and all characters after the fourth one
    string1 = substring2 + string1.slice(4);
    string2 = substring1 + string2.slice(4);

    return string1 + " " + string2;
}
