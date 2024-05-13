// You can add and export any helper functions you want here - if you aren't using any, then you can just leave this file as is
import moment from 'moment';


export const checkString = (string) => {
    // Make sure the string is valid and of the proper type
    if (!string) throw `A string input is not supplied, is undefined, null, 0, false, '', or NaN`;
    if (typeof string !== "string") throw `Input must be a string`;
}

export const trimAndCheckString = (string) => {
    // Trim the string and check if it is still valid
    string = string.trim();
    if (!string) throw "String input is not supplied, is undefined, null, 0, false, '', or NaN";
    return string;
}

export const checkNum = (num) => {
    // Check if input is a number or string
    if (!num) throw "Either max capacity or price of admission is invalid";
    if (typeof num !== "number") throw "Max capacity and price of admission must be numbers";
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

export const checkPrice = (num) => {
    if (Number.isInteger(num)) return true;
    else {
        let num_string = num.toString();
        let split_num = num_string.split(".");
        // This line prevents error in the next line if there is no decimal point
        if (!split_num[1]) return false;
        else return split_num[1].length === 2;
    }
}

export const checkObject = (object) => {
    if (!object) throw `${object}: object is not supplied, is undefined, null, 0, false, '', or NaN`;

    // Make sure the object is not actually an array
    if (Array.isArray(object)) throw `${object}: Input must be an object, but an array was supplied`;

    // Check that the object is an object
    if (typeof object !== 'object') throw `${object}: Input must be an object!`;
}

export const checkState = (state) => {
    let states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN',
        'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM',
        'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV',
        'WI', 'WY'];
    if (!states.includes(state.toUpperCase())) throw "State in event location must be a two letter, capitalized abbreviation of the state";
}

export const checkTime = (startTime, endTime) => {
    if (moment(startTime, "LT") >= moment(endTime, "LT")) throw "Start time cannot be later than, or the same as, the end time";

    let updatedEndTime = moment(endTime, "LT").subtract(30, "minutes");

    if (updatedEndTime < moment(startTime, "LT")) throw "End time must be at least 30 minutes after start time";
}