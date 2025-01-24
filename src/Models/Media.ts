import { Hoster } from '../enums/Hoster'
import { MediaLanguage } from './MediaLanguage'

export class Media {
    constructor(
        public number: number,
        public title: string,
        public originalTitle: string,
        public hosters: Hoster[],
        public languages: MediaLanguage[]
    ) {}
}