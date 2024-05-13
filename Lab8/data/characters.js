//import axios, md5
import axios from "axios";
import md5 from 'blueimp-md5';
import helpers from "../helpers.js";

export const searchCharacterByName = async (name) => {
  //Function to search the api and return up to 15 characters matching the name param
    name = helpers.checkString(name, "Character name");
    const publickey = '1f095d913e0a2f79b434f4b61f91b177';
    const privatekey = '2b4fa0dccbbf53a2f10d26ac26f9ef12c4e46883';
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
    const url = baseUrl + '?nameStartsWith=' + name + '&limit=15&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

    const characterData = await axios.get(url);
    return characterData.data.data;
};

export const searchCharacterById = async (id) => {
  //Function to fetch a character from the api matching the id
    //Function to search the api and return up to 15 characters matching the name param
    id = helpers.checkId(id, "Character id");
    const publickey = '1f095d913e0a2f79b434f4b61f91b177';
    const privatekey = '2b4fa0dccbbf53a2f10d26ac26f9ef12c4e46883';
    const ts = new Date().getTime();
    const stringToHash = ts + privatekey + publickey;
    const hash = md5(stringToHash);
    const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
    const url = baseUrl + '/' + id + '?&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

    const characterData = await axios.get(url);
    return characterData.data.data;
};

