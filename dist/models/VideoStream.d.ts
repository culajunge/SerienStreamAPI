import { Hoster } from '../enums/Hoster';
import { MediaLanguage } from './MediaLanguage';
export declare class VideoStream {
    videoUrl: string;
    hoster: Hoster;
    language: MediaLanguage;
    constructor(videoUrl: string, hoster: Hoster, language: MediaLanguage);
}
