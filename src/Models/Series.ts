import { Rating } from './Rating'

export class Series {
    constructor(
        public readonly title: string,
        public readonly description: string,
        public readonly bannerUrl: string,
        public readonly yearStart: number,
        public readonly yearEnd: number | null,
        public readonly directors: string[],
        public readonly actors: string[],
        public readonly creators: string[],
        public readonly countriesOfOrigin: string[],
        public readonly genres: string[],
        public readonly ageRating: number,
        public readonly rating: Rating,
        public readonly imdbUrl: string | null,
        public readonly trailerUrl: string | null,
        public readonly hasMovies: boolean,
        public readonly seasonsCount: number
    ) {}
}