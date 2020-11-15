'use strict';

const nytURL = 'https://api.nytimes.com/svc/books/v3/lists/overview.json'

const apiKey = 'xHjc7aVrVoOVE83JeFK9CdiLfw5X1b7g'


function createList( data ) {
  // Display Fiction & Nonfiction headers
  $('h3').removeClass('hidden');

  // Remove any previous results 
  $('#results1').empty();
  $('#results2').empty();

  // Loop through the list of results to get the author, book_image, description, and title
  for (let i = 0; i < 1; i++) {
    
    // $('#results1').append(`<h3>${data.results.lists[0].list_name}</h3>`)

    for (let j = 0; j < data.results.lists[0].books.length; j++) {
      $('#results1').append(
      `<div class="item1 container">
      <img src="${data.results.lists[0].books[j].book_image}">
      <p class="book-title">${data.results.lists[0].books[j].title}</p>
      <p>${data.results.lists[0].books[j].author}</p>
      <p>${data.results.lists[0].books[j].description}
      </p>
      </div>`)
    }

    // $('#results2').append(`<h3>${data.results.lists[1].list_name}</h3>`)

    for (let k = 0; k < data.results.lists[1].books.length; k++) {
      $('#results2').append(
      `<div class="item1 container">
      <img src="${data.results.lists[1].books[k].book_image}">
      <p class="book-title">${data.results.lists[1].books[k].title}</p>
      <p>${data.results.lists[1].books[k].author}</p>
      <p>${data.results.lists[1].books[k].description}
      </p>
      </div>`)
    }


  }

}

function makeURL(date) {
  const userURL = nytURL + '?api-key=' + apiKey + '&published_date=' + date
  console.log(userURL);

  fetch(userURL)
  .then( response => {
    if( response.ok ){
      return response.json();
    }
  })
  .then( responseJSON => {
    createList( responseJSON );
  });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const date = $('#search').val();
    console.log(date);
    makeURL(date);
  });
}

$(watchForm);