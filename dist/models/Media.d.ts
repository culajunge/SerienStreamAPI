import { Hoster } from '../enums/Hoster';
import { MediaLanguage } from './MediaLanguage';
export declare class Media {
    number: number;
    title: string;
    originalTitle: string;
    hosters: Hoster[];
    languages: MediaLanguage[];
    constructor(number: number, title: string, originalTitle: string, hosters: Hoster[], languages: MediaLanguage[]);
}
