export declare class SeasonNotFoundException extends Error {
    readonly title: string;
    readonly season: number;
    constructor(title: string, season: number, message?: string, innerException?: Error);
}
