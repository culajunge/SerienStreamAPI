"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlExtractionFailedException = void 0;
class UrlExtractionFailedException extends Error {
    constructor(sourceUrl, message = "Failed to extract url from source.", innerException) {
        super(message);
        this.sourceUrl = sourceUrl;
        this.name = 'UrlExtractionFailedException';
    }
}
exports.UrlExtractionFailedException = UrlExtractionFailedException;
