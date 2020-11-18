'use strict';

const nytURL = 'https://api.nytimes.com/svc/books/v3/lists/overview.json';

const apiKey = 'xHjc7aVrVoOVE83JeFK9CdiLfw5X1b7g';

function displayList( data ) {
  // Remove any previous results 
  $('#results1').empty();
  $('#results2').empty();
  $('#js-error-message').empty();


  // Handles non-valid date selection/no results
  if (data.num_results === 0) {
    $('#js-error-message').append(`<p class="fix-margin">No results. Please select a valid date.</p>`);
    $('section').addClass('hidden');
  } else {


  // Loop through the list of results to get the author, book_image, description, and title for fiction & nonfiction respectfully  
  for (let j = 0; j < data.results.lists[0].books.length; j++) {
    $('#results1').append(
    `<div class="item1 container">
    <img src="${data.results.lists[0].books[j].book_image}">
    <p class="book-title">${data.results.lists[0].books[j].title}</p>
    <p>${data.results.lists[0].books[j].author}</p>
    <p>${data.results.lists[0].books[j].description}
    </p>
    <p><a href="${data.results.lists[0].books[j].buy_links[2].url}" target="_blank">More info</a></p>
    </div>`)
  }


  for (let k = 0; k < data.results.lists[1].books.length; k++) {
    $('#results2').append(
    `<div class="item1 container">
    <img src="${data.results.lists[1].books[k].book_image}">
    <p class="book-title">${data.results.lists[1].books[k].title}</p>
    <p>${data.results.lists[1].books[k].author}</p>
    <p>${data.results.lists[1].books[k].description}
    </p>
    <p><a href="${data.results.lists[0].books[k].buy_links[2].url}" target="_blank">More info</a></p>
    </div>`)
  }

  // Display headers & results
  $('section').removeClass('hidden');

  }

}

function getBooks(date) {
  // Put URL together into a string
  const userURL = nytURL + '?api-key=' + apiKey + '&published_date=' + date;

  console.log(userURL);

  fetch(userURL)
  .then( response => {
    console.log(response);
    if( response.ok ){
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then( responseJSON => {
    displayList( responseJSON );
  })
  
  .catch(error => {
    $('#js-error-message').text(`Something went wrong: ${data.status}`);
  });


}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const date = $('#search').val();
    console.log(date);
    getBooks(date);
  });
}

$(watchForm);