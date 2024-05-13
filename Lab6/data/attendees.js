// This data file should export all functions using the ES6 standard as shown in the lecture code

import {checkString, trimAndCheckString} from "../helpers.js";
import {events} from "../config/mongoCollections.js"
import {ObjectId} from "mongodb";
import * as emailValidator from "email-validator";
import {get} from "./events.js";


const createAttendee = async (eventId, firstName, lastName, emailAddress) => {
  //Implement Code here
    checkString(eventId);
    checkString(firstName);
    checkString(lastName);
    checkString(emailAddress);

    eventId = trimAndCheckString(eventId);
    firstName = trimAndCheckString(firstName);
    lastName = trimAndCheckString(lastName);
    emailAddress = trimAndCheckString(emailAddress);

    // If eventID is not a valid ObjectID, throw an error
    if (!ObjectId.isValid(eventId)) throw "Event ID is not a valid object ID";

    // If email address is not valid, throw an error
    if (!emailValidator.validate(emailAddress)) throw "Contact email is not valid";
    if (!emailAddress.match(/^[a-zA-Z0-9]{1}[a-zA-Z0-9]*[_.-]?[a-zA-Z0-9]+@[A-Za-z0-9]+[.][a-z]{2,3}$/gi)) throw "Contact email is not valid";

    // Create attendee object
    const attendee = {
        _id: new ObjectId(), firstName: firstName, lastName: lastName, emailAddress: emailAddress
    };

    // If an event with that id does not exist, throw an error
    let event = await get(eventId);
    if (!event) throw "Cannot create an attendee because an event with that event ID does not exist";

    // If event is at max capacity
    if (event.totalNumberOfAttendees === event.maxCapacity) throw "Cannot create an attendee. The event is already at max capacity!"

    // If email address is already in attendees array
    if (event.attendees.filter(obj => obj.emailAddress === emailAddress).length > 0) throw "An attendee with that email address already exists!";

    const eventCollection = await events();
    const updatedEvent = await eventCollection.findOneAndUpdate(
        {_id: new ObjectId(eventId)},
        {$push: {attendees: attendee}, $inc: {totalNumberOfAttendees: 1}},
        {returnDocument: "after"}
    );

    return updatedEvent;
};

const getAllAttendees = async (eventId) => {
  //Implement Code here
    // Check and trim eventId string
    checkString(eventId);
    eventId = trimAndCheckString(eventId);

    // Check that eventId is a valid objectId
    if (!ObjectId.isValid(eventId)) throw "Event Id is not a valid object id";

    let eventCollection = await events();

    // Project attendees from the corresponding event
    const event = await eventCollection.find({_id: new ObjectId(eventId)}).toArray();
    if (!event) throw "There is no event with that event id";

    let attendees = event[0].attendees;
    return attendees;
};

const getAttendee = async (attendeeId) => {
    //Implement Code here
    // Check and trim attendee id
    checkString(attendeeId);
    attendeeId = trimAndCheckString(attendeeId);

    // Check that attendee id is a valid attendee id
    if (!ObjectId.isValid(attendeeId)) throw "attendeeId is not a valid object id";

    const eventCollection = await events();

    // Find the event with the attendee id and project the appropriate fields
    const event = await eventCollection.find({'attendees._id': new ObjectId(attendeeId)}).toArray();

    if (!event) throw "Could not find an event that contains that attendee id";

    let attendee = event[0].attendees.filter(obj => obj._id.toString() === attendeeId);

    if (!attendee) throw "Attendee with that attendee id does not exist"

    return attendee[0];
};

const removeAttendee = async (attendeeId) => {
    //Implement Code here
    // Check and trim attendee id
    checkString(attendeeId);
    attendeeId = trimAndCheckString(attendeeId);

    // Check that attendee id is a valid attendee id
    if (!ObjectId.isValid(attendeeId)) throw "attendeeId is not a valid object id";

    // Load in events
    const eventCollection = await events();

    // Get the attendee we are going to remove
    let attendee = await getAttendee(attendeeId);

    // Find the event with the attendee id and project the appropriate fields
    let event = await eventCollection.findOneAndUpdate({'attendees._id': new ObjectId(attendeeId)},
        {$pull: {attendees: attendee}, $inc: {totalNumberOfAttendees: -1}},
        {returnDocument: "after"});

    if (!event) throw "No event with that attendee id";

    return event;
};

export default {createAttendee, getAllAttendees, getAttendee, removeAttendee};
