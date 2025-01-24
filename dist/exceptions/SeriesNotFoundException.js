"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeriesNotFoundException = void 0;
class SeriesNotFoundException extends Error {
    constructor(title, message = "Could not find any series with given title.", innerException) {
        super(message);
        this.title = title;
        this.name = 'SeriesNotFoundException';
    }
}
exports.SeriesNotFoundException = SeriesNotFoundException;
