# SerienStream API

A TypeScript library for accessing and parsing content from SerienStream/AniWorld.

GitHub Repo: https://github.com/culajunge/serienstreamapi

Original SerienStreamAPI .net: https://github.com/IcySnex/SerienStreamAPI

## Installation
```bash
npm install serienstreamapi
```

## Usage
### Initialize Client

```bash
import { SerienStreamClient } from 'serienstreamapi';

const client = new SerienStreamClient("https://aniworld.to/", "animes", false);
```

### Get Series Information
```bash
const series = await client.getSeries("My Dress-Up Darling");
console.log(`Title: ${series.title}`);
console.log(`Description: ${series.description}`);
```

### Get Episodes
```bash
// Get all episodes of season 1
const episodes = await client.getEpisodes("My Dress-Up Darling", 1);
episodes.forEach(episode => {
    console.log(`[${episode.number}] ${episode.title}`);
});

// Get all movies
const movies = await client.getMovies("My Dress-Up Darling");
movies.forEach(movie => {
    console.log(`[${movie.number}] ${movie.title}`);
});
```

### Get Video Details
```bash
// Get episode stream information
const episodeDetails = await client.getEpisodeVideoInfo("My Dress-Up Darling", 1, 1);
episodeDetails.streams.forEach(stream => {
    console.log(`Stream: ${stream.hoster} - ${stream.language.audio}`);
});

// Get movie stream information
const movieDetails = await client.getMovieVideoInfo("My Dress-Up Darling", 1);
movieDetails.streams.forEach(stream => {
    console.log(`Stream: ${stream.hoster} - ${stream.language.audio}`);
});
```

### Features

    Series information retrieval
    Episode listing
    Movie listing
    Stream information with multiple hosters
    Language information for audio and subtitles (de,en,jp)

### Types

The library includes TypeScript definitions for all returned data structures.

License

MIT