// main GET request to display all the current books
function getAndDisplayBooks() {
  $.getJSON('/books/', function(books) {
    console.log(books);
    for (let i = 0; i < books.books.length; i++) {
      $('.bookList').append(
        '<div class="new-book" id=' + books.books[i]._id + '>'  +
          '<p>' + books.books[i].title + " by " + books.books[i].author + '</p>' + 
          '<p>' + "Genre: " +  books.books[i].genre + '</p>' +
          '<button type="button" class="updateButton" role="button"><i class="material-icons">create</i></button>' +
          '<button type="button" class="deleteButton" role="button"><i class="material-icons">delete</i></button>' +
          '<p>' + "Goal: " + books.books[i].goalPages + " pages " + " or " +  books.books[i].goalChapters + " chapters " + '</p>' +
          '<div id="border"></div>' + 
        '</div>');
    } 
  });
}

// POST request to add a new book
function addBooks(book) {
  let item = $('js-query');
  let thisBook = {item: item.val()};

  $.ajax({
    method: "POST",
    url: '/books/add',
    data: JSON.stringify(thisBook),
    success: function(data) {
      getAndDisplayBooks();
    },
    dataType: "json",
    contentType: "application/json"
  });
}

// event handler for submit of add form
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

//DELETE request and event handler for delete button
function handleBooksDelete() {
  $(".bookList").on("click", ".deleteButton", function(e) {
    e.preventDefault();

    const id = $(e.target).parent().attr("id");

    $.ajax({
      url: '/books/' + id,
      method: "DELETE",
      success: console.log('book deleted')
    });
    window.location.href = "/books/add";
  })
}

// event handler for put request
function handleUpdateButton(book) {
  $(".bookList").on("click", ".updateButton", function(e) {
    e.preventDefault();
    const id = $(e.target).parent().attr("id");
    console.log(id);

    let book = {};
      book.id = id;
      book.title = $('#title').val();
      book.author = $('#author').val();
      book.genre = $('#genre').val();
      book.goalPages = $('#pages').val();
      book.goalChapters = $('#chapters').val(); 
      console.log(book);

    $.ajax({
      url: '/books/' + id,
      method: "PUT",
      data: JSON.stringify(book),
      success: console.log(book),
      dataType: "json",
      contentType: "application/json"
    });
    window.location.href = "/books/update";
  });
}

// functions to be ran on page load
$(function() {
  getAndDisplayBooks();
  handleBooksAdd();
  handleUpdateButton();
  handleBooksDelete();  
});