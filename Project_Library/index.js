const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");

const myLibrary = [
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    pages: 310,
    read: true,
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    pages: 1178,
    read: false,
  },
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

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

function displayBook(book) {
  const createCard = document.createElement("div");
  const data_index = document.createAttribute("data-index");
  const deleteButton = document.createElement("button");
  const toggleRead = document.createElement("button");
  const toggleNotRead = document.createElement("button");
  toggleRead.textContent = "Read";
  toggleNotRead.textContent = "Not Read";
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete");

  data_index.value = myLibrary.indexOf(book) + 1;
  createCard.classList.add("card");
  document.body.appendChild(createCard);

  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const read = document.createElement("p");
  createCard.appendChild(title);
  createCard.appendChild(author);
  createCard.appendChild(pages);
  createCard.appendChild(read);
  createCard.appendChild(toggleRead);
  createCard.appendChild(toggleNotRead);

  createCard.setAttributeNode(data_index);
  createCard.appendChild(deleteButton);

  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pages;
  read.textContent = book.read ? "Read" : "Not Read";

  deleteButton.addEventListener("click", () => {
    myLibrary.splice(myLibrary.indexOf(book), 1);
    createCard.remove();
  });

  toggleRead.addEventListener("click", () => {
    book.read = true;
    read.textContent = "Read";
  });
  toggleNotRead.addEventListener("click", () => {
    book.read = false;
    read.textContent = "Not Read";
  });
}

const form = document.getElementById("form");
form.addEventListener("submit", addBookToLibrary);

for (let index = 0; index < myLibrary.length; index++) {
  displayBook(myLibrary[index]);
}
