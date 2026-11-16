function readBooks() {
    try {
        const saved = localStorage.getItem('bookList');
        const books = saved === null ? [] : JSON.parse(saved);
        if (!Array.isArray(books)) throw new Error('Invalid library');
        return books;
    } catch {
        new Display().show('danger', 'Your saved library could not be read. Existing data has been preserved. Check browser storage and reload.');
        return null;
    }
}

function saveBooks(books) {
    try {
        localStorage.setItem('bookList', JSON.stringify(books));
        return true;
    } catch {
        new Display().show('danger', 'Your changes could not be saved. Check browser storage permissions or space and try again.');
        return false;
    }
}

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
    add(book, index, snapshot) {
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
        button.addEventListener('click', () => removeBook(index, snapshot));
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
        message.replaceChildren();
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = displayMessage;
        const close = document.createElement('button');
        close.type = 'button';
        close.className = 'btn btn-outline-dark ms-3';
        close.textContent = 'Dismiss';
        close.addEventListener('click', () => {
            message.replaceChildren();
            document.getElementById('bookName').focus();
        });
        alert.append(close);
        message.append(alert);

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
        const books = readBooks();
        if (!books) return;
        books.push(book);
        if (!saveBooks(books)) return;
        showData();
        display.clear();
        document.getElementById("bookName").focus();
        display.show("success", "Your book has been added");
    } else {
        display.show("danger", "Enter at least two non-space characters for both name and author.");
        document.getElementById(name.length < 2 ? "bookName" : "author").focus();
    }
    e.preventDefault();
}


function showData() {

    const showBookList = readBooks();
    if (!showBookList) return;
    const tableBody = document.getElementById('tableBody');
    tableBody.replaceChildren();
    const display = new Display();
    const snapshot = JSON.stringify(showBookList);
    showBookList.forEach((book, index) => {
        if (display.validate(book)) display.add(book, index, snapshot);
    });
    document.getElementById("emptyState").hidden = tableBody.children.length > 0;
}


function removeBook(index, snapshot) {
    const delBook = readBooks();
    if (!delBook) return;
    if (JSON.stringify(delBook) !== snapshot) {
        showData();
        new Display().show('warning', 'Your library changed in another tab. Review the updated list before deleting.');
        return;
    }
    delBook.splice(index, 1);
    if (!saveBooks(delBook)) return;
    showData();
    document.getElementById("bookName").focus();
    new Display().show("success", "Book deleted.");
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
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setInterval(change, 2000);