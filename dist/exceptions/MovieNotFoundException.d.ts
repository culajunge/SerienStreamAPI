export declare class MovieNotFoundException extends Error {
    readonly title: string;
    readonly movie: number;
    constructor(title: string, movie: number, message?: string, innerException?: Error);
}
