"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieNotFoundException = void 0;
class MovieNotFoundException extends Error {
    constructor(title, movie, message = "Could not find any movie with given number on the series.", innerException) {
        super(message);
        this.title = title;
        this.movie = movie;
        this.name = 'MovieNotFoundException';
    }
}
exports.MovieNotFoundException = MovieNotFoundException;
