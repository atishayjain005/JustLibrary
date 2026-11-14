console.log("This is ES6 version of JustLibrary");

var bookList = {};
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;

    }
}


class Display {
    add(book) {
        let tableBody = document.getElementById("tableBody");
        const row = document.createElement('tr');
        for (const value of [book.name, book.author, book.type]) {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.append(cell);
        }
        const actions = document.createElement('td');
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-outline-primary';
        button.textContent = 'Delete';
        button.addEventListener('click', () => removeBook(button));
        actions.append(button);
        row.append(actions);
        tableBody.append(row);
    }
    clear() {
        let libraryForm = document.getElementById("libraryForm");
        libraryForm.reset();
    }
    validate(book) {
        if (!book || typeof book.name !== "string" || typeof book.author !== "string" || book.name.trim().length < 2 || book.author.trim().length < 2) {
            return false;
        } else {
            return true;
        }
    }
    show(type, displayMessage) {
        let message = document.getElementById('message');
        message.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                <strong>Message:</strong> ${displayMessage}
                <button type="button" class=" py-0 close btn btn-outline-dark border-0 bg-transparent float-end "  data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
        </div>`
        setTimeout(() => {
            message.innerHTML = '';
        }, 2000);
    };
}
//Add submit event listner to form library form
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);

function libraryFormSubmit(e) {
    e.preventDefault();
    let name = document.getElementById("bookName").value.trim();
    let author = document.getElementById("author").value.trim();
    let type;
    let fiction = document.getElementById("fiction");
    let programming = document.getElementById("programming");
    let cooking = document.getElementById("cooking");

    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();
    if (display.validate(book)) {
        const books = JSON.parse(localStorage.getItem("bookList") || "[]");
        books.push(book);
        localStorage.setItem("bookList", JSON.stringify(books));
        display.add(book);
        display.clear();
        display.show("success", "Your book has been added");
    } else {
        display.show("danger", "Sorry you cannot add this book ");
    }
    e.preventDefault();
}


function showData() {

    if (localStorage.getItem('bookList')) {
        let showBookList = JSON.parse(localStorage.getItem('bookList'));
        console.log(showBookList)
        let tableBody = document.getElementById("tableBody");
        tableBody.innerText = '';
        let showDisplay = new Display();
        for (let i = 0; i < showBookList.length; i++) {
            const element = showBookList[i];
            if (showDisplay.validate(element)) {
                showDisplay.add(element);
            }
        }
    }
}


function removeBook(element) {
    let index = element.parentNode.parentNode.rowIndex;
    let deleteBook = localStorage.getItem('bookList');
    if (deleteBook == null) {
        delBook = [];
    } else {
        delBook = JSON.parse(deleteBook);
    }
    delBook.splice(index - 1, 1);
    console.log(delBook);
    localStorage.setItem("bookList", JSON.stringify(delBook));
    showData();
}
showData();


//customization
var i = 0;

function change() {
    var doc = document.getElementById("bgColor");
    var color = [
        "#282828",
        "#425a45",
        "#6a1e1e",
    ];
    doc.style.backgroundColor = color[i];
    i = (i + 1) % color.length;
}
setInterval(change, 2000);