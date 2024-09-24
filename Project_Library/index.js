// Get form elements
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");

// Book constructor function
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Toggle the read status for a book
Book.prototype.toggleReadStatus = function () {
  this.read = !this.read; // Toggle the read status
};

// Instantiate myLibrary with Book instances
const myLibrary = [
  new Book("The Hobbit", "J.R.R. Tolkien", 310, true),
  new Book("The Lord of the Rings", "J.R.R. Tolkien", 1178, false),
];

// Add book to library
function addBookToLibrary(e) {
  e.preventDefault();

  const newBook = new Book(
    title.value,
    author.value,
    Number(pages.value),
    read.checked
  );
  myLibrary.push(newBook);

  displayBook(newBook);
}

// Display book information
function displayBook(book) {
  const createCard = document.createElement("div");
  const data_index = document.createAttribute("data-index");
  const deleteButton = document.createElement("button");
  const readToggleButton = document.createElement("button");

  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete");

  // Set the data index attribute
  data_index.value = myLibrary.indexOf(book);
  createCard.classList.add("card");
  createCard.setAttributeNode(data_index);

  // Create book info elements
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const readStatus = document.createElement("p");

  // Add book details to the card
  title.textContent = `Title: ${book.title}`;
  author.textContent = `Author: ${book.author}`;
  pages.textContent = `Pages: ${book.pages}`;
  readStatus.textContent = book.read ? "Read" : "Not Read";

  // Append elements to card
  createCard.appendChild(title);
  createCard.appendChild(author);
  createCard.appendChild(pages);
  createCard.appendChild(readStatus);
  createCard.appendChild(readToggleButton);
  createCard.appendChild(deleteButton);

  // Add card to body
  document.body.appendChild(createCard);

  // Event listener for toggle read button
  readToggleButton.textContent = book.read
    ? "Mark as Not Read"
    : "Mark as Read";

  readToggleButton.addEventListener("click", () => {
    book.toggleReadStatus(); // Toggle read status
    readStatus.textContent = book.read ? "Read" : "Not Read"; // Update read status text
    readToggleButton.textContent = book.read
      ? "Mark as Not Read"
      : "Mark as Read"; // Update button text
  });

  // Event listener for delete button
  deleteButton.addEventListener("click", () => {
    myLibrary.splice(myLibrary.indexOf(book), 1); // Remove from library
    createCard.remove(); // Remove the card from the DOM
  });
}

// Form submission event listener
const form = document.getElementById("form");
form.addEventListener("submit", addBookToLibrary);

// Display existing books on page load
myLibrary.forEach((book) => displayBook(book));
