var newBookButton = document.getElementById("add-button");
var newBookWindow = document.getElementById("add-book-window");
var newBookTextField = document.getElementsByTagName("input");
var newBookSubmitButton = document.getElementById("add-book-submit-button");

var removeBookButton = document.getElementById("remove-button");
var trTags = document.getElementById("table-books").getElementsByTagName("tr");
var selectedElement = null;
var selectedNames = [];

function DeselectTr(deselecting) {
    "use strict";
    var trTag;
    
    var index;
    for (index = 0; index < deselecting.length; index++) {
        deselecting[index].className = "";
    }
}

function ThOnClick(th) {
    "use strict";
    th.onclick = function () {
        var shouldSelect = false;
        var tr = th.parentElement;
        
        DeselectTr(trTags);
        
        var trTag;
        for (trTag in trTags) {
            if (trTags[trTag] === tr && tr.className === "") {
                shouldSelect = true;
                break;
            }
        }
        if (shouldSelect) {
            tr.className = "selected";
            selectedElement = tr;
            var elementContainers = tr.getElementsByTagName("th");
            
            var index;
            for (index = 0; index < elementContainers.length; index++) {
                selectedNames[index] = elementContainers[index].textContent;
            }
        }
    };
}

function RefreshBookTable() {
    "use strict";
    var tbody = document.getElementById("table-books");
    DeselectTr(trTags);
    
    var index = 1;
    for (index; index < books.GetAllBooks().length + 1; index++) {
        if (index < trTags.length) {
            var thTags = trTags[index].getElementsByTagName("th");
            thTags[0].textContent = books.GetAllBooks()[index - 1].name;
            thTags[1].textContent = authors.GetAuthorByID(books.GetAllBooks()[index - 1].authorID).name;
            thTags[2].textContent = genres.GetGenreByID(books.GetAllBooks()[index - 1].genreID).name;
        } else {
            var newTrTag = document.createElement("tr");
            tbody.appendChild(newTrTag);
            
            var newThBook = document.createElement("th");
            newThBook.textContent = books.GetAllBooks()[index - 1].name;
            ThOnClick(newThBook);
            newTrTag.appendChild(newThBook);
            
            var newThAuthor = document.createElement("th");
            newThAuthor.textContent = authors.GetAuthorByID(books.GetAllBooks()[index - 1].authorID).name;
            ThOnClick(newThAuthor);
            newTrTag.appendChild(newThAuthor);
            
            var newThGenre = document.createElement("th");
            newThGenre.textContent = genres.GetGenreByID(books.GetAllBooks()[index - 1].genreID).name;
            ThOnClick(newThGenre);
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
        var removedBook = books.RemoveBook(books.GetBookByNames(selectedNames[0], selectedNames[1], selectedNames[2]).id);
        RefreshBookTable();
    }
}

newBookButton.onclick = function () {
    if (newBookWindow.classList == "") {
        newBookWindow.classList = "window-open";
    }
}

newBookSubmitButton.onclick = function () {
    var authorInfo = newBookTextField[1].value.toString().split("_");
    
    var authorString = String(authorInfo[0])
    var tempAuthor = authors.GetAuthorByName(authorString);
    if (tempAuthor == undefined) {
        tempAuthor = authors.CreateAuthor(authorString, parseInt(authorInfo[1]));
    }
    tempAuthor = authors.GetAuthorByName(authorString);
    
    var genreString = String(newBookTextField[2].value);
    var tempGenre = genres.GetGenreByName(genreString);
    if (tempGenre == undefined) {
        tempGenre = genres.CreateGenre(newBookTextField[2].value);
    }
    tempGenre = genres.GetGenreByName(genreString);
    
    books.CreateBook(newBookTextField[0].value, tempAuthor.id, tempGenre.id);
    var index;
    for (index = 0; index < newBookTextField.length; index++) {
        newBookTextField[index].value = "";
    }
    
    RefreshBookTable();
    newBookWindow.classList = "";
}

RefreshBookTable();