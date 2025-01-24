import { Language } from '../enums/Language'

export class MediaLanguage {
    constructor(
        public readonly audio: Language,
        public readonly subtitle: Language | null
    ) {}
}