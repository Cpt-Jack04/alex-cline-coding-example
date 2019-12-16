"use strict";

let newBookButton = document.getElementById("add-button");
let newBookWindow = document.getElementById("add-book-window");
let newBookTextField = document.getElementsByTagName("input");
let newBookSubmitButton = document.getElementById("add-book-submit-button");

let removeBookButton = document.getElementById("remove-button");
let trTags = document.getElementById("table-books").getElementsByTagName("tr");
let selectedElement = null;
let selectedNames = [];

function deselectTr(deselecting) {
    for (let index = 0; index < deselecting.length; index++) {
        deselecting[index].className = "";
    }
}

function thOnClick(th) {
    th.onclick = function () {
        let tr = th.parentElement;
        
        deselectTr(trTags);
        
        tr.className = "selected";
        selectedElement = tr;
        let elementContainers = tr.getElementsByTagName("th");

        for (let index = 0; index < elementContainers.length; index++) {
            selectedNames[index] = elementContainers[index].textContent;
        }
    };
}

async function refreshBookTable() {
    let tbody = document.getElementById("table-books");
    deselectTr(trTags);
    
    if (books.booksArray.length === 0) {
        let allAuthors = await axios.get("http://api.training.theburo.nl/authors");
        authors.authorsArray = allAuthors.data;

        let allGenres = await axios.get("http://api.training.theburo.nl/genres");
        genres.genresArray = allGenres.data;

        let allBooks = await axios.get("http://api.training.theburo.nl/books");
        books.booksArray = allBooks.data;
        books.booksArray.sort(compareByName);
    }

    let index = 1
    for (index; index < books.getAllBooks().length + 1; index++) {
        if (index < trTags.length) {
            let thTags = trTags[index].getElementsByTagName("th");

            thTags[0].textContent = books.getAllBooks()[index - 1].name;
            thTags[1].textContent = authors.getAuthorByID(books.getAllBooks()[index - 1].author_id).name;
            thTags[2].textContent = genres.getGenreByID(books.getAllBooks()[index - 1].genre_id).name;
        } else {
            let newTrTag = document.createElement("tr");
            tbody.appendChild(newTrTag);
            
            // Book
            let newThBook = document.createElement("th");
            newThBook.textContent = books.getAllBooks()[index - 1].name;
            thOnClick(newThBook);
            newTrTag.appendChild(newThBook);
            
            // Author
            let newThAuthor = document.createElement("th");
            newThAuthor.textContent = authors.getAuthorByID(books.getAllBooks()[index - 1].author_id).name;
            thOnClick(newThAuthor);
            newTrTag.appendChild(newThAuthor);
            
            // Genre
            let newThGenre = document.createElement("th");
            newThGenre.textContent = genres.getGenreByID(books.getAllBooks()[index - 1].genre_id).name;
            thOnClick(newThGenre);
            newTrTag.appendChild(newThGenre);
        }
    }
    
    if (index < trTags.length) {
        for (let removeIndex = trTags.length - 1; removeIndex >= index; removeIndex--) {
            tbody.removeChild(trTags[removeIndex]);
        }
    }
    
    trTags = tbody.getElementsByTagName("tr");
}

removeBookButton.onclick = function () {
    if (selectedElement !== null) {
        let removedBook = books.removeBook(books.getBookByNames(selectedNames[0], selectedNames[1], selectedNames[2]).id);
        refreshBookTable();
    }
};

newBookButton.onclick = function () {
    if (newBookWindow.classList == "") {
        newBookWindow.classList = "window-open";
    } else if (newBookWindow.classList == "window-open") {
        newBookWindow.classList = "";
    }
};

newBookSubmitButton.onclick = function () {
    let authorInfo = newBookTextField[1].value.toString().split("_");
    
    let authorString = String(authorInfo[0]);
    let tempAuthor = authors.getAuthorByName(authorString);
    if (tempAuthor === undefined) {
        tempAuthor = authors.createAuthor(authorString, parseInt(authorInfo[1], 10));
    }
    tempAuthor = authors.getAuthorByName(authorString);
    
    let genreString = String(newBookTextField[2].value);
    let tempGenre = genres.getGenreByName(genreString);
    if (tempGenre === undefined) {
        tempGenre = genres.createGenre(newBookTextField[2].value);
    }
    tempGenre = genres.getGenreByName(genreString);
    
    books.createBook(newBookTextField[0].value, tempAuthor.id, tempGenre.id);
    
    for (let index = 0; index < newBookTextField.length; index++) {
        newBookTextField[index].value = "";
    }
    
    refreshBookTable();
    newBookWindow.classList = "";
};

refreshBookTable();