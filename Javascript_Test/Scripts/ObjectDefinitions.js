"use strict";

let previousAuthorID = 0;
let previousGenreID = 0;
let previousBookID = 0;

let Author = function (name, age) {
    previousAuthorID += 1;
    this.id = previousAuthorID;
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
    previousGenreID += 1;
    this.id = previousGenreID;
    this.name = name;
    this.created_at = new Date();
    this.updated_at = this.created_at;
    
    this.updateName = function (newName) {
        this.name = newName;
        this.updated_at = new Date();
    };
};

let Book = function (name, author_id, genre_id) {
    previousBookID += 1;
    this.id = previousBookID;
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