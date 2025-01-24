export declare class EpisodeNotFoundException extends Error {
    readonly title: string;
    readonly season: number;
    readonly episode: number;
    constructor(title: string, season: number, episode: number, message?: string, innerException?: Error);
}
