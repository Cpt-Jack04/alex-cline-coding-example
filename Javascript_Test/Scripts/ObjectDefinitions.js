"use strict";

let Author = function (name, age) {
    this.id = authors.authorsArray.length + 1;
    this.name = name;
    this.age = age;
    this.created_at = new Date();
    this.updated_at = this.created_at;
    
    this.updateName = function (newName) {
        this.name = newName;
        this.updated_at = new Date();
    };
    
    this.updateAge = function (newAge) {
        this.age = newAge;
        this.updated_at = new Date();
    };
};

let Genre = function (name) {
    this.id = genres.genresArray.length + 1;
    this.name = name;
    this.created_at = new Date();
    this.updated_at = this.created_at;
    
    this.updateName = function (newName) {
        this.name = newName;
        this.updated_at = new Date();
    };
};

let Book = function (name, author_id, genre_id) {
    this.id = books.booksArray.length + 1;
    this.name = name;
    this.author_id = author_id;
    this.genre_id = genre_id;
    this.created_at = new Date();
    this.updated_at = this.created_at;
    
    this.updateName = function (newName) {
        this.name = newName;
        this.updated_at = new Date();
    };
    
    this.updateAuthorID = function (newAuthor) {
        this.author_id = newAuthor.id;
        this.updated_at = new Date();
    };
    
    this.updateGenreID = function (newGenre) {
        this.genre_id = newGenre.id;
        this.updated_at = new Date();
    };
};