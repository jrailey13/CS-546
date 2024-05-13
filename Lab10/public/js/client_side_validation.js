// In this file, you must perform all client-side validation for every single form input
// (and the role dropdown) on your pages. The constraints for those fields are the same as they are for
// the data functions and routes. Using client-side JS, you will intercept the form's submit event when the
// form is submitted and If there is an error in the user's input or they are missing fields, you will not
// allow the form to submit to the server and will display an error on the page to the user informing them
// of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the
// login form. If the form being submitted has all valid data, then you will allow it to submit to the server
// for processing. Don't forget to check that password and confirm password match on the registration form!

function checkString(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
        throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (!isNaN(strVal))
        throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
}

function checkName(name, firstOrLast) {
    let regex = /^[a-zA-Z]+$/;
    if (!regex.test(name)) throw `Error: ${firstOrLast} must only contain letters!`;
    if (name.length < 2) throw `Error: ${firstOrLast} must be two or more characters!`;
    if (name.length > 25) throw `Error: ${firstOrLast} cannot be more than twenty-five characters!`;
}

function checkEmailAddress(email) {
    // If email address is not valid, throw an error
    if (!email.match(/^[a-zA-Z0-9]{1}[a-zA-Z0-9]*[_.-]?[a-zA-Z0-9]+@[A-Za-z0-9]+[.][a-z]{2,3}$/gi)) throw "Error: Email address is not valid";
}

function checkPassword(password) {
    if (password.length < 8) throw 'Password must be greater than eight characters!';
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!+=<>~#%*?&])[A-Za-z\d@$!+=<>~#%*?&]{8,}$/gi)) throw `Error: Password must contain at least one uppercase character, one special character, and one number`;
}

function checkRole(role) {
    role = role.toLowerCase();
    if (role !== 'user' && role !== 'admin') throw 'The only acceptable roles are user or admin';
}

$('#login-form').submit((event) => {
    let emailInput = $('#emailAddressInput').val();
    let passwordInput = $('#passwordInput').val();

    try {
        emailInput = checkString(emailInput, 'email address');
        passwordInput = checkString(passwordInput, 'password');

        checkEmailAddress(emailInput);

        checkPassword(passwordInput);
    } catch (e) {
        event.preventDefault();

        $('#login-error').show();
        $('#jquery-error').empty();
        $('#jquery-error').append(e);
    }
});

$('#registration-form').submit((event) => {
    let fName = $('#firstNameInput').val();
    let lName = $('#lastNameInput').val();
    let roleInput = $('#roleInput').val();
    let emailInput = $('#emailAddressInput').val();
    let passwordInput = $('#passwordInput').val();
    let confirmPasswordInput = $('#confirmPasswordInput').val()

    try {
        fName = checkString(fName, 'first name');
        lName = checkString(lName, 'last name');
        roleInput = checkString(roleInput, 'user role');
        emailInput = checkString(emailInput, 'email address');
        passwordInput = checkString(passwordInput, 'password');
        confirmPasswordInput = checkString(confirmPasswordInput, 'confirm password')

        checkName(fName, 'first');
        checkName(lName, 'last');

        checkRole(roleInput);

        checkEmailAddress(emailInput);

        checkPassword(passwordInput);

        if (!confirmPasswordInput) throw 'You must confirm your password.'
        if (passwordInput !== confirmPasswordInput) throw 'Passwords do not match!';
    } catch (e) {
        event.preventDefault();

        $('#registration-error').show();
        $('#jquery-error').empty();
        $('#jquery-error').append(e);
    }
});
