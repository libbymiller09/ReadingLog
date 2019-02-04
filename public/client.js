const serverBase = "//localhost:5050/";
const BOOK_URL = serverBase + "books";

// main GET request to display all the current books
function getAndDisplayBooks() {
  $.getJSON(BOOK_URL, function(books) {
    console.log(books);
    for (let i = 0; i < books.books.length; i++) {
      $('.bookList').append(
        '<div class="new-book" id=' + books.books[i]._id + '>'  +
          '<p>' + books.books[i].title + " by " + books.books[i].author + '</p>' + 
          '<p>' + "Genre: " +  books.books[i].genre + '</p>' +
          '<p>' + "Goal: " + books.books[i].goalPages + " pages " + " or " +  books.books[i].goalChapters + " chapters " + '</p>' +
          '<button type="button" class="updateButton" role="button"><i class="material-icons">create</i></button>' +
          '<button type="button" class="deleteButton" role="button"><i class="material-icons">delete</></button>' +
        '</div>');
        // document.querySelector(".new-book").setAttribute("id", books.books[i]._id);
    } 
  });
}

// POST request to add a new book
function addBooks(book) {
  let item = $('js-query');
  let book = {item: item.val()};

  $.ajax({
    method: "POST",
    url: BOOK_URL,
    data: JSON.stringify(book),
    success: function(data) {
      getAndDisplayBooks();
    },
    dataType: "json",
    contentType: "application/json"
  });
}

//event handler for submit of add form
function handleBooksAdd() {
  $("#addButton").on("submit", (function(e) {
    e.preventDefault();
    const books = {};
    newBook.title = $("#title").val();
    newBook.author = $("#author").val();
    newBook.genre = $("#genre").val();
    newBook.goalPages = $("#pages").val();
    newBook.goalChapters = $("#chapters").val();
    const allBooks = books.push(newBook);
  })
  );
}

//DELETE request
//event handler for the delete button
function handleBooksDelete() {
  $(".bookList").on("click", ".deleteButton", function(e) {
    e.preventDefault();

    const id = $(e.target).parent().attr("id");

    $.ajax({
      url: BOOK_URL + "/" + id,
      method: "DELETE",
      success: console.log('book deleted')
    });
    window.location.href = "/";
  })
}
// let updatedData = {
//   id: bookId,
//   title: $('input[id="title"]').val(),
//   author: $('input[id="author"]').val(),
//   genre: $('input[id="genre"]').val(),
//   goalPages: $('input[id="pages"]').val(),
//   goalChapters: $('input[id="chapters"]').val(),
// };
// updateBook(updatedData );

function updateBook(book) {
  console.log("updating book `" + id + "`");
  $.ajax({
    url: "localhost:5050/books/5c588a7093741ac8e591e792",
    method: "PUT",
    data: JSON.stringify(book),
    success: function(data) {
      getAndDisplayBooks();
    },
    dataType: "json",
    contentType: "application/json"
  });
  // window.location.href = "/";
}
    
function handleBooksUpdate() {
  $("#formUpdateButton").on("submit", function(e) {
    e.preventDefault();
    let updatedData = {
      id: bookId,
      title: $('input[id="title"]').val(),
      author: $('input[id="author"]').val(),
      genre: $('input[id="genre"]').val(),
      goalPages: $('input[id="pages"]').val(),
      goalChapters: $('input[id="chapters"]').val(),
    };
    updateBook(updatedData );
  })
}

//event handler for update button to pull up update form
function handleUpdateButton() {
  $(".bookList").on("click", ".updateButton", function(e) {
    e.preventDefault();
    window.location.href = "/books/update";
  });
}

//event handler for the cancel button
function handleCancelButton() {
  $('.addForm').on("click", ".cancelButton", function(e) {
    event.preventDefault();
    window.location.href = "/"
  });
}

$(function() {
  getAndDisplayBooks();
  handleBooksAdd();

  handleBooksDelete();  
  handleBooksUpdate();
  
  handleUpdateButton();
  handleCancelButton();
});