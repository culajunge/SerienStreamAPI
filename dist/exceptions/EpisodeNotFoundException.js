"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EpisodeNotFoundException = void 0;
class EpisodeNotFoundException extends Error {
    constructor(title, season, episode, message = "Could not find any episode with given number of the season on the series.", innerException) {
        super(message);
        this.title = title;
        this.season = season;
        this.episode = episode;
        this.name = 'EpisodeNotFoundException';
    }
}
exports.EpisodeNotFoundException = EpisodeNotFoundException;
