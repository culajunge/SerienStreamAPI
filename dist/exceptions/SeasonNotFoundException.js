"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeasonNotFoundException = void 0;
class SeasonNotFoundException extends Error {
    constructor(title, season, message = "Could not find any season with given number on the series.", innerException) {
        super(message);
        this.title = title;
        this.season = season;
        this.name = 'SeasonNotFoundException';
    }
}
exports.SeasonNotFoundException = SeasonNotFoundException;
