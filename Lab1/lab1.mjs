export const questionOne = (arr) => {
  // Implement question 1 here
  const vowels = ['a','e','i','o','u','A','E','I','O','U'];
  let vowel_count = 0;

  // For each word in the array
  for (let word of arr) {
    // For each letter in the word
    for (let letter of word) {
      // If the letter is a vowel, add one to vowel count
      if (vowels.includes(letter)) 
        vowel_count += 1;
    }
  }
  
  let result = [];
  result.push(vowel_count);

  if (vowel_count % 2 === 0) {
    result.push(true);
  }
  else {
    result.push(false);
  }

  return result; //return result
};

export const questionTwo = (obj1, obj2) => {
  // Implement question 2 here

  const keys_1 = Object.keys(obj1);
  const keys_2 = Object.keys(obj2);
  let result = [];

  for (let key of keys_1) {
    if (!keys_2.includes(key)) {
      result.push(key);
    }
  }

  for (let key of keys_2) {
    if (!keys_1.includes(key)) {
      result.push(key);
    }
  }

  // Sort the unique keys; although more sorting remains
  result.sort();

  // Result is sorted, but we need to make sure the integers are sorted numerically
  for (let i = 0; i < result.length; i++) {
    let val = parseFloat(result[i]);
    let next_val = parseFloat(result[i+1]);

    // If the current value is greater than the one after it, swap them
    if (val > next_val) {
      let temp = result[i];
      result[i] = result[i+1];
      result[i+1] = temp;

      // Reset i to ensure we sort the entire list
      i = -1; 
    }
  }

  return result; //return result
};

export const questionThree = (arr) => {
  // Implement question 3 here
  let perimeter = 0;
  let area = 0;
  let result = {};
  let index = 0;

  for (let dimensions of arr) {
    // Store each side of the triangle
    let a = parseFloat(dimensions[0]);
    let b = parseFloat(dimensions[1]);
    let c = parseFloat(dimensions[2]);
    
    // Calculate perimeter
    perimeter = a + b + c;

    // Use Heron's Formula to calculate area - https://www.cuemath.com/measurement/area-of-triangle-with-3-sides/
    let s = perimeter/2;
    area = Math.sqrt((s*(s-a)*(s-b)*(s-c)));

    // Round area to nearest hundreth - http://www.javascripter.net/faq/rounding.htm#:~:text=Rounding%20a%20Number%20in%20JavaScript,round()&text=round%20method%3A-,Math.,round%20X%20to%20hundredths%20Math.
    area = Math.round(area * 100) / 100;

    // Add calculations to result object
    result[index] = [area, perimeter];
    index += 1;

  }

  return result; //return result
};

export const questionFour = (string) => {
  // Implement question 4 here

  // Split string by comma
  let words = string.split(",");
  let result = [];

  for (let word of words) {
    // Find the midpoint of word
    let mid_point = word.length / 2;
    
    // Separate the word into two substrings based on the midpoint
    let half_1 = word.substring(0, mid_point);
    let half_2 = word.substring((mid_point), word.length);

    // Reverse the order and combine the substrings
    let new_word = half_2 + half_1;

    // Push the new word into the result array
    result.push(new_word);
  }

  return result; //return result
};

//DO NOT FORGET TO UPDATE THE INFORMATION BELOW OR IT WILL BE -2 POINTS PER FIELD THAT IS MISSING.
export const studentInfo = {
  firstName: 'Jameson',
  lastName: 'Railey',
  studentId: '20020463'
};
