'use strict';

const nytURL = 'https://api.nytimes.com/svc/books/v3/lists/overview.json'

const apiKey = 'xHjc7aVrVoOVE83JeFK9CdiLfw5X1b7g'


function createList( data ) {
  $('#results').html(`<h2>Results:</h2>`)
  
  // Loop through the list of results to get the author, book_image, description, and title
  for (let i = 0; i < 2; i++) {
    // console.log(data.results.lists[i].list_name);
    $('#results').append(`<h3>${data.results.lists[i].list_name}</h3>`)

    for (let j = 0; j < data.results.lists[i].books.length; j++) {
      $('#results').append(
      `<p>${data.results.lists[i].books[j].author}
      ${data.results.lists[i].books[j].title}
      ${data.results.lists[i].books[j].description}
      <img src="${data.results.lists[i].books[j].book_image}">
      </p>`)
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