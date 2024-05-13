// This data file should export all functions using the ES6 standard as shown in the lecture code
import {checkMonthandDay, checkNum, checkObject, checkPrice, checkState,
    checkString, trimAndCheckString, checkTime} from "../helpers.js";

import {ObjectId} from "mongodb";
import {events} from "../config/mongoCollections.js"
import * as emailValidator from "email-validator";


export const create = async (
  eventName,
  eventDescription,
  eventLocation,
  contactEmail,
  maxCapacity,
  priceOfAdmission,
  eventDate,
  startTime,
  endTime,
  publicEvent
) => {
  //Implement Code here
    let string_args = [eventName, eventDescription, contactEmail,
        eventDate, startTime, endTime];

    // Check string arguments
    for (let i of string_args) {
        checkString(i);
    }

    // Trim string arguments
    eventName = trimAndCheckString(eventName);
    eventDescription = trimAndCheckString(eventDescription);
    contactEmail = trimAndCheckString(contactEmail);
    eventDate = trimAndCheckString(eventDate);
    startTime = trimAndCheckString(startTime);
    endTime = trimAndCheckString(endTime);

    // If eventName is less than 5 characters, throw an error
    if (eventName.length < 5) throw "eventName input must be 5 or more characters";

    // If eventDescription is less than 25 characters, throw an error
    if (eventDescription.length < 25) throw "eventDescription input must be more than 25 characters";

    // If contactEmail is not a valid email, throw an error
    if (!emailValidator.validate(contactEmail)) throw "Contact email is not valid";
    if (!contactEmail.match(/^[a-zA-Z0-9]{1}[a-zA-Z0-9]*[_.-]?[a-zA-Z0-9]+@[A-Za-z0-9]+[.][a-z]{2,3}$/gi)) throw "Contact email is not valid";

    // If eventDate is not a valid date, throw an error
    if (!eventDate.match(/^[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/gi)) throw "Date format must be MM/DD/YYYY";
    let date = eventDate.split("/");
    checkMonthandDay(parseInt(date[0]), parseInt(date[1]));

    // If eventDate is not a future date, throw an error
    if (Date.parse(date) < Date.now()) throw "Only future events can be created";

    // If startTime or endTime is invalid, throw an error
    if (!startTime.match(/^([1-9]|1[012]):[0-5][0-9] ((AM)|(PM))$/gi)) throw "startTime input is invalid";
    if (!endTime.match(/^([1-9]|1[012]):[0-5][0-9] ((AM)|(PM))$/gi)) throw "endTime input is invalid";

    // Ensure start time is earlier than end time and end time is 30 mins after start time
    checkTime(startTime, endTime);

    // Capitalize pm and am in startTime and endTime
    startTime = startTime.toUpperCase();
    endTime = endTime.toUpperCase();

    // If publicEvent is not the expected type, throw an error
    if (typeof publicEvent !== "boolean") throw "Public event input must be boolean";

    // If maxCapacity or priceOfAdmission are invalid, throw an error
    checkNum(maxCapacity);
    if (maxCapacity <= 0 || !Number.isInteger(maxCapacity)) throw "Max capacity must be a positive, whole number";

    if (typeof priceOfAdmission !== "number") throw "Price of admission must be a number";
    if (priceOfAdmission < 0) throw "Price of admission must be positive";
    if (!checkPrice(priceOfAdmission)) throw "Price of admission must be an integer or a float with only 2 decimal places"

    // If eventLocation is not an object, throw an error
    checkObject(eventLocation);

    // If eventLocation information is not valid, throw an error
    checkString(eventLocation.streetAddress);
    checkString(eventLocation.city);
    checkString(eventLocation.state);
    checkString(eventLocation.zip);

    eventLocation.streetAddress = trimAndCheckString(eventLocation.streetAddress);
    eventLocation.city = trimAndCheckString(eventLocation.city);
    eventLocation.state = trimAndCheckString(eventLocation.state);
    eventLocation.zip = trimAndCheckString(eventLocation.zip);

    if (eventLocation.streetAddress.length < 3) throw "Street address of the event location object is invalid";
    if (eventLocation.city < 3) throw "City of the event location object is invalid";

    checkState(eventLocation.state);

    if (!eventLocation.zip.match(/^[0-9]{5}$/gi)) throw "Zip code in event location is not valid";

    //Do NOT forget to initalize attendees to be an empty array and totalNumberOfAttendees to 0 on event creation
    // Create event
    let newEvent = {
        eventName: eventName,
        description: eventDescription,
        eventLocation: eventLocation,
        contactEmail: contactEmail,
        maxCapacity: maxCapacity,
        priceOfAdmission: priceOfAdmission,
        eventDate: eventDate,
        startTime: startTime,
        endTime: endTime,
        publicEvent: publicEvent,
        attendees: [],
        totalNumberOfAttendees: 0
    };
    const eventCollection = await events();
    const eventInfo = await eventCollection.insertOne(newEvent);
    const eventID = eventInfo.insertedId.toString();

    const event = await get(eventID);
    return event;
};

export const getAll = async () => {
  //Implement Code here
    const eventCollection = await events();
    let eventList = await eventCollection.find({}, {projection: {_id: 1, eventName: 1}}).toArray();
    if (eventList === undefined) throw "Could not get all events";
    eventList = eventList.map((element) => {
        element._id = element._id.toString();
        return element;
    })
    return eventList;
};

export const get = async (eventId) => {
  //Implement Code here
    // Check that id is a valid string
    checkString(eventId);
    eventId = trimAndCheckString(eventId);gi

    // Check that the id is a valid object id
    if (!ObjectId.isValid(eventId)) throw "Input id is not a valid object id";

    // Get event
    const eventCollection = await events();
    const event = await eventCollection.findOne({_id: new ObjectId(eventId)});
    if (event === null) throw 'No event with that id';
    event._id = event._id.toString();
    return event;
};

export const remove = async (eventId) => {
  //Implement Code here
    // Check that id is a valid string
    checkString(eventId);
    eventId = trimAndCheckString(eventId);

    // Check that the id is a valid object id
    if (!ObjectId.isValid(eventId)) throw "Input id is not a valid object id";

    const eventCollection = await events();
    const deletedEvent = await eventCollection.findOneAndDelete({_id: new ObjectId(eventId)});

    if (!deletedEvent) throw "Event you are trying to delete does not exist";

    //if (deletedEvent.lastErrorObject.n === 0) throw `Could not delete event with id of ${id}`;
    let return_object = {
        eventName: deletedEvent.eventName,
        deleted: true
    };
    return return_object;
};

export const update = async (
  eventId,
  eventName,
  eventDescription,
  eventLocation,
  contactEmail,
  maxCapacity,
  priceOfAdmission,
  eventDate,
  startTime,
  endTime,
  publicEvent
) => {
  //Implement Code here
    let string_args = [eventName, eventDescription, contactEmail,
        eventDate, startTime, endTime];

    // Check string arguments
    for (let i of string_args) {
        checkString(i);
    }

    // Trim string arguments
    eventName = trimAndCheckString(eventName);
    eventDescription = trimAndCheckString(eventDescription);
    contactEmail = trimAndCheckString(contactEmail);
    eventDate = trimAndCheckString(eventDate);
    startTime = trimAndCheckString(startTime);
    endTime = trimAndCheckString(endTime);

    // If eventName is less than 5 characters, throw an error
    if (eventName.length < 5) throw "eventName input must be 5 or more characters";

    // If eventDescription is less than 25 characters, throw an error
    if (eventDescription.length < 25) throw "eventDescription input must be more than 25 characters";

    // If contactEmail is not a valid email, throw an error - NOT DONE
    if (!emailValidator.validate(contactEmail)) throw "Contact email is not valid";
    if (!contactEmail.match(/^[a-zA-Z0-9]{1}[a-zA-Z0-9]*[_.-]?[a-zA-Z0-9]+@[A-Za-z0-9]+[.][a-z]{2,3}$/gi)) throw "Contact email is not valid";

    // If eventDate is not a valid date, throw an error
    if (!eventDate.match(/^[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/gi)) throw "Date format must be MM/DD/YYYY";
    let date = eventDate.split("/");
    checkMonthandDay(parseInt(date[0]), parseInt(date[1]));

    // If eventDate is not a future date, throw an error
    if (Date.parse(date) < Date.now()) throw "Only future events can be created";

    // If startTime or endTime is invalid, throw an error
    if (!startTime.match(/^([1-9]|1[012]):[0-5][0-9] ((AM)|(PM))$/gi)) throw "startTime input is invalid";
    if (!endTime.match(/^([1-9]|1[012]):[0-5][0-9] ((AM)|(PM))$/gi)) throw "endTime input is invalid";

    // Ensure start time is earlier than end time and end time is 30 mins after start time
    checkTime(startTime, endTime);

    // Capitalize pm and am in startTime and endTime
    startTime = startTime.toUpperCase();
    endTime = endTime.toUpperCase();

    // If publicEvent is not the expected type, throw an error
    if (typeof publicEvent !== "boolean") throw "Public event input must be boolean";

    // If maxCapacity or priceOfAdmission are invalid, throw an error
    checkNum(maxCapacity);
    if (maxCapacity <= 0 || !Number.isInteger(maxCapacity)) throw "Max capacity must be a positive, whole number";

    if (typeof priceOfAdmission !== "number") throw "Price of admission must be a number";
    if (priceOfAdmission < 0) throw "Price of admission must be positive";
    if (!checkPrice(priceOfAdmission)) throw "Price of admission must be an integer or a float with only 2 decimal places"

    // If eventLocation is not an object, throw an error
    checkObject(eventLocation);

    // If eventLocation information is not valid, throw an error
    checkString(eventLocation.streetAddress);
    checkString(eventLocation.city);
    checkString(eventLocation.state);
    checkString(eventLocation.zip);

    eventLocation.streetAddress = trimAndCheckString(eventLocation.streetAddress);
    eventLocation.city = trimAndCheckString(eventLocation.city);
    eventLocation.state = trimAndCheckString(eventLocation.state);
    eventLocation.zip = trimAndCheckString(eventLocation.zip);

    if (eventLocation.streetAddress.length < 3) throw "Street address of the event location object is invalid";
    if (eventLocation.city < 3) throw "City of the event location object is invalid";

    checkState(eventLocation.state);

    if (!eventLocation.zip.match(/^[0-9]{5}$/gi)) throw "Zip code in event location is not valid";

    // Check eventID parameter
    if (!ObjectId.isValid(eventId)) throw "Event ID parameter is not a valid object ID"

    // Get the event
    const eventToUpdate = await get(eventId);

    // Created updated set
    let updatedEvent = {
        eventName: eventName,
        description: eventDescription,
        eventLocation: eventLocation,
        contactEmail: contactEmail,
        maxCapacity: maxCapacity,
        priceOfAdmission: priceOfAdmission,
        eventDate: eventDate,
        startTime: startTime,
        endTime: endTime,
        publicEvent: publicEvent,
        attendees: eventToUpdate.attendees,
        totalNumberOfAttendees: eventToUpdate.totalNumberOfAttendees
    }

    // Update the event
    const eventCollection = await events();
    const eventInfo = await eventCollection.findOneAndReplace(
        {_id: new ObjectId(eventId)},
        updatedEvent,
        {returnDocument: "after"});

    if (!eventInfo) throw "No event with that event ID exists";

    eventInfo._id = eventInfo._id.toString();
    return eventInfo;
};

export default {get, getAll, create, update, remove};