import { Hoster } from '../enums/Hoster';
import { Language } from '../enums/Language';
import { MediaLanguage } from '../models/MediaLanguage';
export declare class Extensions {
    static addRelativePath(baseUrl: string, relativePath: string): string;
    private static readonly replacements;
    static toRelativePath(text: string): string;
    static toInt32(value: boolean | string): number;
    static toDouble(text: string): number;
    static toTimeSpan(text: string): number;
    static toHoster(text: string): Hoster;
    static toLanguage(text: string): Language;
    static toMediaLanguage(text: string): MediaLanguage;
    static getInnerText(node: ReturnType<Cheerio.CheerioAPI['load']>): string;
    static getAttributeValue(node: ReturnType<Cheerio.CheerioAPI['load']>, attributeName: string): string;
    static selectSingleNodeTextOrDefault($: Cheerio.CheerioAPI, xpath: string): string | undefined;
    static selectSingleNodeAttributeOrDefault($: Cheerio.CheerioAPI, xpath: string, attributeName: string): string | undefined;
    static selectSingleNodeText($: Cheerio.CheerioAPI, xpath: string): string;
    static selectSingleNodeAttribute($: Cheerio.CheerioAPI, xpath: string, attributeName: string): string;
    static any(cheerio: Cheerio.CheerioAPI, xpath: string): boolean;
    static select<T>(cheerio: Cheerio.CheerioAPI, xpath: string, selector: (element: ReturnType<Cheerio.CheerioAPI['load']>) => T): T[];
    static map<TKey, TValue>(cheerio: Cheerio.CheerioAPI, xpath: string, selector: (element: ReturnType<Cheerio.CheerioAPI['load']>) => [TKey, TValue]): Map<TKey, TValue>;
}
