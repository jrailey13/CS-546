import {dbConnection, closeConnection} from "./config/mongoConnection.js";
import events from "./data/events.js";
import attendees from "./data/attendees.js";

const db = await dbConnection();
await db.dropDatabase();

// Create event variables
let jamoParty = undefined;
let jamoGame = undefined;
let jamoExam = undefined;
let attendee1 = undefined;

// Create events
try {
    jamoParty = await events.create("Jamo's Party", "A party to celebrate Jameson",
        {streetAddress: "450 5th St", city: "Hoboken", state: "NJ", zip: "07030"},
        "jrailey@stevens.edu", 30, 0,
        "11/28/2024", "4:00 pm", "11:00 Pm", false);
} catch (e) {
    console.log(e);
}

try {
    jamoGame = await events.create("Jamo's Soccer Game", "The Stevens Ducks are playing King's College",
        {streetAddress: "699 River Terr", city: "Hoboken", state: "NJ", zip: "07030"},
        "jrailey@stevens.edu", 1000, 2,
        "11/08/2024", "7:00 pm", "9:00 pm", true);
} catch (e) {
    console.log(e);
}

try {
    jamoExam = await events.create("Jamo's Math Exam", "Jameson will be taking a difficult math exam",
        {streetAddress: "1 Castle Point Terr", city: "Hoboken", state: "NJ", zip: "07030"},
        "jrailey@stevens.edu", 150, 0,
        "11/20/2024", "3:00 pm", "5:30 pm", false);
} catch (e) {
    console.log(e);
}

// Get all events
try {
    const allEvents = await events.getAll();
} catch (e) {
    console.log(e);
}

// Get event by id
try {
    const event1 = await events.get(jamoParty._id);
} catch (e) {
    console.log(e);
}

// Update event
try {
    jamoParty = await events.update(jamoParty._id, "Jamo's Birthday Bash", "Come one, come all to an amazing birthday party!!",
        {streetAddress: "450 5th St", city: "Hoboken", state: "NJ", zip: "07030"},
        "jrailey@stevens.edu", 45, 0,
        "11/28/2024", "4:00 pm", "10:00 Pm", true);
} catch (e) {
    console.log(e);
}

// Add attendees
try {
    jamoParty = await attendees.createAttendee(jamoParty._id.toString(), "Jameson", "Railey", "jrailey@stevens.edu");
} catch (e) {
    console.log(e);
}

// Add attendees
try {
    jamoParty = await attendees.createAttendee(jamoParty._id.toString(), "Justin", "Cross", "jcross@stevens.edu");
} catch (e) {
    console.log(e);
}

// Add attendees
try {
    jamoParty = await attendees.createAttendee(jamoParty._id.toString(), "John", "Cross", "johncross@stevens.edu");
} catch (e) {
    console.log(e);
}

// Get all attendees
try {
    const allAttendees = await attendees.getAllAttendees(jamoParty._id.toString());
} catch (e) {
    console.log(e);
}

// Get one attendee
try {
    const a1 = await attendees.getAttendee(jamoParty.attendees[0]._id.toString());
} catch (e) {
    console.log(e);
}

// End of seed file
await closeConnection();


