//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

import {ObjectId} from 'mongodb';
import * as emailValidator from 'email-validator';

const exportedMethods = {
    checkId(id, varName) {
        if (!id) throw `Error: You must provide a ${varName}`;
        if (typeof id !== 'string') throw `Error:${varName} must be a string`;
        id = id.trim();
        if (id.length === 0)
            throw `Error: ${varName} cannot be an empty string or just spaces`;
        if (!ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
        return id;
    },

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

    checkName(name, firstOrLast) {
        let regex = /^[a-zA-Z]+$/;
        if (!regex.test(name)) throw `Error: ${firstOrLast} must only contain letters!`;
        if (name.length < 2) throw `Error: ${firstOrLast} must be two or more characters!`;
        if (name.length > 25) throw `Error: ${firstOrLast} cannot be more than twenty-five characters!`;
    },

    checkEmailAddress(email) {
        // If email address is not valid, throw an error
        if (!emailValidator.validate(email)) throw "Error: Email address is not valid";
        if (!email.match(/^[a-zA-Z0-9]{1}[a-zA-Z0-9]*[_.-]?[a-zA-Z0-9]+@[A-Za-z0-9]+[.][a-z]{2,3}$/gi)) throw "Error: Email address is not valid";
    },

    checkPassword(password) {
        if (password.length < 8) throw 'Password must be greater than eight characters!';
        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!+=<>~#%*?&])[A-Za-z\d@$!+=<>~#%*?&]{8,}$/gi)) throw `Error: Password must contain at least one uppercase character, one special character, and one number`;
    },

    checkRole(role) {
        role = role.toLowerCase();
        if (role !== 'user' && role !== 'admin') throw 'The only acceptable roles are user or admin';
    }
};

export default exportedMethods;
