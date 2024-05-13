// Import the express router as shown in the lecture code
// Note: please do not forget to export the router!
import {Router} from 'express';
const router = Router();
import {attendeeData} from '../data/index.js';
import {ObjectId} from "mongodb";
import {checkString, trimAndCheckString} from "../helpers.js";


router
  .route('/:id')
  .get(async (req, res) => {
    //code here for GET
    // Ensure that event id is a valid event id
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({error: "Event ID parameter is invalid"});

    // Try to get the attendees
    try {
      const attendees = await attendeeData.getAllAttendees(req.params.id);
      return res.status(200).json(attendees);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  })
  .post(async (req, res) => {
    //code here for POST
    let attendeeInfo = req.body;
    // make sure there is something request params have values
    if (!attendeeInfo || Object.keys(attendeeInfo).length === 0) {
      return res
          .status(400)
          .json({error: 'There are no fields in the request body'});
    }

    // Check and trim URL parameters
    checkString(attendeeInfo.firstName);
    checkString(attendeeInfo.lastName);
    checkString(attendeeInfo.emailAddress);

    attendeeInfo.firstName = trimAndCheckString(attendeeInfo.firstName);
    attendeeInfo.lastName = trimAndCheckString(attendeeInfo.lastName);
    attendeeInfo.emailAddress = trimAndCheckString(attendeeInfo.emailAddress);

    // Check eventId URL parameter
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({error: "Invalid event ID parameter"});

    // Create the attendee
    try {
      const eventInfo = await attendeeData.createAttendee(req.params.id, attendeeInfo.firstName, attendeeInfo.lastName, attendeeInfo.emailAddress);
      res.status(200).json(eventInfo);
    } catch (e) {
      res.status(404).json({error: e});
    }
  });

router
  .route('/attendee/:id')
  .get(async (req, res) => {
    //code here for GET
    // Ensure attendee id is a valid object id
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({error: "Attendee ID URL parameter is not a valid object ID"});

    // Get attendee info
    try {
      const attendeeInfo = await attendeeData.getAttendee(req.params.id);
      return res.json(attendeeInfo);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    // Ensure attendee id is a valid object id
    if (!ObjectId.isValid(req.params.id)) return res.status(400).json({error: "Attendee ID URL parameter is not a valid object ID"});

    // Get attendee info
    try {
      const attendeeInfo = await attendeeData.removeAttendee(req.params.id);
      return res.json(attendeeInfo);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  });

export default router;