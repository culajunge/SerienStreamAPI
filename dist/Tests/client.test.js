"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SerienStreamClient_1 = require("../client/SerienStreamClient");
async function testSerienStreamClient() {
    // Create a new SerienStreamClient
    const client = new SerienStreamClient_1.SerienStreamClient("https://aniworld.to/", "anime", false);
    try {
        // Search for a series via the title
        const series = await client.getSeries("My Dress-Up Darling");
        console.log(`Title: ${series.title}, Description: ${series.description}`);
        // Get all episodes of a season
        const episodesOfSeason1 = await client.getEpisodes("My Dress-Up Darling", 1);
        episodesOfSeason1.forEach(episode => {
            console.log(`[${episode.number}] Title: ${episode.title}`);
        });
        const movies = await client.getMovies("My Dress-Up Darling");
        movies.forEach(movie => {
            console.log(`[${movie.number}] Title: ${movie.title}`);
        });
        // Get video details
        const episodeVideoDetails = await client.getEpisodeVideoInfo("My Dress-Up Darling", 1, 1);
        episodeVideoDetails.streams.forEach(videoStream => {
            console.log(`Video Stream [${videoStream.videoUrl}]: ${videoStream.hoster}-${videoStream.language.audio}-${videoStream.language.subtitle}`);
        });
        const movieVideoDetails = await client.getMovieVideoInfo("My Dress-Up Darling", 1);
        movieVideoDetails.streams.forEach(videoStream => {
            console.log(`Video Stream [${videoStream.videoUrl}]: ${videoStream.hoster}-${videoStream.language.audio}-${videoStream.language.subtitle}`);
        });
    }
    catch (error) {
        console.error('Error:', error);
    }
}
testSerienStreamClient();
