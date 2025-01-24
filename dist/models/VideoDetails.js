"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoDetails = void 0;
class VideoDetails {
    constructor(number, title, originalTitle, description, streams) {
        this.number = number;
        this.title = title;
        this.originalTitle = originalTitle;
        this.description = description;
        this.streams = streams;
    }
}
exports.VideoDetails = VideoDetails;
