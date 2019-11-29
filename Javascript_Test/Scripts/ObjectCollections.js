"use strict";

/* Generic Methods */
///////////////////////////////////////////////////////////////////////////////////////////////////
// Sorts items by name.
function CompareByName(itemA, itemB) {
    var returnValue = 0;
    
    if (itemA.name < itemB.name) {
        returnValue = -1;
    }
    else if (itemA.name > itemB.name) {
        returnValue = 1;
    }
    
    return returnValue;
}

// Adds an item to a given array based on a given item's ID.
function AddItemToArray(item, itemArray) {
    itemArray.push(item);
    itemArray.sort(function (itemA, itemB) {
        return CompareByName(itemA, itemB);
    });
}

// Gets an item from a given array based on a given itemID.
// Returns the item of the corrisponding itemID. Returns null if item is not found.
function GetItemFromArray(itemID, itemArray) {
    return itemArray.find(function(element) {
        return element.id === itemID
    });
}

// Removes an item from a given array based on a given itemID.
// Returns the removed item. Returns null if item is not found.
function RemoveItemFromArray(itemID, itemArray) {
    var returnMe = null;
    
    if (itemArray.length === 1 && itemArray[0].id === itemID) {
        returnMe = itemArray.pop();
    } else if (itemArray.length > 1) {
        var toRemove = GetItemFromArray(itemID, itemArray);
            
        if (toRemove !== null) {
            var swapIndex = itemArray.indexOf(toRemove);
            
            itemArray[swapIndex] = itemArray[itemArray.length - 1];
            itemArray[itemArray.length - 1] = toRemove;
        
            returnMe = itemArray.pop();
            itemArray.sort(function (itemA, itemB) {
                return CompareByName(itemA, itemB);
            });
        }
    }
    return returnMe;
}

/* Object Collections */
///////////////////////////////////////////////////////////////////////////////////////////////////
var authors = {
    authorsArray : [],
    
    CreateAuthor : function (name, age) {
        var newAuthor = new Author(name, age);
        return AddItemToArray(newAuthor, this.authorsArray);
    },
    
    GetAuthorByID : function (authorID) {
        return GetItemFromArray(authorID, this.authorsArray);
    },
    
    GetAuthorByName : function (name) {
        return this.authorsArray.find(function (author) {
            return author.name == name;
        });
    },
    
    GetAllAuthors : function () {
        return this.authorsArray;
    },
    
    UpdateAuthorByID : function (authorID, newName, newAge) {
        var updatingAuthor = new GetItemFromArray(authorID, this.authorsArray);
        if (updatingAuthor.name !== newName) {
            updatingAuthor.UpdateName(newName);
        }
        if (updatingAuthor.age !== newAge) {
            updatingAuthor.UpdateAge(newAge);
        }
    },
    
    RemoveAuthor : function (authorID) {
        return RemoveItemFromArray(authorID, this.authorsArray);
    }
};

var genres = {
    genresArray : [],
    
    CreateGenre : function (name) {
        var newGenre = new Genre(name);
        return AddItemToArray(newGenre, this.genresArray);
    },
    
    GetGenreByID : function (genreID) {
        return GetItemFromArray(genreID, this.genresArray);
    },
    
    GetGenreByName : function (name) {
        return this.genresArray.find(function (genre) {
            return genre.name == name
        });
    },
    
    GetAllGenres : function () {
        return this.genresArray;
    },
    
    UpdateGenreByID : function (genreID, newName) {
        var updatingGenre = new GetItemFromArray(genreID, this.genresArray);
        if (updatingGenre.name !== newName) {
            updatingGenre.UpdateName(newName);
        }
    },
    
    RemoveGenre : function (genreID) {
        return RemoveItemFromArray(genreID, this.genresArray);
    }
};

var books = {
    booksArray : [],
    
    CreateBook : function (name, authorID, genreID) {
        var newBook = new Book(name, authorID, genreID);
        return AddItemToArray(newBook, this.booksArray);
    },
    
    GetBookByID : function (bookID) {
        return GetItemFromArray(bookID, this.booksArray);
    },
    
    GetBookByNames : function (name, author, genre) {
        return this.booksArray.find(function(book) {
            return book.name === name && authors.GetAuthorByID(book.authorID).name === author && genres.GetGenreByID(book.genreID).name === genre
        });
    },
    
    GetAllBooks : function () {
        return this.booksArray;
    },
    
    UpdateBookByID : function (bookID, newName, newAuthor, newGenre) {
        var updatingBook = new GetItemFromArray(bookID, this.booksArray);
        if (updatingBook.name !== newName) {
            updatingBook.UpdateName(newName);
        }
        if (updatingBook.authorID !== newAuthor.id) {
            updatingBook.UpdatAuthorID(newAuthor);
        }
        if (updatingBook.genreID !== newGenre.id) {
            updatingBook.UpdateGenreID(newGenre);
        }
    },
    
    RemoveBook : function (bookID) {
        return RemoveItemFromArray(bookID, this.booksArray);
    }
};

authors.CreateAuthor("Tolken, J.R.", 127);
authors.CreateAuthor("Ludlum, Robert", 92);
authors.CreateAuthor("Doran, John P.", 35);

genres.CreateGenre("Tutorials");
genres.CreateGenre("Fantasy");
genres.CreateGenre("Spy Fiction");

books.CreateBook("The Bourne Identity", 2, 3);
books.CreateBook("The Lord of the Rings: The Two Towers", 1, 2);
books.CreateBook("Unity 5: Learning C# by Developing Games", 3, 1);
books.CreateBook("Building an FPS Game with Unity", 3, 1);
books.CreateBook("The Hobbit", 1, 2);
books.CreateBook("The Bourne Ultimatum", 2, 3);