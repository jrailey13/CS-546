// A file to hold all the helper functions I use in Lab 2

export const checkNumsAndStrings = (array) => {
    // Check if input is a number or string
    for (let val of array) {
        if (typeof val === "string" || typeof val === "number") return true;
        else if (!isNaN(val)) return true;
    }
}

export const checkArray = (array) => {
    if (!array) throw `${array} is not supplied, is undefined, null, 0, false, '', or NaN`;
    if (!Array.isArray(array)) throw `${array}: Input must be an array`;
}

export const checkTriangle = (array) => {
    for (let side of array) {
        // Ensure the triangle array contains only numbers
        if (!side) throw `${side}: Side of triangle is not supplied, undefined, null, 0, false, '', or NaN`;
        if (typeof side !== "number") throw `${side}: Triangle lengths must be numbers`;
    }

    // Check that the triangle is valid
    let a = array[0];
    let b = array[1];
    let c = array[2];

    if (a + b <= c) throw `${array}: This is not a valid triangle`;
    if (b + c <= a) throw `${array}: This is not a valid triangle`;
    if (a + c <= b) throw `${array}: This is not a valid triangle`;
}

export const checkString = (string) => {
    if (!string) throw `${string}: A string element is not supplied, undefined, null, 0, false, '', or NaN`;
    if (typeof string !== "string") throw `${string}: Something other than a string was supplied`;
}

export const findMean = (array) => {
    let total_sum = 0;
    for (let val of array) {
        total_sum += val;
    }

    return ((total_sum / array.length) * 100) / 100;
}
export const findMedian = (array) => {
    let median = 0;

    // Create a variable to store the midpoint of the string_lengths array
    let midpoint = array.length / 2;

    // Find median for an even number of values in string_lengths
    if (array.length % 2 === 0)
        median = (array[midpoint] + array[midpoint - 1]) / 2;
    // Find median for an odd number of values in string_lengths
    else
        median = array[Math.floor(midpoint)];

    return median;
}

export const findMode = (array) => {
    // Create object to hold values in array
    let val_counter = {};

    // Store the values in the array and their counts
    for (let val of array) {
        if (!val_counter[val])
            val_counter[val] = 1;
        else
            val_counter[val] += 1;
    }

    // Create variables to store mode, multiple modes, and value frequency
    let mode = 0;
    let top_count = 1;
    let mode_list = [];

    // Iterate through each key of the object
    for (let val in val_counter) {
        // If the value stored at that key is greater than top count, assign it to the mode and clear any previous values stored as the node
        if (val_counter[val] > top_count) {
            top_count = val_counter[val];
            mode = parseInt(val);
            mode_list = []
            mode_list.push(mode);
        }
        // If the value stored at the key is equal to the mode, push it into our list of modes
        else if (val_counter[val] === top_count) {
            mode_list.push(parseInt(val));
        }
    }
    // Sort the modes
    for (let i = 0; i < mode_list.length; i++) {
        if (i === (mode_list.length - 1)) continue;
        else if (mode_list[i] > mode_list[i+1]) {
            let temp = mode_list[i];
            mode_list[i] = mode_list[i+1];
            mode_list[i+1] = temp;
        }
    }

    // If the mode list is the same size as the number of keys in the object, then we know all modes are the same, so there isn't one
    if (mode_list.length === Object.keys(val_counter).length) return null;
    // If there is more than one mode, return them
    else if (mode_list.length > 1) return mode_list;
    // If the above are not true, return the mode
    else return mode;
}

export const checkStock = (stock) => {
    let stockTicker = stock.split(",")[0];
    let stockPrice = stock.split(",")[1];

    stockTicker = stockTicker.trim();
    stockPrice = stockPrice.trim();

    checkString(stockTicker);
    checkString(stockPrice);

    // Ensure the stock ticker is composed of only 1-5 letters, inspired by https://stackoverflow.com/questions/7838240/regex-to-match-only-5-letter-words
    if (stockTicker.search(/^([A-Za-z]){1,5}$/) !== 0) throw `${stockTicker}: Invalid stock ticker or improper order`;

    // Ensure the stock price is in proper format, inspired by https://stackoverflow.com/questions/4690986/regex-needed-to-match-number-to-exactly-two-decimal-places
    if (stockPrice.search(/^[0-9]*\.[0-9][0-9]$/) !== 0) throw `${stockPrice}: Invalid stock price or improper order`;

    // Ensure the stock price is a valid number
    if (typeof parseFloat(stockPrice) !== "number") throw `${stockPrice}: Stock price is not a valid number`;
}

export const checkObject = (object) => {
    if (!object) throw `${object}: object is not supplied, is undefined, null, 0, false, '', or NaN`;

    // Make sure the object is not actually an array
    if (Array.isArray(object)) throw `${object}: Input must be an object, but an array was supplied`;

    // Check that the object is an object
    if (typeof object !== 'object') throw `${object}: Input must be an object!`;
}

export const checkPuzzlePieces = (obj) => {
    let valid_puzzle_keys = ["a", "b", "c", "d", "e"];

    for (let key of Object.keys(obj)) {
        // If the key is not a valid puzzle piece throw an error
        if (!valid_puzzle_keys.includes(key)) throw `${Object.keys(obj)}: Puzzle pieces must have a key of a,b,c,d or e`;
        // Check that there are not duplicate keys in the object - code line received from https://dev.to/will_devs/javascript-how-to-check-if-an-array-has-duplicate-values-cha
        if (new Set(Object.keys(obj)).size !== Object.keys(obj).length) throw `${Object.keys(obj)}: There can only be one of each type of puzzle piece in each puzzle object`;
    }
}

export const checkPokerHand = (cards) => {
    checkArray(cards);

    // Create arrays that store valid suits and card values
    const card_suits = ["hearts", "clubs", "diamonds", "spades"];
    const card_values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

    for (let obj of cards) {
        checkObject(obj);
        if (Object.keys(obj).length !== 2) throw `${Object.keys(obj)}: Each card must have a suit and a value, nothing more or less`;
        if (!Object.keys(obj).includes("suit") || !Object.keys(obj).includes("value")) throw `${Object.keys(obj)}: Each card can only have a suit and a value, nothing else`;

        // Clean up the suit string and make sure it is in the list of valid suits
        obj["suit"] = obj["suit"].trim();
        checkString(obj["suit"]);
        obj["suit"] = obj["suit"].toLowerCase();
        if (!card_suits.includes(obj["suit"])) throw `${obj["suit"]}: Card suit must be hearts, clubs, diamonds, or spades`;

        // Clean up the card value string and make sure it is in the list of valid values
        obj["value"] = obj["value"].trim();
        checkString(obj["value"]);
        if (!card_values.includes(obj["value"])) throw `${obj["value"]}: Card values can only be 2,3,4,5,6,7,8,9,10,J,Q,K, or A`
    }
}

    export const determinePokerHand = (hand, communityCards) => {
        // Assign each card a value
        const card_values = {
            "A": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10,
            "J": 11, "Q": 12, "K": 13
        };
        let suit_counts = {"hearts": 0, "diamonds": 0, "clubs": 0, "spades": 0};

        // Store possible hands in an array
        const possible_hands = ["High Card", "Pair", "Three of a Kind", "Straight Flush"]

        // Merge hand and community cards into one array - https://dmitripavlutin.com/javascript-merge-arrays/
        let all_cards = [...hand, ...communityCards];


        // Count suits to determine if we might have a straight flush
        for (let card of all_cards) {
            suit_counts[card["suit"]] += 1;
        }
        // Could have a straight flush if this is true
        if (Object.values(suit_counts).includes(5) || Object.values(suit_counts).includes(6) || Object.values(suit_counts).includes(7)) {
            let suit = "";
            // If the suit count is greater than 5, store that suit value because that is the only one we need to check for
            for (let key of Object.keys(suit_counts)) {
                if (suit_counts[key] >= 5) {
                    suit = key;
                }
            }
            // For each card in play, if the card has the right suit, push it to the suit_values list
            let suit_values = [];
            for (let obj of all_cards) {
                if (obj["suit"] === suit) {
                    // If the card value is an ace, we need to add both one and 14 to the suit_values list
                    if (obj["value"] === "A") suit_values.push(14);
                    suit_values.push(card_values[obj["value"]]);
                }
            }
            suit_values.sort();

            // Sort the card values numerically
            for (let i = 0; i < suit_values.length; i++) {
                if (i === (suit_values.length - 1)) continue;
                else if (suit_values[i] > suit_values[i+1]) {
                    let temp = suit_values[i];
                    suit_values[i] = suit_values[i+1];
                    suit_values[i+1] = temp;
                }
            }

            // Determine if there is a straight
            let straight_counter = 1;
            for (let i = 0; i < suit_values.length; i++) {
                if (i === (suit_values.length - 1)) continue;
                else if (suit_values[i] === (suit_values[i+1] - 1)) {
                    straight_counter += 1;
                }
                else {
                    straight_counter = 1;
                }
                // If there is a straight, return straight flush
                if (straight_counter >= 5) return "Straight Flush";
            }
        }

        // Check for three of a kind and two of a kind
        let hand_values = [];
        for (let obj of all_cards) {
            hand_values.push(card_values[obj["value"]]);
        }
        hand_values.sort();
        // Count the number of repeat cards there are to know if we have a three of a kind or pair
        let repeat_counter = 1;
        let top_counter = 0;
        for (let i = 0; i < hand_values.length; i++) {
            if (i === (hand_values.length - 1)) continue;
            else if (hand_values[i] === (hand_values[i + 1])) {
                repeat_counter += 1;
                if (repeat_counter > top_counter) top_counter = repeat_counter;
            } else {
                repeat_counter = 1;
            }
        }
        if (top_counter >= 3) return "Three of a Kind";
        else if (top_counter === 2) return "Pair";
        else return "High Card"
}