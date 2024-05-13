//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getAuthors() function in the /data/data.js file that you used for lab 3 to return the list of authors and call it in the /authors route.  You can also import your getAuthorById(id) function and call it in the :/id route.
import {Router} from "express";
import {getAuthors, getAuthorById} from "../data/data.js";
import helpers from "../helpers.js";

const router = Router();

// Implement GET Request Method and send a JSON response  See lecture code!
router.route('/')
    .get(async (req, res) => {
        try {
            const authorList = await getAuthors();
            res.json(authorList);
        } catch (e) {
            // Something went wrong with the server!
            res.status(500).send(e);
        }
    });

// Implement GET Request Method and send a JSON response See lecture code!
router.route('/:id')
    .get(async (req, res) => {
        try {
            const author = await getAuthorById(req.params.id);
            res.json(author);
        } catch (e) {
            res.status(404).json(e);
        }
    });

export default router;
