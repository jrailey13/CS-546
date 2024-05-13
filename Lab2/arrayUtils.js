/*
Jameson Railey
CS 546 - Lab 2
Three functions that pertain to arrays
*/

import {
    checkArray,
    checkNumsAndStrings,
    checkString,
    checkTriangle,
    findMean,
    findMedian,
    findMode
} from "./helper.js";

export const mergeCommonElements = (...args) => {
    // Check if arguments are supplied/valid - this line was received from Professor Hill on Slack
    if (!args) throw `${args}: Input is not supplied, is undefined, null, 0, false, '', or NaN`;

    // Check that there are at least two arguments
    if (!args.length >= 2) throw `${args}: You must pass in two or more arrays!`;

    for (let arg of args) {
        // Check if the arguments are arrays
        if (!Array.isArray(arg)) throw `${arg}: Arguments need to be arrays!`;

        // Check if arrays are empty
        if (arg.length < 1) throw `${arg}: Arrays cannot be empty`;

        // Check that the array only has strings and numbers
        if (!checkNumsAndStrings(arg)) throw `${arg}: Array elements must be numbers or strings and cannot not be NaN`;
    }

    let num_list = [];
    let alpha_list = [];
    let unique_list = [];

    // Iterate through each value in the first array
    for (let val of args[0].flat(Infinity)) {
        // Create a counter to count how many arrays the value is in
        let val_count = 1;
        // Iterate through each array after the first one
        for (let j = 1; j < args.length; j++) {
            // Check if the array contains the value in the first array
            if (args[j].flat(Infinity).includes(val)) {
                // If the array contains the value, increment the value count
                val_count += 1;
            }
        }
        // If the value count equals the number of arrays, that means the value is in every array
        if (val_count === args.length) {
            if (typeof val === "number") num_list.push(val);
            if (typeof val === "string") alpha_list.push(val);
        }
    }

    // Sort the lists and join them
    num_list.sort();
    alpha_list.sort();

    unique_list = num_list.concat(alpha_list);


    return unique_list;
}

export const findTriangles = (array) => {
    checkArray(array);

    // Ask
    // if (array.length <= 1) throw "There must be more than one triangle"

    let perimeter = 0;
    let area = 0;
    let result = {};
    let index = 0;
    let tri_type = "";

    for (let dimensions of array) {
        // Ensure each array in the array is valid
        checkArray(dimensions);

        // Check that the sides can form a valid triangle
        checkTriangle(dimensions);

        // Store each side of the triangle
        let a = parseFloat(dimensions[0]);
        let b = parseFloat(dimensions[1]);
        let c = parseFloat(dimensions[2]);

        // Calculate perimeter
        perimeter = a + b + c;

        // Use Heron's Formula to calculate area - https://www.cuemath.com/measurement/area-of-triangle-with-3-sides/
        let s = perimeter/2;
        area = Math.sqrt((s*(s-a)*(s-b)*(s-c)));

        // Round area to nearest hundreth - http://www.javascripter.net/faq/rounding.htm#:~:text=Rounding%20a%20Number%20in%20JavaScript,round()&text=round%20method%3A-,Math.,round%20X%20to%20hundredths%20Math.
        area = Math.round(area * 100) / 100;

        // Determine the type of the triangle
        if (a === b && a === c) tri_type = "equilateral";
        else if (a === b || b === c || a === c) tri_type = "isosceles";
        else tri_type = "scalene"

        // Add calculations to result object
        result[index] = [area, perimeter, tri_type];
        index += 1;

    }

    return result; //return result
}

export const stringMetrics = (array) => {
    // Check that the array is valid
    checkArray(array);

    // Check that there are two or more elements in the array
    if (array.length < 2) throw `${array}: There must be at least two strings in the array`;

    // Check that each array element is a valid string
    for (let string of array) {
        checkString(string);
        string = string.trim();
        checkString(string);
    }

    let string_metrics = {
        vowels: 0,
        consonants: 0,
        longest: [array[0]],
        shortest: [array[0]],
        mean: 0,
        median: 0,
        mode: 0
    }

    // Create an array to store the length of each string, so we can calculate mean, median, and mode
    let string_lengths = [];

    for (let i = 0; i < array.length; i++) {
        array[i] = array[i].toLowerCase();
        array[i] = array[i].trim();

        // Add the count of vowels in the string to the metrics object
        string_metrics["vowels"] += array[i].match(/[aeiou]/gi).length;

        // Add the count of consonants in the string to the metrics object - https://linuxgenie.net/3-ways-to-count-consonants-in-a-string-in-javascript/#:~:text=Conclusion-,To%20count%20consonants%20in%20a%20string%20in%20JavaScript%2C%20use%20the,in%20a%20string%20in%20JavaScript.
        string_metrics["consonants"] += array[i].match(/[bcdfghjklmnpqrstvwxyz]/gi).length;

        // Store the longest and shortest strings
        if (array[i].length > string_metrics["longest"][0].length)
            string_metrics["longest"] = [array[i]];
        else if (array[i].length === string_metrics["longest"][0].length && i !== 0)
            string_metrics["longest"].push(array[i]);
        if (array[i].length < string_metrics["shortest"][0].length)
            string_metrics["shortest"] = [array[i]];
        else if (array[i].length === string_metrics["shortest"][0].length && i !== 0)
            string_metrics["shortest"].push(array[i]);

        // Store string lengths in a separate array
        string_lengths.push(array[i].length);
    }

    if (string_metrics["longest"].length === 1)
        string_metrics["longest"] = string_metrics["longest"][0];
    if (string_metrics["shortest"].length === 1)
        string_metrics["shortest"] = string_metrics["shortest"][0];

    // Calculate mean, median, mode
    string_lengths.sort();
    // Create variables to store the total length of all strings and value counters for the mode
    let lengths_sum = 0;

    // Utilize helper functions to find mean, median, and mode
    string_metrics["mean"] = findMean(string_lengths);
    string_metrics["median"] = findMedian(string_lengths);
    string_metrics["mode"] = findMode(string_lengths);

    return string_metrics
}