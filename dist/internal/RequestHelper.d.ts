export interface Logger {
    logInformation(message: string, ...args: any[]): void;
    logError(message: string, ...args: any[]): void;
}
export declare class RequestHelper {
    private readonly logger?;
    private readonly httpClient;
    constructor(ignoreCertificateValidation?: boolean, logger?: Logger);
    getAsync(url: string, path?: string, headers?: [string, string][], signal?: AbortSignal): Promise<Response>;
    getAndValidateAsync(uri: string, path?: string, headers?: [string, string][], signal?: AbortSignal): Promise<string>;
}
