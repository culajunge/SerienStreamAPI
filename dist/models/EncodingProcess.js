"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncodingProgress = void 0;
class EncodingProgress {
    constructor(framesProcessed, fps, quality, outputFileSizeKb, timeElapsed, // We'll use milliseconds for TimeSpan
    bitrateKbps, speedMultiplier) {
        this.framesProcessed = framesProcessed;
        this.fps = fps;
        this.quality = quality;
        this.outputFileSizeKb = outputFileSizeKb;
        this.timeElapsed = timeElapsed;
        this.bitrateKbps = bitrateKbps;
        this.speedMultiplier = speedMultiplier;
    }
}
exports.EncodingProgress = EncodingProgress;
