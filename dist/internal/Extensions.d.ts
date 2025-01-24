import { Hoster } from '../enums/Hoster';
import { Language } from '../enums/Language';
import { MediaLanguage } from '../models/MediaLanguage';
declare const cheerio: any;
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
    static getInnerText(node: ReturnType<typeof cheerio.load>): string;
    static getAttributeValue(node: ReturnType<typeof cheerio.load>, attributeName: string): string;
    static selectSingleNodeTextOrDefault($: typeof cheerio, xpath: string): string | undefined;
    static selectSingleNodeAttributeOrDefault($: typeof cheerio, xpath: string, attributeName: string): string | undefined;
    static selectSingleNodeText($: typeof cheerio, xpath: string): string;
    static selectSingleNodeAttribute($: typeof cheerio, xpath: string, attributeName: string): string;
    static any($: ReturnType<typeof cheerio.load>, xpath: string): boolean;
    static select<T>($: ReturnType<typeof cheerio.load>, xpath: string, selector: (element: ReturnType<typeof cheerio.load>) => T): T[];
    static map<TKey, TValue>($: ReturnType<typeof cheerio.load>, xpath: string, selector: (element: ReturnType<typeof cheerio.load>) => [TKey, TValue]): Map<TKey, TValue>;
}
export {};
