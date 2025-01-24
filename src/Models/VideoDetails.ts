import { VideoStream } from './VideoStream'

export class VideoDetails {
    constructor(
        public number: number,
        public title: string,
        public originalTitle: string,
        public description: string,
        public streams: VideoStream[]
    ) {}
}