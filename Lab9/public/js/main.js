//Here is where you will do all the logic and processing for the palindrome and prime checking.

// Get static form
$('#myForm').submit((event) => {
    event.preventDefault();

    // Create variables
    let palindromeArray = [];
    let booleanArray = [];
    let userInput = '';

    if ($('#palindrome_input').val().trim()) {
        $('#error').hide();
        $('#formLabel').removeClass('error');
        $('#palindrome_input').removeClass('inputClass');

        // Store user input
        userInput = $('#palindrome_input').val();

        // Lowercase user input
        userInput = userInput.toLowerCase();

        // Remove non-alphanumeric text - Source: https://stackoverflow.com/questions/9364400/remove-not-alphanumeric-characters-from-string
        userInput = userInput.replace(/[^0-9a-z,]/gi, '');

        // split the text
        palindromeArray = userInput.split(',');

        // Determine if each word is a palindrome
        for (let word of palindromeArray) {
            let reverseWord = word.split('').reverse().join('');
            if (word === reverseWord) {
                booleanArray.push(true);
            } else  {
                booleanArray.push(false);
            }
        }

        // Create list element that will store the boolean array
        let li = document.createElement('li');
        li.appendChild(document.createTextNode("[" + booleanArray + "]"));
        // Check if the length is prime - inspired by https://www.programiz.com/javascript/examples/prime-number#google_vignette
        if (booleanArray.length < 2) {
            li.classList.add('not-prime');
        } else if (booleanArray.length === 2) {
            li.classList.add('prime');
        } else {
            for (let i = 2; i < booleanArray.length; i++) {
                if (booleanArray.length % i === 0) {
                    li.classList.add('not-prime');
                    break;
                }
                li.classList.add('prime');
            }
        }

        // Add boolean array to ordered list item
        $('#palindromes').append(li);
        $('#myForm').trigger('reset');
        $('#palindrome_input').focus();
    } else {
        // Show the error div if the user enters just spaces or no text
        $('#error').show();
        $('#formLabel').addClass('error');
        $('#palindrome_input').addClass('inputClass');
        $('#palindrome_input').focus();
        $('#palindrome_input').val('');
    }
});