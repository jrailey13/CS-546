/*Here, you can export the functions you did for lab 3
to get the authors, books, getBookByID, getAuthorById.  You will import these functions into your routing files and call the relevant function depending on the route. 
*/

import axios from "axios";
import helper from "../helpers.js";

// Use axios to download authors.json
export async function getAuthors(){
    try {
        const {data} = await axios.get("https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json");
        return data;
    } catch(e) {
        console.log(e);
    }
}

// Use axios to download books.json
export async function getBooks(){
    try {
        const {data} = await axios.get("https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json");
        return data;
    } catch(e) {
        console.log(e);
    }
}
export const getAuthorById = async (id) => {
    let authors = undefined;
    try {
        authors = await getAuthors();
    } catch (e) {
        console.log(e);
    }

    // Check the input string
    helper.checkString(id, "ID");

    // Trim and check the input string
    id = helper.trimAndCheckString(id);

    // Filter the author data for the author with the input id
    let author = authors.find(function (obj) {
        return obj.id === id;
    });

    // If no authors have that input id, throw an error
    if (!author) throw "Input ID is not in the list of authors";
    return author;
};

export const getBookById = async (id) => {
    let books = undefined;
    try {
        books = await getBooks();
    } catch (e) {
        console.log(e);
    }

    // Check the id string
    helper.checkString(id, "ID");

    // Trim and check the id string
    id = helper.trimAndCheckString(id);

    // Filter the books array for the book that has the input id
    let book = books.find(function (obj) {
        return obj.id === id;
    });

    if (!book) throw "There is no book with the input id";
    return book;
};
