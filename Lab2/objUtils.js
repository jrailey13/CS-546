// Three functions that work with objects

import {checkArray, checkObject, checkPokerHand, checkPuzzlePieces, determinePokerHand} from "./helper.js";

export const solvePuzzles = (puzzles, pieces) => {
    checkArray(puzzles);
    if (puzzles.length < 1) throw `${puzzles}: There must be at least one puzzle supplied`
    for (let p of puzzles) {
        checkObject(p);
        if (Object.keys(p).length < 1) throw `${puzzles}: Throw there must be at least one key/value pair in each puzzle object`;
        checkPuzzlePieces(p);
    }

    checkObject(pieces);
    // If the pieces object doesn't have any keys/values throw an error
    if (Object.keys(pieces).length < 1) throw `${Object.keys(pieces)}: There must be at least one key/value pair in the pieces object`;
    // If the pieces object does not have five pieces, throw an error
    if (Object.keys(pieces).length !== 5) throw `${Object.keys(pieces)}: There must be five keys in the pieces object`;
    checkPuzzlePieces(pieces);

    for (let key of Object.keys(pieces)) {
        for (let p of puzzles) {
            if (!Object.keys(p).includes(key)) {
                p[key] = pieces[key];
            }
        }
    }

    return puzzles;
}

export const evaluatePokerHand = (hand, communityCards) => {
    checkPokerHand(hand);
    if (hand.length !== 2) throw `${hand}: A poker hand can only have two cards`;

    checkPokerHand(communityCards);
    if (communityCards.length < 3 || communityCards.length > 5) throw `${communityCards}: The community card pile must contain between three and five cards`;

    return determinePokerHand(hand, communityCards);
}

export const combineObjects = (array) => {
    // Check that the array is valid and has two objects in it
    checkArray(array)
    if (array.length < 2) throw `${array}: Input array must contain two objects`;

    for (let obj of array) {
        // Check each object in the array and ensure the object has at least one key/value pair
        checkObject(obj);
        if (Object.keys(obj).length < 1) throw `${obj}: Each object must contain at least one key/value`;


        for (let key of Object.keys(obj)) {
            // Trim the key and make sure it exists
            key = key.trim();
            if (!key) throw `${key}: One of the objects contains an invalid key`;
        }
    }

    // Create an array that will store all the keys
    let all_keys = [];

    // Create a result object that will store the final result
    let result = {};

    // For each object in the input array
    for (let obj of array) {
        // For each key in the object
        for (let key of Object.keys(obj)) {
            // Add the key to all keys array
            all_keys.push(key);
        }
    }
    // Sort all keys so they are in order and we can count them
    all_keys.sort();

    // If a set of the keys is equal to the array of all keys, then we know there are no duplicates and will not have anything to return
    if (new Set(all_keys).size === all_keys.length) return result;
    else {
        // Create a counter to determine if the key is in every object
        let key_counter = 1;
        // Iterate through each key
        for (let i = 0; i < all_keys.length; i++) {
            // If it is the last key in the array, pass through
            if (i === (all_keys.length - 1)) continue;
            // If the current key is equal to the next one add one to key counter
            else if (all_keys[i] === all_keys[i+1]) {
                key_counter += 1;
                // If the key counter equals the number of objects, we know it's in every object
                if (key_counter === array.length) {
                    // Add the key to the result object
                    result[all_keys[i]] = [];
                }
            } else {
                // Reset the counter to one
                key_counter = 1;
            }
        }
    }

    // For each key in the result object
    for (let key of Object.keys(result)) {
        // For each object in the input array
        for (let obj of array) {
            // Push the value of the key from the input object that matches the key in the result object
            result[key].push(obj[key]);
        }
    }
    return result;
}