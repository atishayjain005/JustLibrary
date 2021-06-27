console.log("This is ES6 version of JustLibrary");

var bookList = {};
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;

        bookList = {
            "name": this.name,
            "author": this.author,
            "type": this.type
        }
        let Books = localStorage.getItem('bookList');
        if (Books) {
            Books = JSON.parse(Books);
            Books.push(bookList);
        } else {
            Books = [bookList];
        }
        localStorage.setItem('bookList', JSON.stringify(Books));
    }
}


class Display {
    add(book) {
        let tableBody = document.getElementById("tableBody");
        let uiString = ` 
        <tr>
           <td>${book.name}</td>
           <td>${book.author}</td>
           <td>${book.type}</td>
           <td class="text-center"><button class = " btn btn-outline-primary " onclick="removeBook(this)">Delete</button></td>
        </tr>`;
        tableBody.innerHTML += uiString;
    }
    clear() {
        let libraryForm = document.getElementById("libraryForm");
        libraryForm.reset();
    }
    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
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
    console.log("you have submitted ");
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
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