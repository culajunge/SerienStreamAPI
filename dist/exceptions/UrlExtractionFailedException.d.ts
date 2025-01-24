export declare class UrlExtractionFailedException extends Error {
    readonly sourceUrl: string;
    constructor(sourceUrl: string, message?: string, innerException?: Error);
}
