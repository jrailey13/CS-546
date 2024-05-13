//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Books data link: https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json

import {checkMinMax, checkString, getAuthors, getBooks, trimAndCheckString} from "./helpers.js";
import {getAuthorById} from "./authors.js";

const getBookById = async (id) => {
    let books = undefined;
    try {
        books = await getBooks();
    } catch (e) {
        console.log(e);
    }

    // Check the id string
    checkString(id);

    // Trim and check the id string
    id = trimAndCheckString(id);

    // Filter the books array for the book that has the input id
    let book = books.find(function (obj) {
        return obj.id === id;
    });

    if (!book) throw "There is no book with the input id";
    return book;
};

const getAuthorName = async (bookId) => {
    let authors = undefined;
    try {
        authors = await getAuthors();
    } catch (e) {
        console.log(e);
    }

    // Check bookId string
    checkString(bookId);

    // Trim and check bookId string
    trimAndCheckString(bookId);

    // Otherwise, find the author who wrote the book and return their first and last name
    let author = authors.find(function (obj) {
        return obj["books"].includes(bookId);
    });
    if (!author) throw "There is no book with the input id";
    let author_name = author["first_name"] + " " + author["last_name"];
    return author_name;
};

const sameGenre = async (genre) => {
    let books = undefined;
    try {
        books = await getBooks();
    } catch (e) {
        console.log(e);
    }
    // Check genre string
    checkString(genre);

    // Trim and check genre string
    trimAndCheckString(genre);

    // Filter the list of books for books that have the input genre; used map function to enable lower case comparison for case insensitivity
    let genres = books.filter(function(obj) {
        return obj["genres"].map(function(arr) {
            return arr.toLowerCase();
        }).includes(genre.toLowerCase())});

    if (genres.length === 0) throw "There are no books with that genre"
    return genres;
};

const priceRange = async (min, max) => {
    let books = undefined;
    try {
        books = await getBooks();
    } catch (e) {
        console.log(e);
    }

    // Check that min and max values are valid
    checkMinMax(min, max);

    // Filter for books that are between min and max
    let book_list = books.filter(function(obj) {
        return parseFloat(obj["price"]) >= min && parseFloat(obj["price"]) <= max;
    });

    // If there are no books between min and max, throw an error
    if (book_list.length === 0) throw "There are no books within that price range";

    return book_list;
};

const getAllBooksWithAuthorName = async () => {
    let books = undefined;
    try {
        books = await getBooks();
    } catch (e) {
        console.log(e);
    }

    // Delete authorId from every object
    books.forEach(function(obj) {
        delete obj.authorId;
    });

    for (const obj of books) {
        obj.author = await getAuthorName(obj.id);
    }
    return books;
};

export {getBookById, sameGenre, getAuthorName, priceRange, getAllBooksWithAuthorName}