import { Language } from '../enums/Language';
export declare class MediaLanguage {
    readonly audio: Language;
    readonly subtitle: Language | null;
    constructor(audio: Language, subtitle: Language | null);
}
