"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Series = void 0;
class Series {
    constructor(title, description, bannerUrl, yearStart, yearEnd, directors, actors, creators, countriesOfOrigin, genres, ageRating, rating, imdbUrl, trailerUrl, hasMovies, seasonsCount) {
        this.title = title;
        this.description = description;
        this.bannerUrl = bannerUrl;
        this.yearStart = yearStart;
        this.yearEnd = yearEnd;
        this.directors = directors;
        this.actors = actors;
        this.creators = creators;
        this.countriesOfOrigin = countriesOfOrigin;
        this.genres = genres;
        this.ageRating = ageRating;
        this.rating = rating;
        this.imdbUrl = imdbUrl;
        this.trailerUrl = trailerUrl;
        this.hasMovies = hasMovies;
        this.seasonsCount = seasonsCount;
    }
}
exports.Series = Series;
