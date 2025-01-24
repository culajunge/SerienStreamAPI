import { VideoStream } from './VideoStream';
export declare class VideoDetails {
    number: number;
    title: string;
    originalTitle: string;
    description: string;
    streams: VideoStream[];
    constructor(number: number, title: string, originalTitle: string, description: string, streams: VideoStream[]);
}
