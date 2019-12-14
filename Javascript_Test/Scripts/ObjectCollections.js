"use strict";

/* Generic Methods */
///////////////////////////////////////////////////////////////////////////////////////////////////
function getData = () => {
    axios.get("http://api.training.theburo.nl").then(response => {
        console.log(response);
    })
}

// Sorts items by name.
function compareByName(itemA, itemB) {
    var returnValue = 0;
    
    if (itemA.name < itemB.name) {
        returnValue = -1;
    } else if (itemA.name > itemB.name) {
        returnValue = 1;
    }
    
    return returnValue;
}

// Adds an item to a given array based on a given item's ID.
function addItemToArray(item, itemArray) {
    itemArray.push(item);
    itemArray.sort(compareByName);
}

// Gets an item from a given array based on a given itemID.
// Returns the item of the corrisponding itemID. Returns null if item is not found.
function getItemFromArray(itemID, itemArray) {
    return itemArray.find(function (element) {
        return element.id === itemID;
    });
}

// Removes an item from a given array based on a given itemID.
// Returns the removed item. Returns null if item is not found.
function removeItemFromArray(itemID, itemArray) {
    var returnMe = null;
    
    if (itemArray.length === 1 && itemArray[0].id === itemID) {
        returnMe = itemArray.pop();
    } else if (itemArray.length > 1) {
        var toRemove = getItemFromArray(itemID, itemArray);
            
        if (toRemove !== null) {
            var swapIndex = itemArray.indexOf(toRemove);
            
            itemArray[swapIndex] = itemArray[itemArray.length - 1];
            itemArray[itemArray.length - 1] = toRemove;
        
            returnMe = itemArray.pop();
            itemArray.sort(compareByName);
        }
    }
    return returnMe;
}

/* Object Collections */
///////////////////////////////////////////////////////////////////////////////////////////////////
var authors = {
    authorsArray : [],
    
    createAuthor : function (name, age) {
        var newAuthor = new Author(name, age);
        return addItemToArray(newAuthor, this.authorsArray);
    },
    
    getAuthorByID : function (authorID) {
        return getItemFromArray(authorID, this.authorsArray);
    },
    
    getAuthorByName : function (name) {
        return this.authorsArray.find(function (author) {
            return author.name === name;
        });
    },
    
    getAllAuthors : function () {
        return this.authorsArray;
    },
    
    updateAuthorByID : function (authorID, newName, newAge) {
        var updatingAuthor = getItemFromArray(authorID, this.authorsArray);
        if (updatingAuthor.name !== newName) {
            updatingAuthor.updateName(newName);
        }
        if (updatingAuthor.age !== newAge) {
            updatingAuthor.updateAge(newAge);
        }
    },
    
    removeAuthor : function (authorID) {
        return removeItemFromArray(authorID, this.authorsArray);
    }
};

var genres = {
    genresArray : [],
    
    createGenre : function (name) {
        var newGenre = new Genre(name);
        return addItemToArray(newGenre, this.genresArray);
    },
    
    getGenreByID : function (genreID) {
        return getItemFromArray(genreID, this.genresArray);
    },
    
    getGenreByName : function (name) {
        return this.genresArray.find(function (genre) {
            return genre.name === name;
        });
    },
    
    getAllGenres : function () {
        return this.genresArray;
    },
    
    updateGenreByID : function (genreID, newName) {
        var updatingGenre = getItemFromArray(genreID, this.genresArray);
        if (updatingGenre.name !== newName) {
            updatingGenre.updateName(newName);
        }
    },
    
    removeGenre : function (genreID) {
        return removeItemFromArray(genreID, this.genresArray);
    }
};

var books = {
    booksArray : [],
    
    createBook : function (name, authorID, genreID) {
        var newBook = new Book(name, authorID, genreID);
        return addItemToArray(newBook, this.booksArray);
    },
    
    getBookByID : function (bookID) {
        return getItemFromArray(bookID, this.booksArray);
    },
    
    getBookByNames : function (name, author, genre) {
        return this.booksArray.find(function (book) {
            return book.name === name && authors.getAuthorByID(book.authorID).name === author && genres.getGenreByID(book.genreID).name === genre;
        });
    },
    
    getAllBooks : function () {
        return this.booksArray;
    },
    
    updateBookByID : function (bookID, newName, newAuthor, newGenre) {
        var updatingBook = getItemFromArray(bookID, this.booksArray);
        if (updatingBook.name !== newName) {
            updatingBook.updateName(newName);
        }
        if (updatingBook.authorID !== newAuthor.id) {
            updatingBook.updatAuthorID(newAuthor);
        }
        if (updatingBook.genreID !== newGenre.id) {
            updatingBook.updateGenreID(newGenre);
        }
    },
    
    removeBook : function (bookID) {
        return removeItemFromArray(bookID, this.booksArray);
    }
};

authors.createAuthor("Tolken, J.R.", 127);
authors.createAuthor("Ludlum, Robert", 92);
authors.createAuthor("Doran, John P.", 35);

genres.createGenre("Tutorials");
genres.createGenre("Fantasy");
genres.createGenre("Spy Fiction");

books.createBook("The Bourne Identity", 2, 3);
books.createBook("The Lord of the Rings: The Two Towers", 1, 2);
books.createBook("Unity 5: Learning C# by Developing Games", 3, 1);
books.createBook("Building an FPS Game with Unity", 3, 1);
books.createBook("The Hobbit", 1, 2);
books.createBook("The Bourne Ultimatum", 2, 3);