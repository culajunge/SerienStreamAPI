export declare class SeriesNotFoundException extends Error {
    readonly title: string;
    constructor(title: string, message?: string, innerException?: Error);
}
