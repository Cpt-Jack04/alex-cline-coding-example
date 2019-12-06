"use strict";

var newBookButton = document.getElementById("add-button");
var newBookWindow = document.getElementById("add-book-window");
var newBookTextField = document.getElementsByTagName("input");
var newBookSubmitButton = document.getElementById("add-book-submit-button");

var removeBookButton = document.getElementById("remove-button");
var trTags = document.getElementById("table-books").getElementsByTagName("tr");
var selectedElement = null;
var selectedNames = [];

function deselectTr(deselecting) {
    var trTag;
    
    var index;
    for (index = 0; index < deselecting.length; index++) {
        deselecting[index].className = "";
    }
}

function thOnClick(th) {
    th.onclick = function () {
        var tr = th.parentElement;
        
        deselectTr(trTags);
        
        tr.className = "selected";
        selectedElement = tr;
        var elementContainers = tr.getElementsByTagName("th");

        var index;
        for (index = 0; index < elementContainers.length; index++) {
            selectedNames[index] = elementContainers[index].textContent;
        }
    };
}

function refreshBookTable() {
    var tbody = document.getElementById("table-books");
    deselectTr(trTags);
    
    var index = 1;
    for (index; index < books.getAllBooks().length + 1; index++) {
        if (index < trTags.length) {
            var thTags = trTags[index].getElementsByTagName("th");
            thTags[0].textContent = books.getAllBooks()[index - 1].name;
            thTags[1].textContent = authors.getAuthorByID(books.getAllBooks()[index - 1].authorID).name;
            thTags[2].textContent = genres.getGenreByID(books.getAllBooks()[index - 1].genreID).name;
        } else {
            var newTrTag = document.createElement("tr");
            tbody.appendChild(newTrTag);
            
            var newThBook = document.createElement("th");
            newThBook.textContent = books.getAllBooks()[index - 1].name;
            thOnClick(newThBook);
            newTrTag.appendChild(newThBook);
            
            var newThAuthor = document.createElement("th");
            newThAuthor.textContent = authors.getAuthorByID(books.getAllBooks()[index - 1].authorID).name;
            thOnClick(newThAuthor);
            newTrTag.appendChild(newThAuthor);
            
            var newThGenre = document.createElement("th");
            newThGenre.textContent = genres.getGenreByID(books.getAllBooks()[index - 1].genreID).name;
            thOnClick(newThGenre);
            newTrTag.appendChild(newThGenre);
        }
    }
    
    if (index < trTags.length) {
        var removeIndex = trTags.length - 1;
        for (removeIndex; removeIndex >= index; removeIndex--) {
            tbody.removeChild(trTags[removeIndex]);
        }
    }
    
    trTags = tbody.getElementsByTagName("tr");
}

removeBookButton.onclick = function () {
    if (selectedElement !== null) {
        var removedBook = books.removeBook(books.getBookByNames(selectedNames[0], selectedNames[1], selectedNames[2]).id);
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
    var authorInfo = newBookTextField[1].value.toString().split("_");
    
    var authorString = String(authorInfo[0]);
    var tempAuthor = authors.getAuthorByName(authorString);
    if (tempAuthor === undefined) {
        tempAuthor = authors.createAuthor(authorString, parseInt(authorInfo[1], 10));
    }
    tempAuthor = authors.getAuthorByName(authorString);
    
    var genreString = String(newBookTextField[2].value);
    var tempGenre = genres.getGenreByName(genreString);
    if (tempGenre === undefined) {
        tempGenre = genres.createGenre(newBookTextField[2].value);
    }
    tempGenre = genres.getGenreByName(genreString);
    
    books.createBook(newBookTextField[0].value, tempAuthor.id, tempGenre.id);
    
    var index;
    for (index = 0; index < newBookTextField.length; index++) {
        newBookTextField[index].value = "";
    }
    
    refreshBookTable();
    newBookWindow.classList = "";
};

refreshBookTable();