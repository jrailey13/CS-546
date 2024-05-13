import * as lab1 from './lab1.mjs';

//TODO: Write and call each function in lab1.js 5 times each, passing in different input

// Question One Test Cases:

console.log("Tests for Question One:");
console.log(lab1.questionOne(["hello", "my", "name", "is", "Jameson"])) // returns [8, true]
console.log(lab1.questionOne(["I", "attend", "Stevens", "Institute", "of", "Technology"])); // returns [13, false] 
console.log(lab1.questionOne(["I", "am", "excited", "for", "this", "course!!"])); // returns [10, true] 
console.log(lab1.questionOne(["Working", "hard", "is", "the", "key", "to", "success"])); // returns [9, false]
console.log(lab1.questionOne(["23", "yrs"])); // returns [0, true]
console.log("\n");


// Question Two Test Cases:
console.log("Tests for Question Two:")
console.log(lab1.questionTwo({ a: 3, b: 2, c: 1, d: 7 }, { a: 6, b: 5, c: 4, e: 8 })); // returns ["d","e"]
console.log(lab1.questionTwo({ a: 3, b: 2, f: 1, g: 46 }, { d: 3, e: 4, c: 5, g: 2 })); // returns ["a","b","c","d","e","f"]
console.log(lab1.questionTwo( {'1': true, a: 5, '2': 'hi', '444': 2}, {'3': true, b: 5, '44': "hi", '4': "bye", '5': 8, '22': 22, "555": 555})) // returns ["1", "2", "3", "4", "5", "22", "44", "444", "555", "a", "b"]
console.log(lab1.questionTwo({"words": 3, "1": 1, "2": 2}, {"50": 50, "7": 7, "1": 1, "2": 2, "wordr": 0}));  // returns ["7", "50", "wordr", "words"]
console.log(lab1.questionTwo({"hi": 3, "i": 1, "love": 2, "you": 2, "": 400}, {"you": 50, "so": 7, "much": 1, "0": 2, "": 0})); // returns ["0", "hi", "i", "love", "much", "so"]
console.log(lab1.questionTwo({"10": 3, "9": 1, "8": 2, "7": 2, "77": 400}, {"100": 5, "999": 7, "888": 1, "777": 2, "666": 0})); // returns ["0", "hi", "i", "love", "much", "so"]
console.log("\n");


// Question Three Test Cases:
console.log("Tests for Question Three:");
console.log(lab1.questionThree([[1,1,1], [3,3,3], [4,6,8]]));  // returns {'0': [0.43, 3], '1': [3.9, 9], '2': [11.62, 18]} 
console.log(lab1.questionThree([[0,0,0], [5,2,4], [8,5,4], [7,3,9]]));  // returns {'0': [0, 0], '1': [3.8, 11], '2': [8.18, 17], '3': [8.79,19]}
console.log(lab1.questionThree([[10,11,12], [20,21,22], [4,3,2], [8,6,4]]));  // returns {'0': [51.52, 33], '1': [190.09, 63], '2': [2.9, 9], '3': [11.62, 18]}
console.log(lab1.questionThree([[14,7,8], [13,7,7], [12,7,7]]));  // returns {'0': [18.8, 29], '1': [16.89, 27], '2': [21.63, 26]}
console.log(lab1.questionThree([[100,101,102], [150,200,250], [3,4,5]]));  // returns {'0': [4416.3, 303], '1': [15000, 600], '2': [6, 12]}
console.log("\n");

// Question Four Test Cases:
console.log("Tests for Question Four:");
console.log(lab1.questionFour('Stevens,is,an,awesome,school,!'));  // returns ['vensSte', 'si', 'na', 'someawe', 'oolsch', '!'] 
console.log(lab1.questionFour('my,name,is,jameson,railey'));  // returns ['ym', 'mena', 'si', 'esonjam', 'leyrai']
console.log(lab1.questionFour('exclamations,should,work!!'));  // returns ['ationsexclam', 'uldsho', 'k!!wor'] 
console.log(lab1.questionFour('who,are,you?'));  // returns ['how', 'rea', 'u?yo']
console.log(lab1.questionFour('I,love,cars,haha'));  // returns ['I', 'velo', 'rsca', 'haha'] 

