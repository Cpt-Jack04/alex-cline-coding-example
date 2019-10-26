/* Generic Methods */
///////////////////////////////////////////////////////////////////////////////////////////////////
// Adds an item to a given array based on a given item's ID.
var AddItemToArray = function (item, itemArray) {
    "use strict";
    itemArray.push(item);
    itemArray.sort(function (a, b) {return a.name - b.name; });
};

// Gets an item from a given array based on a given itemID.
// Returns the item of the corrisponding itemID. Returns null if item is not found.
var GetItemFromArray = function (itemID, itemArray) {
    "use strict";
    itemArray.find(function (item) {
        if (item.id === itemID) {
            return item;
        }
    });
    return null;
};

// Removes an item from a given array based on a given itemID.
// Returns the removed item. Returns null if item is not found.
var RemoveItemFromArray = function (itemID, itemArray) {
    "use strict";
    if (itemArray.length === 1 && itemArray[0].id === itemID) {
        return itemArray.pop();
    } else if (itemArray.length > 1) {
        var toRemove = new GetItemFromArray(itemID, itemArray);
        
        if (toRemove !== null) {
            var swapIndex = itemArray.findIndex(function (item) {
                    return item.id === toRemove.id;
                });

            itemArray[swapIndex] = itemArray[itemArray.length - 1];
            itemArray[itemArray.length - 1] = toRemove;

            return itemArray.pop();
        }
    }
    return null;
};

/* Object Collections */
///////////////////////////////////////////////////////////////////////////////////////////////////
var authors = {
    authorsArray : [],
    
    CreateAuthor : function (name, age) {
        "use strict";
        var newAuthor = new Author(name, age);
        return new AddItemToArray(newAuthor, this.authorsArray);
    },
    
    GetAuthorByID : function (authorID) {
        "use strict";
        return new GetItemFromArray(authorID, this.authorsArray);
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
        return new RemoveItemFromArray(authorID, this.authorsArray);
    }
};

var genres = {
    genresArray : [],
    
    CreateGenre : function (name) {
        "use strict";
        var newGenre = new Genre(name);
        return new AddItemToArray(newGenre, this.genresArray);
    },
    
    GetGenreByID : function (genreID) {
        "use strict";
        return new GetItemFromArray(genreID, this.genresArray);
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
        return new RemoveItemFromArray(genreID, this.genresArray);
    }
};

var books = {
    booksArray : [],
    
    CreateBook : function (name, authorID, genreID) {
        "use strict";
        var newBook = new Book(name, authorID, genreID);
        return new AddItemToArray(newBook, this.booksArray);
    },
    
    GetBookByID : function (bookID) {
        "use strict";
        return new GetItemFromArray(bookID, this.booksArray);
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
        return new RemoveItemFromArray(bookID, this.booksArray);
    }
};