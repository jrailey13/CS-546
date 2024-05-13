//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/characters.js that you will call in your routes below
import {Router} from 'express';
const router = Router();
import {searchCharacterByName, searchCharacterById} from '../data/characters.js';
import helpers from '../helpers.js';

router.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file
    // Render the home page with appropriate title
    try {
        res.render('home', {title: "Marvel Character Finder"});
    } catch (e) {
        res.status(500).render('error', {title: "Error", error: e});
    }
});

router.route('/searchmarvelcharacters').post(async (req, res) => {
  //code here for POST this is where your form will be submitting searchCharacterByName and then call your data function passing in the searchCharacterByName and then rendering the search results of up to 15 characters.
    // Store the value the user searched
    let userSearch = req.body.searchCharacterByName;
    // Ensure the user search value is valid
    try {
        userSearch = helpers.checkString(userSearch, "character name");
    } catch (e) {
        return res.status(400).render('error', {title: "Error", error: e});
    }
    // Get the character data based on the user's search and render the results if they exist
    try {
        const characterData = await searchCharacterByName(userSearch);
        if (!characterData) {
            res.status(400).render('error', {error: "Character Not Found", searchCharacterByName: userSearch, class: "not-found", });
        }
        else if (characterData.results.length === 0) {
            res.status(200).render('error', {error: "We're sorry, but no results were found for ", searchCharacterByName: userSearch, class: "not-found"})
        }
        else {
            res.status(200).render('characterSearchResults', {title: "Marvel Characters Found", searchCharacterByName: userSearch,
                characters: characterData.results})
        }
    } catch (e) {
        res.status(500).render('error', {title: "Error", error: e, class: "not-found"});
    }
});

router.route('/marvelcharacter/:id').get(async (req, res) => {
  //code here for GET a single character
    // Get the id from the user input
    let characterId = req.params.id;
    // Ensure the id is valid
    try {
        characterId = helpers.checkId(characterId, "Character Id");
    } catch (e) {
        return res.status(404).render('error', {error: e, class: "invalid-id"})
    }
    // Collect character data based on id and render the page with the corresponding results
    try {
        const characterData = await searchCharacterById(characterId);
        let image_path = characterData.results[0].thumbnail.path + '/portrait_uncanny.jpg'
        res.status(200).render('characterById', {title: characterData.results[0].name, characterData: characterData.results[0], image: image_path,
            name: characterData.results[0].name, description: characterData.results[0].description, comics: characterData.results[0].comics.items});
    } catch (e) {
        return res.status(404).render('error', {error: "A character with the provided id, " + characterId + ", does not exist", class: "not-found"});
    }
});

//export router
export default router;