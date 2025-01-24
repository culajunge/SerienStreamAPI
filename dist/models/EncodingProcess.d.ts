export declare class EncodingProgress {
    framesProcessed: number;
    fps: number;
    quality: number;
    outputFileSizeKb: number;
    timeElapsed: number;
    bitrateKbps: number;
    speedMultiplier: number;
    constructor(framesProcessed: number, fps: number, quality: number, outputFileSizeKb: number, timeElapsed: number, // We'll use milliseconds for TimeSpan
    bitrateKbps: number, speedMultiplier: number);
}
