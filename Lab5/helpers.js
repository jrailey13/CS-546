//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
import {ObjectId} from "mongodb";


const exportedMethods = {
    checkString(strVal, varName) {
        if (!strVal) throw `Error: You must supply a ${varName}!`;
        if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
        strVal = strVal.trim();
        if (strVal.length === 0)
            throw `Error: ${varName} cannot be an empty string or string with just spaces`;
        if (!isNaN(strVal))
            throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
        return strVal;
    },

    trimAndCheckString(string) {
        // Trim the string and check if it is still valid
        string = string.trim();
        if (!string) throw "String input is not supplied, is undefined, null, 0, false, '', or NaN";
        else return string;
    },

    checkId(id) {
        if (!id) throw 'Error: You must provide an id to search for';
        if (typeof id !== 'string') throw 'Error: id must be a string';
        id = id.trim();
        if (id.length === 0)
            throw 'Error: id cannot be an empty string or just spaces';
        if (!ObjectId.isValid(id)) throw 'Error: invalid object ID';
        return id;
    }
};

export default exportedMethods;
