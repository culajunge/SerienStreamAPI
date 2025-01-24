export interface Logger {
    logInformation(message: string, ...args: any[]): void;
    logError(message: string, ...args: any[]): void;
}

export class RequestHelper {
    private readonly logger?: Logger;
    private readonly httpClient: typeof fetch;

    constructor(
        ignoreCertificateValidation: boolean = false,
        logger?: Logger
    ) {
        this.logger = logger;
        this.httpClient = fetch;

        logger?.logInformation("[RequestHelper-.ctor] RequestHelper with extended logging functions has been initialized.");
    }

    async getAsync(
        url: string,
        path?: string,
        headers?: [string, string][],
        signal?: AbortSignal
    ): Promise<Response> {
        const urlBuilder = new URL(url);
        if (path) {
            urlBuilder.pathname = path;
        }

        const requestHeaders = new Headers({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
        });

        if (headers) {
            headers.forEach(([key, value]) => requestHeaders.append(key, value));
        }

        this.logger?.logInformation("[RequestHelper-GetAsync] Sending HTTP request. GET: %s.", url);

        return await fetch(urlBuilder.toString(), {
            method: 'GET',
            headers: Object.fromEntries(requestHeaders.entries()),
            signal
        } as RequestInit);
    }

    async getAndValidateAsync(
        uri: string,
        path?: string,
        headers?: [string, string][],
        signal?: AbortSignal
    ): Promise<string> {
        const response = await this.getAsync(uri, path, headers, signal);

        this.logger?.logInformation("[RequestHelper-GetAndValidateAsync] Parsing HTTP response.");
        const responseData = await response.text();

        if (!response.ok) {
            this.logger?.logError("[RequestHelper-GetAndValidateAsync] HTTP request failed. Statuscode: %s.", response.status);
            throw Object.assign(new Error(`HTTP request failed. StatusCode: ${response.status}`), {
                cause: new Error(responseData)
            });
        }

        return responseData;
    }
}
