import { Hoster } from '../enums/Hoster'
import { Language } from '../enums/Language'
import { MediaLanguage } from '../models/MediaLanguage'
//import { CheerioAPI, Element, AnyNode, Cheerio } from 'cheerio'
//import * as Cheerio from "cheerio";
const cheerio = require('cheerio');



export class Extensions {
    static addRelativePath(baseUrl: string, relativePath: string): string {
        return `${baseUrl.trim()}/${relativePath.trim()}`;
    }

    private static readonly replacements: Set<string> = new Set([
        ':', ',', '(', ')', '~', '.', '&', '\'', '+', '!', 'ü', 'ä', 'ö'
    ]);

    static toRelativePath(text: string): string {
        let result = '';
        let lastWasDash = false;

        for (const c of text.toLowerCase()) {
            if (this.replacements.has(c)) {
                continue;
            } else if (c === ' ') {
                if (!lastWasDash) {
                    result += '-';
                    lastWasDash = true;
                }
                continue;
            } else if (c === 'ß') {
                result += 'ss';
                lastWasDash = false;
                continue;
            }

            result += c;
            lastWasDash = false;
        }

        return result;
    }

    static toInt32(value: boolean | string): number {
        if (typeof value === 'boolean') {
            return value ? 1 : 0;
        }
        return parseInt(value, 10);
    }

    static toDouble(text: string): number {
        return parseFloat(text);
    }

    static toTimeSpan(text: string): number {
        const [hours, minutes, seconds] = text.split(':').map(Number);
        return (hours * 3600 + minutes * 60 + seconds) * 1000;
    }

    static toHoster(text: string): Hoster {
        switch (text.toLowerCase()) {
            case 'voe': return Hoster.VOE;
            case 'doodstream': return Hoster.Doodstream;
            case 'vidoza': return Hoster.Vidoza;
            case 'streamtape': return Hoster.Streamtape;
            default: return Hoster.Unknown;
        }
    }

    static toLanguage(text: string): Language {
        switch (text.toLowerCase()) {
            case 'german': return Language.German;
            case 'english': return Language.English;
            case 'japanese': return Language.Japanese;
            default: return Language.Unknown;
        }
    }

    static toMediaLanguage(text: string): MediaLanguage {
        if (text.length < 15) {
            return new MediaLanguage(Language.Unknown, null);
        }

        const languageData = text.slice(11, -4).split('-').filter(x => x);

        switch (languageData.length) {
            case 1:
                return new MediaLanguage(this.toLanguage(languageData[0]), null);
            case 2:
                return new MediaLanguage(this.toLanguage(languageData[0]), this.toLanguage(languageData[1]));
            default:
                return new MediaLanguage(Language.Unknown, null);
        }
    }

    static getInnerText(node: ReturnType<typeof cheerio.load>): string {
        return node?.text?.()?.trim() ?? '';
    }

    static getAttributeValue(node: ReturnType<typeof cheerio.load>, attributeName: string): string {
        return node?.attr?.(attributeName)?.trim() ?? '';
    }

    static selectSingleNodeTextOrDefault($: typeof cheerio, xpath: string): string | undefined {
        const result = cheerio(xpath).first();
        return this.getInnerText(result);
    }

    static selectSingleNodeAttributeOrDefault($: typeof cheerio, xpath: string, attributeName: string): string | undefined {
        const result = cheerio(xpath).first();
        return this.getAttributeValue(result, attributeName);
    }

    static selectSingleNodeText($: typeof cheerio, xpath: string): string {
        const result = this.selectSingleNodeTextOrDefault($, xpath);
        if (!result) throw new Error(`Could not find node: "${xpath}"`);
        return result;
    }

    static selectSingleNodeAttribute($: typeof cheerio, xpath: string, attributeName: string): string {
        const result = this.selectSingleNodeAttributeOrDefault($, xpath, attributeName);
        if (!result) throw new Error(`Could not find node or attribute: "${xpath}" - "${attributeName}"`);
        return result;
    }

    static any($: ReturnType<typeof cheerio.load>, xpath: string): boolean {
        return $(xpath).length > 0;
    }

    static select<T>($: ReturnType<typeof cheerio.load>, xpath: string, selector: (element: ReturnType<typeof cheerio.load>) => T): T[] {
        const nodes = $(xpath);
        return nodes.map((_, element) => selector($(element))).get();
    }

    static map<TKey, TValue>($: ReturnType<typeof cheerio.load>, xpath: string, selector: (element: ReturnType<typeof cheerio.load>) => [TKey, TValue]): Map<TKey, TValue> {
        const nodes = $(xpath);
        const result = new Map<TKey, TValue>();

        nodes.each((_, element) => {
            const [key, value] = selector($(element));
            result.set(key, value);
        });

        return result;
    }
}