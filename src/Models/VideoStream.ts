import { Hoster } from '../enums/Hoster'
import { MediaLanguage } from './MediaLanguage'

export class VideoStream {
    constructor(
        public videoUrl: string,
        public hoster: Hoster,
        public language: MediaLanguage
    ) {}
}