const serverBase = "//localhost:5050/";
const BOOK_URL = serverBase + "books";

// main GET request to display all the current books
function getAndDisplayBooks() {
  $.getJSON(BOOK_URL, function(books) {
    console.log(books);
    for (let i = 0; i < books.books.length; i++) {
      $('.bookList').append(
        '<div class="new-book">' +
          '<p>' + books.books[i].title + " by " + books.books[i].author + '</p>' + 
          '<p>' + "Genre: " +  books.books[i].genre + '</p>' +
          '<p>' + "Goal: " + books.books[i].goalPages + " pages " + " or " +  books.books[i].goalChapters + " chapters " + '</p>' +
          '<button type="button" class="updateButton" role="button"><i class="material-icons">create</i></button>' +
          '<button type="button" class="deleteButton" role="button"><i class="material-icons">delete</></button>' +
        '</div>');
        document.querySelector(".new-book").setAttribute("id", books.books[i]._id);
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

// DELETE request for book
function deleteBook() {
  let book = document.getElementsByClassName('new-book');
  let id = book.id;
  $.ajax({
    url: BOOK_URL + "/" + id,
    method: "DELETE",
    success: console.log('book deleted')
  });
  window.location.href = "/";
}

//event handler for the delete button
function handleBooksDelete() {
  $(".bookList").on("click", ".deleteButton", function(e) {
    e.preventDefault();
    deleteBook(
      $(e.currentTarget)
        .closest(".new-book")
        .attr("id")
    );
  });
}

// PUT request for book
function updateBook(book) {
  let id = updatedBook.id;
  console.log(updateBook.id);
  $.ajax({
    url: BOOK_URL + "/" + id,
    method: "PUT",
    data: JSON.stringify(updatedBook),
    success: function(data) {
      getAndDisplayBooks();
      console.log("working");
    },
    dataType: "json",
    contentType: "application/json"
  });
  console.log("now");
  // window.location.href = "/";
}

// event handler for update button on form submission
function handleBooksUpdate() {
  $(".update-form").on("click", ".updatingButton", function(e) {
    e.preventDefault();
    updateBook({
      title: updatedBook.title,
      author: updatedBook.author,
      genre: updatedBook.genre,
      goalPages: updatedBook.goalPages,
      goalChapters: updatedBook.goalChapters
    });
  });
  //     $(e.currentTarget)
  //     .closest(".new-book")
  //     .attr("id")
  //   )
  //   const book = document.getElementsByClassName('new-book');
  //   const id = $("#id").val(); 
  //   const books = {};
  //   updatedBook.title = book.title
  //   updatedBook.author = book.author
  //   updatedBook.genre = book.genre
  //   updatedBook.goalPages = $("#pages").val();
  //   updatedBook.goalChapters = $("#chapters").val();
  //   const updatedBooks = books.push(updatedBook);
  // });
};

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