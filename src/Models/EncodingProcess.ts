export class EncodingProgress {
    constructor(
        public framesProcessed: number,
        public fps: number,
        public quality: number,
        public outputFileSizeKb: number,
        public timeElapsed: number, // We'll use milliseconds for TimeSpan
        public bitrateKbps: number,
        public speedMultiplier: number
    ) {}
}