import events from './data/events.js'
import {dbConnection, closeConnection} from "./config/mongoConnection.js";

// Drop datebase each time this is run
const db = await dbConnection();
await db.dropDatabase();


let jamoParty = undefined;
let jamoGame = undefined;
let jamoExam = undefined;
let all_events = undefined;

// 1. Create an event of your choice.
try {
    jamoParty = await events.create("Jamo's Party", "A party to celebrate Jameson",
        {streetAddress: "450 5th St", city: "Hoboken", state: "NJ", zip: "07030"},
        "jrailey@stevens.edu", 30, 0,
        "11/28/2023", "4:00pm", "11:00Pm", false);
} catch (e) {
    console.log(e);
}

// 2. Log the newly created event. (Just that event, not all events)
try {
    console.log(jamoParty);
} catch (e) {
    console.log(e);
}

// 3. Create another event of your choice.
try {
    jamoGame = await events.create("Jamo's Soccer Game", "The Stevens Ducks are playing King's College",
        {streetAddress: "699 River Terr", city: "Hoboken", state: "NJ", zip: "07030"},
        "jrailey@stevens.edu", 1000, 2,
        "10/28/2023", "7:00pm", "9:00pm", true);
} catch (e) {
    console.log(e);
}
// 4. Query all events, and log them all
try {
    all_events = await events.getAll();
    console.log(all_events);
} catch (e) {
    console.log(e);
}

// 5. Create the 3rd event of your choice.
// 6. Log the newly created 3rd event. (Just that event, not all events)
try {
    jamoExam = await events.create("Jamo's Math Exam", "Jameson will be taking a difficult math exam",
        {streetAddress: "1 Castle Point Terr", city: "Hoboken", state: "NJ", zip: "07030"},
        "jrailey@stevens.edu", 150, 0,
        "10/28/2023", "3:00pm", "5:30pm", false);
    console.log(jamoExam);
} catch (e) {
    console.log(e);
}

// 7. Rename the first event
// 8. Log the first event with the updated name.
try {
    console.log("Renaming first event")
    const jamoNewParty = await events.rename(jamoParty._id.toString(), "Jamo's Huge Party Extravaganza");
    console.log(jamoNewParty);
} catch (e) {
    console.log(e);
}

// 9. Remove the second event you created.
try {
    console.log("removing second event")
    await events.remove(jamoGame._id.toString());
} catch (e) {
    console.log(e);
}

// 10. Query all events, and log them all
try {
    all_events = await events.getAll();
    console.log(all_events);
} catch (e) {
    console.log(e);
}
//
// // 11. Try to create an event with bad input parameters to make sure it throws errors.
try {
    jamoParty = await events.create("Event", "This is an event description",
        {streetAddress: "450 5th", city: "Hoboken", state: "NJ", zip: "07030"},
        "jrailey@stevens.edu", 500, 0,
        "12/22/2023", "10:45pm", "11:30Pm", true);
} catch (e) {
    console.log(e);
}

// 12. Try to remove an event that does not exist to make sure it throws errors.
try {
    console.log("removing event that doesn't exist")
    let deleted = await events.remove("jafq3j240329irqejf");
    console.log(deleted);
} catch (e) {
    console.log(e);
}

// 13. Try to rename an event that does not exist to make sure it throws errors.
try {
    console.log("renaming an event that doesn't exist")
    jamoGame = await events.rename("653030a84a6186147cd753a1", "Jamo's Game Against King's College");
    console.log(jamoGame);
} catch (e) {
    console.log(e);
}

// 14. Try to rename an event passing in invalid data for the newEventName parameter to make sure it throws errors.
try {
    console.log("Renaming an event with invalid input name")
    jamoParty = await events.rename("653030a84a6186147cd753a5", "VIP");
    console.log(jamoParty);
} catch (e) {
    console.log(e);
}

// 15. Try getting an event by ID that does not exist to make sure it throws errors.
try {
    console.log("getting an event by an invalid id")
    jamoGame = await events.get("19202fjaida93");
    console.log(jamoGame);
} catch (e) {
    console.log(e);
}

await closeConnection();


