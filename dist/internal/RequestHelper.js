"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestHelper = void 0;
class RequestHelper {
    constructor(ignoreCertificateValidation = false, logger) {
        this.logger = logger;
        this.httpClient = fetch;
        logger?.logInformation("[RequestHelper-.ctor] RequestHelper with extended logging functions has been initialized.");
    }
    async getAsync(url, path, headers, signal) {
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
        });
    }
    async getAndValidateAsync(uri, path, headers, signal) {
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
exports.RequestHelper = RequestHelper;
