// //mock data for testing API
// let MOCK_PROFILE = {
//   "books": [
//     {
//       "id": "1111111",
//       "title": "Harry Potter and the Sorcerer's Stone",
//       "author": "J.K. Rowling",
//       "genre": "fantasy",
//       "goalPages": "100 pages",
//       "goalChapters": "2 chapters" 
//     },
//     {
//       "id": "1111112",
//       "title": "The Lord of the Rings and the Fellowship of the Ring",
//       "author": "J.R.R. Tolkien",
//       "genre": "science-fiction",
//       "goalPages": "30 pages",
//       "goalChapters": "4 chapters"
//     }
//   ]
// };

let serverBase = "//localhost:3030/";
let BOOK_URL = serverBase + "books";

// const books = [];

// const newBooks = books.push(title, author, genre, goalPages, goalChapters);

// get main book page data
function getBookProfile() {
  // setTimeout(function() { callback(MOCK_PROFILE)}, 100);
  // const query = {
  //   title : document.getElementById("title").value,
  //   author : document.getElementById("author").value,
  //   genre : document.getElementById("genre").value,
  //   goalPages : document.getElementById("goals").value,
  //   goalChapters : document.getElementById("chapters").value
  // };

  return $.ajax({
    url: BOOK_URL,
    method: "GET",
    dataType: "json",
    data: JSON.stringify(),
    contentType: "application/json",
    success: response => getAndDispalyBookProfile(response)
  });
  console.log(response);
}

// display book data
function displayBookProfile(response) {
  for (index in response.books) {
    $('.bookList').append(
      '<p>' + response.books[index].title + " by " + response.books[index].author + '</p>' + 
      '<p>' + "Genre: " +  response.books[index].genre + '</p>' +
      '<p>' + "Goal: " + response.books[index].goalPages + " or " +  response.books[index].goalChapters + '</p>' +
      '<button type="button" class="updateButton" role="button">Update</button>' +
      '<button type="button" class="deleteButton" role="button">Delete</button>');
  }
  console.log(response);
}

// request and display data 
function getAndDispalyBookProfile() {
  getBookProfile(displayBookProfile);
}

// //need event handlers for buttons
// function addBook(book) {
//   $.ajax({
//     method: "POST",
//     url: BOOK_URL,
//     data: JSON.stringify(book),
//     success: function(data) {
//       getAndDisplaybookEntry();
//     },
//     dataType: "json",
//     contentType: "application/json"
//   });
// }

// //handler for adding books on submission of add-form
// // function handleBookAdd() {
// //   $(".add-form").submit(function(e) {
// //     e.preventDefault();
// //     addBooks({
      
// //       // title: $(e.currentTarget)
// //       //   .find(".js-query")
// //       //   .val(),
// //     });
// //   });
// // }

// function handleBookAdd() {
//   $(".add-form").submit(function(e) {
//     e.preventDefault();
  
//     // let title = document.getElementById("title").value;
//     // let author = document.getElementById("author").value;
//     // let genre = document.getElementById("genre").value;
//     // let goalPages = document.getElementById("goals").value;
//     // let goalChapters = document.getElementById("chapters").value;

//     // let books = [];
//     // let newBooks = books.push(title, author, genre, goalPages, goalChapters);
//     // console.log(newBooks);
//   });
// }

// //function for updating book entries
// function updateBooks(book) {
//   $.ajax({
//     url: BOOK_URL + "/" + book.id,
//     method: "PUT",
//     data: book,
//     success: function(data) {
//       getAndDisplaybookEntry();
//     }
//   });
// }

// //function for deleting book
// function deleteBook(id) {
//   $.ajax({
//     url: BOOK_URL + "/" +book.id,
//     method: "DELETE",
//     success: getAndDisplaybookEntry
//   });
// }

// //event listener for delete button
// function handleDelete() {
//   $(".deleteButton").on("click", ".deleteButton", function(e) {
//     e.preventDefault();
//     deleteBook(
//       $(e.currentTarget)
//       .attr("id")
//     );
//   });
// }

// //event listener for cancel button 
// function handleCancelButton() {
//   $("#cancelButton").on("click", "#cancelButton", function(e) {
//     e.preventDefault();
//     getAndDispalyBookProfile();
//   })
// }
 
// //when the page loads
// $(function() {
//   getAndDispalyBookProfile();
//   handleDelete();
//   handleBookAdd();

//   handleCancelButton();
// })


//on page load run this function
$(function() {
  getAndDispalyBookProfile();
})