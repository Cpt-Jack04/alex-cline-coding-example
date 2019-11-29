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
    
    this.UpdateName = function (newName) {
        this.name = newName;
        this.update_at = new Date();
    };
    
    this.UpdateAge = function (newAge) {
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
    
    this.UpdateName = function (newName) {
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
    
    this.UpdateName = function (newName) {
        this.name = newName;
        this.update_at = new Date();
    };
    
    this.UpdatAuthorID = function (newAuthor) {
        this.authorID = newAuthor.id;
        this.update_at = new Date();
    };
    
    this.UpdatGenreID = function (newGenre) {
        this.genreID = newGenre.id;
        this.update_at = new Date();
    };
};