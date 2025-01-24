import { Rating } from './Rating';
export declare class Series {
    readonly title: string;
    readonly description: string;
    readonly bannerUrl: string;
    readonly yearStart: number;
    readonly yearEnd: number | null;
    readonly directors: string[];
    readonly actors: string[];
    readonly creators: string[];
    readonly countriesOfOrigin: string[];
    readonly genres: string[];
    readonly ageRating: number;
    readonly rating: Rating;
    readonly imdbUrl: string | null;
    readonly trailerUrl: string | null;
    readonly hasMovies: boolean;
    readonly seasonsCount: number;
    constructor(title: string, description: string, bannerUrl: string, yearStart: number, yearEnd: number | null, directors: string[], actors: string[], creators: string[], countriesOfOrigin: string[], genres: string[], ageRating: number, rating: Rating, imdbUrl: string | null, trailerUrl: string | null, hasMovies: boolean, seasonsCount: number);
}
