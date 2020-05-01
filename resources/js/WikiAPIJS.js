
// Disables search button if the input area is empty.
function disableInputField() {
  let state = document.querySelector('.search-query').value.length;
  if (state > 0) {
    // If there is 1 or more characters in the search query, ENABLE the search button.
    document.querySelector('.search-button').disabled = false;
  } else {
    // If there are 0 characters in the search query, DISABLE the search button.
    document.querySelector('.search-button').disabled = true;
  }
};
disableInputField();


// Makes pressing 'enter' click the search button.
const enterAsButton = document.querySelector('.search-query');
enterAsButton.addEventListener('keyup', function(event) {
  // Keycode number 13 is the 'enter' key.
  if (event.keyCode === 13) {
    document.querySelector('.search-button').click();
  }
});


// Uses Wiki API via fetch.
const getData = () => {
  let searchQuery = document.querySelector('.search-query').value;
  let api = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchQuery}&origin=*&limit=7`;

  fetch(api)
  .then( response => response.json() )
  .then(function(data) {
    // Clears old content output.
    document.querySelector('.content-output').innerHTML = '';

    for (let i = 0; i < data[1].length; i++) {
      let target = document.querySelector('.content-output');

      // Title is data[1].
      // Description is data[2]. Description (almost) never appears in the results.
      // Hyperlink is data[3].
      target.insertAdjacentHTML('afterbegin',
        `
          <div class='output-bar'>
            <a href=${data[3][i]} target='_blank'>
              <h2 class='output-header'>${data[1][i]}</h2>
              <p class='output-text'>${data[2][i]}</p>
            </a>
          </div>
        `
      );
    } // End of for loop.
  }); // End of second .then().

  // Clear search query.
  document.querySelector('.search-query').value = '';

  // Disable input field again.
  disableInputField();
}
