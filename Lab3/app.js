/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need that calls your functions like the example below. 
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.

import * as authors from "./authors.js");

    try{
        const authorData = await authors.getAuthors();
        console.log (authorData);
    }catch(e){
        console.log (e);
    }
*/

import * as authors from "./authors.js"
import * as books from "./books.js"

// getAuthorById
try{
    const authorData = await authors.getAuthorById("21d34ada-c6e8-4b30-a25e-399eacb27ef9");
    console.log (authorData);
}catch(e){
    console.log (e);
}
try{
    const authorData = await authors.getAuthorById("12345");
    console.log (authorData);
}catch(e){
    console.log (e);
}

// searchAuthorByName
try{
    const authorData = await authors.searchAuthorByName("ali");
    console.log (authorData);
}catch(e){
    console.log (e);
}
try{
    const authorData = await authors.searchAuthorByName("xyz");
    console.log (authorData);
}catch(e){
    console.log (e);
}

// getBookNames
try{
    const authorData = await authors.getBookNames("Fons", "Bradford");
    console.log (authorData);
}catch(e){
    console.log (e);
}
try{
    const authorData = await authors.getBookNames("John", "XYZ");
    console.log (authorData);
}catch(e){
    console.log (e);
}

// youngestOldest
try{
    const authorData = await authors.youngestOldest();
    console.log (authorData);
}catch(e){
    console.log (e);
}

// sameBirthday
try{
    const authorData = await authors.sameBirthday(9,6);
    console.log (authorData);
}catch(e){
    console.log (e);
}
try{
    const authorData = await authors.sameBirthday(2,29);
    console.log (authorData);
}catch(e){
    console.log (e);
}

// getBookById
try{
    const bookData = await books.getBookById("99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e");
    console.log (bookData);
}catch(e){
    console.log (e);
}
try{
    const bookData = await books.getBookById("12345");
    console.log (bookData);
}catch(e){
    console.log (e);
}

// sameGenre
try{
    const bookData = await books.sameGenre("CoOkBoOk");
    console.log (bookData);
}catch(e){
    console.log (e);
}
try{
    const bookData = await books.sameGenre("FakeGenre");
    console.log (bookData);
}catch(e){
    console.log (e);
}

// getAuthorName
try{
    const bookData = await books.getAuthorName("99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e");
    console.log (bookData);
}catch(e){
    console.log (e);
}
try{
    const bookData = await books.getAuthorName("    ");
    console.log (bookData);
}catch(e){
    console.log (e);
}

// priceRange
try{
    const bookData = await books.priceRange(2.5,3.5);
    console.log (bookData);
}catch(e){
    console.log (e);
}
try{
    const bookData = await books.priceRange(4.33, 3.92);
    console.log (bookData);
}catch(e){
    console.log (e);
}

// getAllBooksWithAuthorName
try{
    const bookData = await books.getAllBooksWithAuthorName();
    console.log (bookData);
}catch(e){
    console.log (e);
}