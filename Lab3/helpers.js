//Todo You can use this file for any helper functions you may need. This file is optional and you don't have to use it if you do not want to.

import axios from "axios";

// Use axios to download authors.json
export async function getAuthors() {
    try {
        const {data} = await axios.get("https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json");
        return data;
    } catch(e) {
        console.log(e);
    }
}

// Use axios to download books.json
export async function getBooks() {
    try {
        const {data} = await axios.get("https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json");
        return data;
    } catch(e) {
        console.log(e);
    }
}
export const checkString = (string) => {
    // Make sure the string is valid and of the proper type
    if (!string) throw "String input is not supplied, is undefined, null, 0, false, '', or NaN";
    if (typeof string !== "string") throw "Input type must be a string";
}

export const trimAndCheckString = (string) => {
    // Trim the string and check if it is still valid
    string = string.trim();
    if (!string) throw "String input is not supplied, is undefined, null, 0, false, '', or NaN";
    else return string;
}

export const checkMonthandDay = (month, day) => {
    // Check that month and day are valid inputs
    if (!month) throw "Month is not supplied, is undefined, null, 0, false, '', or NaN";
    if (!day) throw "Day is not supplied, is undefined, null, 0, false, '', or NaN";

    // Check that month and day are numbers
    if (typeof month !== "number") throw "Month input must be a number";
    if (typeof day !== "number") throw "Day input must be a number";

    // Check that month and day are in the proper range
    if (month < 1 || month > 12) throw "Month number can only be between 1 and 12";
    let dayCounts = {1:31, 2:28, 3:31, 4:30, 5:31, 6:30, 7:31, 8:31, 9:30, 10:31, 11:30, 12:31};
    if (day < 1 || day > dayCounts[month]) throw `Day number is outside range for month ${month}`;
}

// Function used to sort by last name - code inspired from https://stackoverflow.com/questions/24173245/javascript-array-sort-by-last-name-first-name
export const compareNames = (name1, name2) => {
    // Split the names by space
    const nameList1 = name1.split(" ");
    const nameList2 = name2.split(" ");

    // get the last name from the full name
    const lastName1 = nameList1[nameList1.length - 1];
    const lastName2 = nameList2[nameList2.length - 1];

    // If they have the same last name, check their first names
    if (lastName1 === lastName2) {
        if (name1 < name2) return -1;
        if (name1 > name2) return 1;
    }
    // Otherwise, sort by last name
    else {
        if (lastName1 < lastName2) return -1;
        if (lastName1 > lastName2) return 1;
    }
}

export const checkMinMax = (min, max) => {
    // Check min and max
    if (min === 0) {
        if (typeof min !== "number") throw "Min value must be a number";
    }
    else {
        if (!min) throw "Min is not supplied, is undefined, null, 0, false, '', or NaN";
        if (typeof min !== "number") throw "Min value must be a number";
    }
    if (!max) throw "Max is not supplied, is undefined, null, 0, false, '', or NaN";
    if (typeof max !== "number") throw "Max value must be a number"

    if (min < 0 || max < 0) throw "Min and max values must be positive";
    if (min >= max) throw "Max price must be greater than min price";
}