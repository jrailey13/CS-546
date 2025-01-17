import md5 from 'blueimp-md5'

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

    checkId(idVal, varName) {
        if (!idVal) throw `Error: You must supply a ${varName}!`;
        if (typeof idVal !== 'string') throw `Error: ${varName} must be a string!`;
        idVal = idVal.trim();
        if (idVal.length === 0)
            throw `Error: ${varName} cannot be an empty string or string with just spaces`;
        return idVal;
    }
}

export default exportedMethods;