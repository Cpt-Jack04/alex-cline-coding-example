/* Generic Methods */
///////////////////////////////////////////////////////////////////////////////////////////////////
// Adds an item to a given array based on a given item's ID.
function AddItemToArray(item, itemArray) {
    "use strict";
    itemArray.push(item);
    itemArray.sort(function (a, b) {
        var returnValue = 0;
        
        if (a.name < b.name) {
            returnValue = -1;
        }
        if (a.name > b.name) {
            returnValue = 1;
        }
        return returnValue;
    });
}

/// Returns true if the given item.id matches itemID.
function MyIDMatches(itemID, item) {
    "use strict";
    return item.id === itemID;
}

// Gets an item from a given array based on a given itemID.
// Returns the item of the corrisponding itemID. Returns null if item is not found.
function GetItemFromArray(itemID, itemArray) {
    "use strict";
    var returnMe;
    
    var index;
    for (index = 0; index < itemArray.length; index++) {
        if (MyIDMatches(itemID, itemArray[index])) {
            returnMe = itemArray[index];
            break;
        }
    }
    return returnMe;
}

// Removes an item from a given array based on a given itemID.
// Returns the removed item. Returns null if item is not found.
function RemoveItemFromArray(itemID, itemArray) {
    "use strict";
    var returnMe = null;
    
    if (itemArray.length === 1 && itemArray[0].id === itemID) {
        returnMe = itemArray.pop();
    } else if (itemArray.length > 1) {
        var toRemove = GetItemFromArray(itemID, itemArray);
            
        if (toRemove !== null) {
            var swapIndex;
            
            for (swapIndex = 0; swapIndex < itemArray.length; swapIndex++) {
                if (MyIDMatches(itemID, itemArray[swapIndex])) {
                    toRemove = itemArray[swapIndex];
                    break;
                }
            }
            
            itemArray[swapIndex] = itemArray[itemArray.length - 1];
            itemArray[itemArray.length - 1] = toRemove;
        
            returnMe = itemArray.pop();
            itemArray.sort(function (a, b) {
                var returnValue = 0;

                if (a.name < b.name) {
                    returnValue = -1;
                }
                if (a.name > b.name) {
                    returnValue = 1;
                }
                return returnValue;
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
        "use strict";
        var newAuthor = new Author(name, age);
        return AddItemToArray(newAuthor, this.authorsArray);
    },
    
    GetAuthorByID : function (authorID) {
        "use strict";
        return GetItemFromArray(authorID, this.authorsArray);
    },
    
    GetAuthorByName : function (name) {
        "use strict";
        var shouldLoop = true;
        var returnMe;
        var author;
        
        var index;
        for (index = 0; index < this.authorsArray.length; index++) {
            if (shouldLoop) {
                author = this.authorsArray[index];
                if (author.name == name) {
                    shouldLoop = false;
                    returnMe = author;
                }
            }
        }
        return returnMe;
    },
    
    GetAllAuthors : function () {
        "use strict";
        return this.authorsArray;
    },
    
    UpdateAuthorByID : function (authorID, newName, newAge) {
        "use strict";
        var updatingAuthor = new GetItemFromArray(authorID, this.authorsArray);
        if (updatingAuthor.name !== newName) {
            updatingAuthor.UpdateName(newName);
        }
        if (updatingAuthor.age !== newAge) {
            updatingAuthor.UpdateAge(newAge);
        }
    },
    
    RemoveAuthor : function (authorID) {
        "use strict";
        return RemoveItemFromArray(authorID, this.authorsArray);
    }
};

var genres = {
    genresArray : [],
    
    CreateGenre : function (name) {
        "use strict";
        var newGenre = new Genre(name);
        return AddItemToArray(newGenre, this.genresArray);
    },
    
    GetGenreByID : function (genreID) {
        "use strict";
        return GetItemFromArray(genreID, this.genresArray);
    },
    
    GetGenreByName : function (name) {
        "use strict";
        var shouldLoop = true;
        var returnMe;
        var genre;
        
        var index;
        for (index = 0; index < this.genresArray.length; index++) {
            if (shouldLoop) {
                genre = this.genresArray[index];
                if (genre.name == name) {
                    shouldLoop = false;
                    returnMe = genre;
                }
            }
        }
        return returnMe;
    },
    
    GetAllGenres : function () {
        "use strict";
        return this.genresArray;
    },
    
    UpdateGenreByID : function (genreID, newName) {
        "use strict";
        var updatingGenre = new GetItemFromArray(genreID, this.genresArray);
        if (updatingGenre.name !== newName) {
            updatingGenre.UpdateName(newName);
        }
    },
    
    RemoveGenre : function (genreID) {
        "use strict";
        return RemoveItemFromArray(genreID, this.genresArray);
    }
};

var books = {
    booksArray : [],
    
    CreateBook : function (name, authorID, genreID) {
        "use strict";
        var newBook = new Book(name, authorID, genreID);
        return AddItemToArray(newBook, this.booksArray);
    },
    
    GetBookByID : function (bookID) {
        "use strict";
        return GetItemFromArray(bookID, this.booksArray);
    },
    
    GetBookByNames : function (name, author, genre) {
        "use strict";
        var shouldLoop = true;
        var returnMe;
        var book;
        
        var index;
        for (index = 0; index < this.booksArray.length; index++) {
            if (shouldLoop) {
                book = this.booksArray[index];
                if (book.name === name && authors.GetAuthorByID(book.authorID).name === author && genres.GetGenreByID(book.genreID).name === genre) {
                    shouldLoop = false;
                    returnMe = book;
                }
            }
        }
        return returnMe;
    },
    
    GetAllBooks : function () {
        "use strict";
        return this.booksArray;
    },
    
    UpdateBookByID : function (bookID, newName, newAuthor, newGenre) {
        "use strict";
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
        "use strict";
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