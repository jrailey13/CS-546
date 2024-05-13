//TODO EXPORT AND IMPLEMENT THE FOLLOWING FUNCTIONS IN ES6 FORMAT
//Authors data link: https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json

//you must use axios to get the data

import {checkMonthandDay, checkString, compareNames, getAuthors, getBooks, trimAndCheckString} from "./helpers.js";
const getAuthorById = async (id) => {
    let authors = undefined;
    try {
        authors = await getAuthors();
    } catch (e) {
        console.log(e);
    }

    // Check the input string
    checkString(id);

    // Trim and check the input string
    id = trimAndCheckString(id);

    // Filter the author data for the author with the input id
    let author = authors.find(function (obj) {
        return obj.id === id;
    });

    // If no authors have that input id, throw an error
    if (!author) throw "Input ID is not in the list of authors";
    return author;
};

const searchAuthorByName = async (searchTerm) => {
    let authors = undefined;
    try {
        authors = await getAuthors();
    } catch(e) {
        console.log(e);
    }
    // Check the input string
    checkString(searchTerm);

    // Trim and check the input string
    searchTerm = trimAndCheckString(searchTerm);

    // Make the input lowercase for comparison
    searchTerm = searchTerm.toLowerCase();

    // Filter the authors who have the input string in their name
    let author = authors.filter(function (obj) {
        return obj["first_name"].toLowerCase().includes(searchTerm) || obj["last_name"].toLowerCase().includes(searchTerm);
    });
    // If no authors have the input string in their name, throw an error
    if (author.length === 0) throw "Search term is not found in any author names";
    else {
        let author_list = [];
        // Push each author name from the filtered list of author objects to a list
        for (let a of author) {
            author_list.push(a["first_name"] + " " + a["last_name"]);
        }
        // Sort the list by last name and return it
        author_list.sort(compareNames);
        return author_list;
    }
};

const getBookNames = async (firstName, lastName) => {
    let authors = undefined;
    let books = undefined;
    try {
        authors = await getAuthors();
        books = await getBooks();
    } catch(e) {
        console.log(e);
    }
    // Check the strings
    checkString(firstName);
    checkString(lastName);

    // Trim and check the strings
    firstName = trimAndCheckString(firstName);
    lastName = trimAndCheckString(lastName);

    // Filter the author data to find where the input names match the author names
    let author = authors.find(function (obj) {
        return obj["first_name"].toLowerCase() === firstName.toLowerCase()
            && obj["last_name"].toLowerCase() === lastName.toLowerCase();
    });
    // If there are no authors with the input name throw an error
    if (!author) throw "Author name not found in dataset";
    // Otherwise, find the books that the author wrote and push their titles to a list
    else {
        let author_books = [];
        let book_titles = [];
        for (let id of author["books"]) {
            author_books.push(books.filter(function(obj) {
                return obj["id"] === id;
            })[0]);
        }
        if (author_books.length === 0) throw "Author is in dataset, but has not written any books";
        for (let obj of author_books) {
            book_titles.push(obj["title"]);
        }

        // Sort the list of books alphabetically
        book_titles.sort();
        return book_titles;
    }
};

const youngestOldest = async () => {
    let authors = undefined;
    try {
        authors = await getAuthors();
    } catch(e) {
        console.log(e);
    }
    // Sort the authors by date of birth
    authors.sort((a,b) => Date.parse(a.date_of_birth) - Date.parse(b.date_of_birth));

    // Create lists to store the youngest and oldest authors
    let oldest_authors = [];
    oldest_authors.push(authors[0]);

    let youngest_authors = [];
    youngest_authors.push(authors[authors.length - 1]);

    // If the birthdays are the same add them to the according list
    let i = 0;
    while (authors[i].date_of_birth === authors[i+1].date_of_birth) {
        oldest_authors.push(authors[i+1]);
        i++;
    }
    let j = 1;
    while (authors[authors.length-j].date_of_birth === authors[authors.length-(j+1)].date_of_birth) {
        youngest_authors.push(authors[authors.length-(j+1)]);
        j++;
    }

    // Create final result object
    let result = {youngest: "", oldest:""};

    // If there is only one youngest author, add their name to the result object
    if (youngest_authors.length === 1) result["youngest"] = youngest_authors[0]["first_name"] + " " + youngest_authors[0]["last_name"];
    // If there are two or more youngest authors, add an array of their names to the result object
    else {
        for (i = 0; i < youngest_authors.length; i++) {
            youngest_authors[i] = youngest_authors[i]["first_name"] + " " + youngest_authors[i]["last_name"];
        }
        // Sort the list by last name and add it to the result object
        youngest_authors.sort(compareNames);
        result["youngest"] = youngest_authors;
    }

    // If there is only one oldest author, add their name to the result object
    if (oldest_authors.length === 1) result["oldest"] = oldest_authors[0]["first_name"] + " " + oldest_authors[0]["last_name"];
    // If there are two or more oldest authors, add an array of their names to the result object
    else {
        for (i = 0; i < oldest_authors.length; i++) {
            oldest_authors[i] = oldest_authors[i]["first_name"] + " " + oldest_authors[i]["last_name"];
        }
        // Sort the list by last name and add it to the result object
        oldest_authors.sort(compareNames);
        result["oldest"] = oldest_authors;
    }
    if (!result.youngest || !result.oldest) throw "Error finding youngest or oldest authors"
    return result;
};

const sameBirthday = async (month, day) => {
    let authors = undefined;
    try {
        authors = await getAuthors();
    } catch (e) {
        console.log(e);
    }
    // Call helper function to check month and day
    checkMonthandDay(month, day);

    // Filter authors who have birthdays that align with the month and day parameters
    let author = authors.filter(function (obj) {
        let date_list = obj["date_of_birth"].split("/")
        return (month === parseInt(date_list[0]) && day === parseInt(date_list[1]))
    });
    // If there are no two authors born on this day throw an error
    if (author.length <= 1) throw "No two authors in the data were born on that day";

    // Add the first and last name of the authors born on the day to a list
    let author_list = [];
    for (let obj of author) {
        author_list.push(obj["first_name"] + " " + obj["last_name"]);
    }
    // Sort the list by last name and return it
    author_list.sort(compareNames);
    return author_list;
};

export {getAuthorById, searchAuthorByName, getBookNames, youngestOldest, sameBirthday};