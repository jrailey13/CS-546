// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import {Router} from "express";
const router = Router();
import {eventData} from "../data/index.js";
import {
    checkMonthandDay,
    checkNum,
    checkObject,
    checkPrice, checkState,
    checkString,
    checkTime,
    trimAndCheckString
} from "../helpers.js"
import {ObjectId} from "mongodb";
import * as emailValidator from "email-validator";


router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    try {
      const eventList = await eventData.getAll();
      return res.json(eventList);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  })
  .post(async (req, res) => {
    //code here for POST
    const eventInfo = req.body;
    // make sure there is something in the event body
    if (!eventInfo || Object.keys(eventInfo).length === 0) {
      return res
          .status(400)
          .json({error: "There are no fields in the request body"});
    }

    // Error check user inputs
    try {
        // Check string arguments
        checkString(eventInfo.eventName);
        checkString(eventInfo.description);
        checkString(eventInfo.contactEmail);
        checkString(eventInfo.eventDate);
        checkString(eventInfo.startTime);
        checkString(eventInfo.endTime);


        // Trim string arguments
        eventInfo.eventName = trimAndCheckString(eventInfo.eventName);
        eventInfo.description = trimAndCheckString(eventInfo.description);
        eventInfo.contactEmail = trimAndCheckString(eventInfo.contactEmail);
        eventInfo.eventDate = trimAndCheckString(eventInfo.eventDate);
        eventInfo.startTime = trimAndCheckString(eventInfo.startTime);
        eventInfo.endTime = trimAndCheckString(eventInfo.endTime);

        // If eventName is less than 5 characters, throw an error
        if (eventInfo.eventName.length < 5) throw "eventName input must be 5 or more characters";

        // If eventDescription is less than 25 characters, throw an error
        if (eventInfo.description.length < 25) throw "eventDescription input must be more than 25 characters";

        // If contactEmail is not a valid email, throw an error
        if (!emailValidator.validate(eventInfo.contactEmail)) throw "Contact email is not valid";
        if (!eventInfo.contactEmail.match(/^[a-zA-Z0-9]{1}[a-zA-Z0-9]*[_.-]?[a-zA-Z0-9]+@[A-Za-z0-9]+[.][a-z]{2,3}$/gi)) throw "Contact email is not valid";

        // If eventDate is not a valid date, throw an error
        if (!eventInfo.eventDate.match(/^[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/gi)) throw "Date format must be MM/DD/YYYY";
        let date = eventInfo.eventDate.split("/");
        checkMonthandDay(parseInt(date[0]), parseInt(date[1]));

        // If eventDate is not a future date, throw an error
        if (Date.parse(date) < Date.now()) throw "Only future events can be created";

        // If startTime or endTime is invalid, throw an error
        if (!eventInfo.startTime.match(/^([1-9]|1[012]):[0-5][0-9] ((AM)|(PM))$/gi)) throw "startTime input is invalid";
        if (!eventInfo.endTime.match(/^([1-9]|1[012]):[0-5][0-9] ((AM)|(PM))$/gi)) throw "endTime input is invalid";

        // Ensure start time is earlier than end time and end time is 30 mins after start time
        checkTime(eventInfo.startTime, eventInfo.endTime);

        // If publicEvent is not the expected type, throw an error
        if (typeof eventInfo.publicEvent !== "boolean") throw "Public event input must be boolean";

        // If maxCapacity or priceOfAdmission are invalid, throw an error
        checkNum(eventInfo.maxCapacity);
        if (eventInfo.maxCapacity <= 0 || !Number.isInteger(eventInfo.maxCapacity)) throw "Max capacity must be a positive, whole number";

        if (typeof eventInfo.priceOfAdmission !== "number") throw "Price of admission must be a number";
        if (eventInfo.priceOfAdmission < 0) throw "Price of admission must be positive";
        if (!checkPrice(eventInfo.priceOfAdmission)) throw "Price of admission must be an integer or a float with only 2 decimal places"

        // If eventLocation is not an object, throw an error
        checkObject(eventInfo.eventLocation);

        // If eventLocation information is not valid, throw an error
        checkString(eventInfo.eventLocation.streetAddress);
        checkString(eventInfo.eventLocation.city);
        checkString(eventInfo.eventLocation.state);
        checkString(eventInfo.eventLocation.zip);

        eventInfo.eventLocation.streetAddress = trimAndCheckString(eventInfo.eventLocation.streetAddress);
        eventInfo.eventLocation.city = trimAndCheckString(eventInfo.eventLocation.city);
        eventInfo.eventLocation.state = trimAndCheckString(eventInfo.eventLocation.state);
        eventInfo.eventLocation.zip = trimAndCheckString(eventInfo.eventLocation.zip);

        if (eventInfo.eventLocation.streetAddress.length < 3) throw "Street address of the event location object is invalid";
        if (eventInfo.eventLocation.city < 3) throw "City of the event location object is invalid";

        checkState(eventInfo.eventLocation.state);

        if (!eventInfo.eventLocation.zip.match(/^[0-9]{5}$/gi)) throw "Zip code in event location is not valid";
    } catch (e) {
        return res.status(400).json({error: e});
    }

    // Try to create the event
    try {
        const newEvent = await eventData.create(
            eventInfo.eventName,
            eventInfo.description,
            eventInfo.eventLocation,
            eventInfo.contactEmail,
            eventInfo.maxCapacity,
            eventInfo.priceOfAdmission,
            eventInfo.eventDate,
            eventInfo.startTime,
            eventInfo.endTime,
            eventInfo.publicEvent
        );
        return res.status(200).json(newEvent);
    } catch (e) {
        return res.status(400).json({error: e});
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    //code here for GET
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({error: "URL Event ID is invalid"});

    try {
        const eventInfo = await eventData.get(req.params.id);
        return res.status(200).json(eventInfo);
    } catch (e) {
        return res.status(404).json({error: "Event with that ID not found"});
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
      if (!ObjectId.isValid(req.params.id)) return res.status(400).json({error: "URL Event ID is invalid"});

      try {
          const eventInfo = await eventData.remove(req.params.id);
          return res.status(200).json(eventInfo);
      } catch (e) {
          return res.status(404).json({error: "An event with that event id doesn't exist"})
      }
  })
  .put(async (req, res) => {
    //code here for PUT
    let eventInfo = req.body;
    // If no fields in the request body have valid values, throw an error
    if (!eventInfo || Object.keys(eventInfo).length === 0) {
        return res
            .status(400)
            .json({error: 'There are no fields in the request body'});
    }

    // If the event id url param is invalid, return 400 status code
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({error: "Event ID URL parameter is invalid"});

    // If the event does not exist, throw an error
    try {
        let tempEvent = await eventData.get(req.params.id);
        if (!tempEvent) throw "An event with that event id does not exist";
    } catch (e) {
        return res.status(404).json({error: e});
    }

    // Perform error checking on URL parameters
    try {
        // Check string arguments
        checkString(eventInfo.eventName);
        checkString(eventInfo.description);
        checkString(eventInfo.contactEmail);
        checkString(eventInfo.eventDate);
        checkString(eventInfo.startTime);
        checkString(eventInfo.endTime);

        // Trim string arguments
        eventInfo.eventName = trimAndCheckString(eventInfo.eventName);
        eventInfo.description = trimAndCheckString(eventInfo.description);
        eventInfo.contactEmail = trimAndCheckString(eventInfo.contactEmail);
        eventInfo.eventDate = trimAndCheckString(eventInfo.eventDate);
        eventInfo.startTime = trimAndCheckString(eventInfo.startTime);
        eventInfo.endTime = trimAndCheckString(eventInfo.endTime);

        // If eventName is less than 5 characters, throw an error
        if (eventInfo.eventName.length < 5) throw "eventName input must be 5 or more characters";

        // If eventDescription is less than 25 characters, throw an error
        if (eventInfo.description.length < 25) throw "eventDescription input must be more than 25 characters";

        // If contactEmail is not a valid email, throw an error - NOT DONE
        if (!emailValidator.validate(eventInfo.contactEmail)) throw "Contact email is not valid";
        if (!eventInfo.contactEmail.match(/^[a-zA-Z0-9]{1}[a-zA-Z0-9]*[_.-]?[a-zA-Z0-9]+@[A-Za-z0-9]+[.][a-z]{2,3}$/gi)) throw "Contact email is not valid";

        // If eventDate is not a valid date, throw an error
        if (!eventInfo.eventDate.match(/^[0-9]{2}[/][0-9]{2}[/][0-9]{4}$/gi)) throw "Date format must be MM/DD/YYYY";
        let date = eventInfo.eventDate.split("/");
        checkMonthandDay(parseInt(date[0]), parseInt(date[1]));

        // If eventDate is not a future date, throw an error
        if (Date.parse(date) < Date.now()) throw "Only future events can be created";

        // If startTime or endTime is invalid, throw an error
        if (!eventInfo.startTime.match(/^([1-9]|1[012]):[0-5][0-9] ((AM)|(PM))$/gi)) throw "startTime input is invalid";
        if (!eventInfo.endTime.match(/^([1-9]|1[012]):[0-5][0-9] ((AM)|(PM))$/gi)) throw "endTime input is invalid";

        // Ensure start time is earlier than end time and end time is 30 mins after start time
        checkTime(eventInfo.startTime, eventInfo.endTime);

        // If publicEvent is not the expected type, throw an error
        if (typeof eventInfo.publicEvent !== "boolean") throw "Public event input must be boolean";

        // If maxCapacity or priceOfAdmission are invalid, throw an error
        checkNum(eventInfo.maxCapacity);
        if (eventInfo.maxCapacity <= 0 || !Number.isInteger(eventInfo.maxCapacity)) throw "Max capacity must be a positive, whole number";

        if (typeof eventInfo.priceOfAdmission !== "number") throw "Price of admission must be a number";
        if (eventInfo.priceOfAdmission < 0) throw "Price of admission must be positive";
        if (!checkPrice(eventInfo.priceOfAdmission)) throw "Price of admission must be an integer or a float with only 2 decimal places"

        // If eventLocation is not an object, throw an error
        checkObject(eventInfo.eventLocation);

        // If eventLocation information is not valid, throw an error
        checkString(eventInfo.eventLocation.streetAddress);
        checkString(eventInfo.eventLocation.city);
        checkString(eventInfo.eventLocation.state);
        checkString(eventInfo.eventLocation.zip);

        eventInfo.eventLocation.streetAddress = trimAndCheckString(eventInfo.eventLocation.streetAddress);
        eventInfo.eventLocation.city = trimAndCheckString(eventInfo.eventLocation.city);
        eventInfo.eventLocation.state = trimAndCheckString(eventInfo.eventLocation.state);
        eventInfo.eventLocation.zip = trimAndCheckString(eventInfo.eventLocation.zip);

        if (eventInfo.eventLocation.streetAddress.length < 3) throw "Street address of the event location object is invalid";
        if (eventInfo.eventLocation.city < 3) throw "City of the event location object is invalid";

        checkState(eventInfo.eventLocation.state);

        if (!eventInfo.eventLocation.zip.match(/^[0-9]{5}$/gi)) throw "Zip code in event location is not valid";
    } catch (e) {
        return res.status(400).json({error: e});
    }

    // Update user
    try {
        const updatedEvent = await eventData.update(
            req.params.id,
            eventInfo.eventName,
            eventInfo.description,
            eventInfo.eventLocation,
            eventInfo.contactEmail,
            eventInfo.maxCapacity,
            eventInfo.priceOfAdmission,
            eventInfo.eventDate,
            eventInfo.startTime,
            eventInfo.endTime,
            eventInfo.publicEvent
        )
        return res.status(200).json(updatedEvent);
    } catch (e) {
        return res.status(404).json({error: e});
    }
  });

export default router;
