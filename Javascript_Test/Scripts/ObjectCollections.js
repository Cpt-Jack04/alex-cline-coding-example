"use strict";

/* Generic Methods */
///////////////////////////////////////////////////////////////////////////////////////////////////
// Adds an item to a given array based on a given item's ID.
function addItemToArray(item, itemArray) {
    itemArray.push(item);
    itemArray.sort(compareByName);
}

// Sorts items by name.
function compareByName(itemA, itemB) {
    let returnValue = 0;
    
    if (itemA.name < itemB.name) {
        returnValue = -1;
    } else if (itemA.name > itemB.name) {
        returnValue = 1;
    }
    
    return returnValue;
}

// Gets an item from a given array based on a given itemID.
// Returns the item of the corresponding itemID. Returns null if item is not found.
function getItemFromArray(itemID, itemArray) {
    return itemArray.find(function (element) {
        return element.id === itemID;
    });
}

// Removes an item from a given array based on a given itemID.
// Returns the removed item. Returns null if item is not found.
function removeItemFromArray(itemID, itemArray) {
    let returnMe = null;
    
    if (itemArray.length === 1 && itemArray[0].id === itemID) {
        returnMe = itemArray.pop();
    } else if (itemArray.length > 1) {
        let toRemove = getItemFromArray(itemID, itemArray);
            
        if (toRemove !== null) {
            let swapIndex = itemArray.indexOf(toRemove);
            
            itemArray[swapIndex] = itemArray[itemArray.length - 1];
            itemArray[itemArray.length - 1] = toRemove;
        
            returnMe = itemArray.pop();
            itemArray.sort(compareByName);
        }
    }
    return returnMe;
}

// Removes an item from the Database with a given url and itemID.
function removeItemFromDatabase(url, itemID) {
    return axios.delete(url + itemID);
}

/* Object Collections */
///////////////////////////////////////////////////////////////////////////////////////////////////
let authors = {
    authorsArray : [],
    
    createAuthor : function (name, age) {
        let newAuthor = new Author(name, age);
        axios.post("http://api.training.theburo.nl/authors", {
            name: newAuthor.name,
            age: newAuthor.age
        });

        return addItemToArray(newAuthor, this.authorsArray);
    },
    
    getAllAuthors : function () {
        return this.authorsArray;
    },
    
    getAuthorByID : function (author_id) {
        return getItemFromArray(author_id, this.authorsArray);
    },
    
    getAuthorByName : function (name) {
        return this.authorsArray.find(function (author) {
            return author.name === name;
        });
    },
    
    removeAuthor : function (author_id) {
        removeItemFromDatabase("http://api.training.theburo.nl/authors/", author_id);
        return removeItemFromArray(author_id, this.authorsArray);
    },
    
    updateAuthorByID : function (author_id, newName, newAge) {
        let updatingAuthor = getItemFromArray(author_id, this.authorsArray);
        if (updatingAuthor.name !== newName) {
            updatingAuthor.updateName(newName);
        }
        if (updatingAuthor.age !== newAge) {
            updatingAuthor.updateAge(newAge);
        }

        axios.put("http://api.training.theburo.nl/authors/" + author_id, {
            name: newName,
            age: newAge
        })
        .then(refreshBookTable());
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////
let genres = {
    genresArray : [],
    
    createGenre : function (name) {
        let newGenre = new Genre(name);
        axios.post("http://api.training.theburo.nl/genres", {
            name: newGenre.name
        });

        return addItemToArray(newGenre, this.genresArray);
    },
    
    getAllGenres : function () {
        return this.genresArray;
    },

    getGenreByID : function (genre_id) {
        return getItemFromArray(genre_id, this.genresArray);
    },
    
    getGenreByName : function (name) {
        return this.genresArray.find(function (genre) {
            return genre.name === name;
        });
    },
    
    removeGenre : function (genre_id) {
        removeItemFromDatabase("http://api.training.theburo.nl/genres/", genre_id);
        return removeItemFromArray(genre_id, this.genresArray);
    },
    
    updateGenreByID : function (genre_id, newName) {
        let updatingGenre = getItemFromArray(genre_id, this.genresArray);
        if (updatingGenre.name !== newName) {
            updatingGenre.updateName(newName);
        }

        axios.put("http://api.training.theburo.nl/genres/" + genre_id, {
            name: newName
        })
        .then(refreshBookTable());
    }
};

///////////////////////////////////////////////////////////////////////////////////////////////////
let books = {
    booksArray : [],
    
    createBook : function (name, author_id, genre_id) {
        let newBook = new Book(name, author_id, genre_id);
        axios.post("http://api.training.theburo.nl/books", {
            name: newBook.name,
            author_id: newBook.author_id,
            genre_id: newBook.genre_id
        });

        return addItemToArray(newBook, this.booksArray);
    },
    
    getAllBooks : function () {
        return this.booksArray;
    },
    
    getBookByID : function (book_id) {
        return getItemFromArray(book_id, this.booksArray);
    },
    
    getBookByNames : function (name, author, genre) {
        return this.booksArray.find(function (book) {
            return book.name === name &&
                   authors.getAuthorByID(book.author_id).name === author &&
                   genres.getGenreByID(book.genre_id).name === genre;
        });
    },
    
    removeBook : function (book_id) {
        removeItemFromDatabase("http://api.training.theburo.nl/books/", book_id);
        return removeItemFromArray(book_id, this.booksArray);
    },
    
    updateBookByID : function (book_id, newName, newAuthor, newGenre) {
        let updatingBook = getItemFromArray(book_id, this.booksArray);
        if (updatingBook.name !== newName) {
            updatingBook.updateName(newName);
        }
        if (updatingBook.author_id !== newAuthor.id) {
            updatingBook.updatAuthorID(newAuthor);
        }
        if (updatingBook.genre_id !== newGenre.id) {
            updatingBook.updateGenreID(newGenre);
        }

        axios.put("http://api.training.theburo.nl/books/" + book_id, {
            name: newName,
            author_id: newAuthor.id,
            name: newGenre.id
        })
        .then(refreshBookTable());
    }
};