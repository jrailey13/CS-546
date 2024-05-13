/* 
All of the functionality will be done in this client-side JS file.  
You will make client - side AJAX requests to the API and use jQuery to target and create elements on the page.
*/

(function ($) {

    let unorderedShowList = $('#tvShowList');
    let searchForm = $('#searchShows');
    let searchTerm = $('#show_search_term');
    let showDetails = $('#showDetails');

    // Create ajax request
    $.ajax('http://api.tvmaze.com/shows').then(function (responseMessage) {
        let movieData = responseMessage;

        unorderedShowList.click(function (event) {
            event.preventDefault();
        });

        for (let movie of movieData) {
            let name = movie.name
            let link = movie._links.self.href

            let aTag = `<a href=${link}>${name}</a>`;

            unorderedShowList.append(`<li>${aTag}</li>`);
        }

        unorderedShowList.show();

    });

    searchForm.submit(function (event) {
        event.preventDefault();

        let searchInput = searchTerm.val();

        searchInput = searchInput.trim();

        if (searchInput) {
            $('#error').hide();
            unorderedShowList.empty();
            showDetails.empty();

            $.ajax(`http://api.tvmaze.com/search/shows?q=${searchInput}`).then(function (responseMessage) {
                let movieData = responseMessage;

                for (let movie of movieData) {
                    let name = movie.show.name;
                    let link = movie.show._links.self.href;

                    let aTag = `<a href=${link}>${name}</a>`;

                    unorderedShowList.append(`<li>${aTag}</li>`);
                }

                unorderedShowList.show();
                $('#rootLink').show();
            });
        } else {
            $('#error').show();
        }
    });

    unorderedShowList.on('click', 'li a', function (event) {
        event.preventDefault();

        let showLink = event.target.href;

        $('#title').hide();
        unorderedShowList.hide();
        showDetails.empty();

        $.ajax(showLink).then(function (responseMessage) {
            console.log(responseMessage);
            let showName = 'N/A';
            let showImage = '../public/no_image.jpeg';
            let showLang = 'N/A'
            let showGenres = 'N/A'
            let showRating = 'N/A'
            let showNetwork = 'N/A';
            let showSummary = 'N/A'

            if (responseMessage.name) showName = responseMessage.name;

            if (responseMessage.image) showImage = responseMessage.image.medium;

            if (responseMessage.language) showLang = responseMessage.language;

            if (responseMessage.genres) showGenres = responseMessage.genres;

            if (responseMessage.rating.average) showRating = responseMessage.rating.average;

            if (responseMessage.network) showNetwork = responseMessage.network.name;

            if (responseMessage.summary) showSummary = responseMessage.summary;

            let h1Tag = `<h1>${showName}</h1>`

            console.log(showImage);
            let imgTag = `<img src=${showImage} alt="No image available.">`;
            if (showImage !== '../public/no_image.jpeg') imgTag = `<img src=${showImage} alt="${showName}">`;
            let defList = $('<dl></dl>');

            // Language
            defList.append(`<label for="show-lang">Language</label>`)
            defList.append(`<li id="show-lang">${showLang}</li>`);

            // Genres
            let unOrdList = $('<ul id="show-genres"></ul>')
            for (let genre of showGenres) {
                unOrdList.append(`<li>${genre}</li>`);
            }
            defList.append(`<label for="show-genres">Genres</label>`)
            defList.append(unOrdList);

            // Rating
            defList.append(`<label for="show-rating">Rating</label>`)
            defList.append(`<li id="show-rating">${showRating}</li>`);

            // Network
            defList.append(`<label for="show-network">Network</label>`)
            defList.append(`<li id="show-network">${showNetwork}</li>`);

            // Summary
            showSummary = showSummary.replace('<b>', '');
            showSummary = showSummary.replace('</b>', '');
            console.log(showSummary);
            defList.append(`<label for="show-summary">Summary</label>`)
            defList.append(showSummary);

            showDetails.append(h1Tag);
            showDetails.append(imgTag);
            showDetails.append(defList);

            showDetails.show();
        });

        $('#rootLink').show();
    });

})(window.jQuery)