"use strict";

var previousAuthorID = 0;
var previousGenreID = 0;
var previousBookID = 0;

var Author = function (name, age) {
    previousAuthorID += 1;
    this.id = previousAuthorID;
    this.name = name;
    this.age = age;
    this.createdAt = new Date();
    this.lastUpdatedAt = this.createdAt;
    
    this.updateName = function (newName) {
        this.name = newName;
        this.update_at = new Date();
    };
    
    this.updateAge = function (newAge) {
        this.age = newAge;
        this.update_at = new Date();
    };
};

var Genre = function (name) {
    previousGenreID += 1;
    this.id = previousGenreID;
    this.name = name;
    this.createdAt = new Date();
    this.lastUpdatedAt = this.createdAt;
    
    this.updateName = function (newName) {
        this.name = newName;
        this.update_at = new Date();
    };
};

var Book = function (name, authorID, genreID) {
    previousBookID += 1;
    this.id = previousBookID;
    this.name = name;
    this.authorID = authorID;
    this.genreID = genreID;
    this.createdAt = new Date();
    this.lastUpdatedAt = this.createdAt;
    
    this.updateName = function (newName) {
        this.name = newName;
        this.update_at = new Date();
    };
    
    this.updateAuthorID = function (newAuthor) {
        this.authorID = newAuthor.id;
        this.update_at = new Date();
    };
    
    this.updateGenreID = function (newGenre) {
        this.genreID = newGenre.id;
        this.update_at = new Date();
    };
};