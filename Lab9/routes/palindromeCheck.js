/*
Require express and express router as shown in lecture code and worked in previous labs.
Your server this week should not be doing any of the processing! Your server only exists to allow someone to
get to the HTML Page and download the associated assets to run the palindrome check page.
you just need one route to send the static homepage.html file
*/

import {Router} from "express";
const router = Router();
import path from "path";

router.get('/', (req, res) => {
    res.sendFile(path.resolve('static/homepage.html'));
});

export default router