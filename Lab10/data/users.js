//import mongo collections, bcrypt and implement the following data functions
import {users} from '../config/mongoCollections.js'
import helpers from '../helpers.js'
import bcrypt from 'bcrypt'
import {ObjectId} from "mongodb";

export const registerUser = async (
  firstName,
  lastName,
  emailAddress,
  password,
  role
) => {
    // Ensure all inputs are strings
    firstName = helpers.checkString(firstName, "first name");
    lastName = helpers.checkString(lastName, "last name");
    emailAddress = helpers.checkString(emailAddress, "email address");
    password = helpers.checkString(password, "password");
    role = helpers.checkString(role,"role");

    // Use helper functions to ensure all user data is valid
    helpers.checkName(firstName, 'first name');
    helpers.checkName(lastName, 'last name');
    helpers.checkEmailAddress(emailAddress);
    helpers.checkPassword(password);
    helpers.checkRole(role);

    // Make email address and role lower case
    emailAddress = emailAddress.toLowerCase();
    role = role.toLowerCase();

    // Create a hash to store for password
    const hash = await bcrypt.hash(password, 16);

    let newUser = {
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        password: hash,
        role: role
    }
    const userCollection = await users();
    // If there is already a user with that email address throw and error
    let user = await userCollection.find({emailAddress: emailAddress}).toArray();
    if (user.length > 0) throw "A user with that email address already exists.";
    const userData = await userCollection.insertOne(newUser);
    if (!userData.acknowledged || !userData.insertedId) throw "Unable to register user";

    return {insertedUser: true}
};

export const loginUser = async (emailAddress, password) => {
    emailAddress = helpers.checkString(emailAddress, "Email address");
    password = helpers.checkString(password, "password");

    // Make sure email address is in valid format and lowercase
    helpers.checkEmailAddress(emailAddress);
    emailAddress = emailAddress.toLowerCase();

    helpers.checkPassword(password);

    const userCollection = await users();
    let user = await userCollection.find({emailAddress: emailAddress}).toArray();

    if (user.length === 0) throw 'No account found. Either the username or password is invalid, or you need to register using the link below.';

    // Compare password and hash
    let passwordCompare = bcrypt.compare(password, user[0].password);
    if (!passwordCompare) throw 'Either the email address or password is invalid';

    return {firstName: user[0].firstName,
        lastName: user[0].lastName,
        emailAddress: user[0].emailAddress,
        role: user[0].role};
};
