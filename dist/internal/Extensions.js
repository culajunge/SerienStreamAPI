"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extensions = void 0;
const Hoster_1 = require("../enums/Hoster");
const Language_1 = require("../enums/Language");
const MediaLanguage_1 = require("../models/MediaLanguage");
//import { CheerioAPI, Element, AnyNode, Cheerio } from 'cheerio'
//import * as Cheerio from "cheerio";
const cheerio = require('cheerio');
class Extensions {
    static addRelativePath(baseUrl, relativePath) {
        return `${baseUrl.trim()}/${relativePath.trim()}`;
    }
    static toRelativePath(text) {
        let result = '';
        let lastWasDash = false;
        for (const c of text.toLowerCase()) {
            if (this.replacements.has(c)) {
                continue;
            }
            else if (c === ' ') {
                if (!lastWasDash) {
                    result += '-';
                    lastWasDash = true;
                }
                continue;
            }
            else if (c === 'ß') {
                result += 'ss';
                lastWasDash = false;
                continue;
            }
            result += c;
            lastWasDash = false;
        }
        return result;
    }
    static toInt32(value) {
        if (typeof value === 'boolean') {
            return value ? 1 : 0;
        }
        return parseInt(value, 10);
    }
    static toDouble(text) {
        return parseFloat(text);
    }
    static toTimeSpan(text) {
        const [hours, minutes, seconds] = text.split(':').map(Number);
        return (hours * 3600 + minutes * 60 + seconds) * 1000;
    }
    static toHoster(text) {
        switch (text.toLowerCase()) {
            case 'voe': return Hoster_1.Hoster.VOE;
            case 'doodstream': return Hoster_1.Hoster.Doodstream;
            case 'vidoza': return Hoster_1.Hoster.Vidoza;
            case 'streamtape': return Hoster_1.Hoster.Streamtape;
            default: return Hoster_1.Hoster.Unknown;
        }
    }
    static toLanguage(text) {
        switch (text.toLowerCase()) {
            case 'german': return Language_1.Language.German;
            case 'english': return Language_1.Language.English;
            case 'japanese': return Language_1.Language.Japanese;
            default: return Language_1.Language.Unknown;
        }
    }
    static toMediaLanguage(text) {
        if (text.length < 15) {
            return new MediaLanguage_1.MediaLanguage(Language_1.Language.Unknown, null);
        }
        const languageData = text.slice(11, -4).split('-').filter(x => x);
        switch (languageData.length) {
            case 1:
                return new MediaLanguage_1.MediaLanguage(this.toLanguage(languageData[0]), null);
            case 2:
                return new MediaLanguage_1.MediaLanguage(this.toLanguage(languageData[0]), this.toLanguage(languageData[1]));
            default:
                return new MediaLanguage_1.MediaLanguage(Language_1.Language.Unknown, null);
        }
    }
    static getInnerText(node) {
        return node?.text?.()?.trim() ?? '';
    }
    static getAttributeValue(node, attributeName) {
        return node?.attr?.(attributeName)?.trim() ?? '';
    }
    static selectSingleNodeTextOrDefault($, xpath) {
        const result = cheerio(xpath).first();
        return this.getInnerText(result);
    }
    static selectSingleNodeAttributeOrDefault($, xpath, attributeName) {
        const result = cheerio(xpath).first();
        return this.getAttributeValue(result, attributeName);
    }
    static selectSingleNodeText($, xpath) {
        const result = this.selectSingleNodeTextOrDefault($, xpath);
        if (!result)
            throw new Error(`Could not find node: "${xpath}"`);
        return result;
    }
    static selectSingleNodeAttribute($, xpath, attributeName) {
        const result = this.selectSingleNodeAttributeOrDefault($, xpath, attributeName);
        if (!result)
            throw new Error(`Could not find node or attribute: "${xpath}" - "${attributeName}"`);
        return result;
    }
    static any($, xpath) {
        return $(xpath).length > 0;
    }
    static select($, xpath, selector) {
        const nodes = $(xpath);
        return nodes.map((_, element) => selector($(element))).get();
    }
    static map($, xpath, selector) {
        const nodes = $(xpath);
        const result = new Map();
        nodes.each((_, element) => {
            const [key, value] = selector($(element));
            result.set(key, value);
        });
        return result;
    }
}
exports.Extensions = Extensions;
Extensions.replacements = new Set([
    ':', ',', '(', ')', '~', '.', '&', '\'', '+', '!', 'ü', 'ä', 'ö'
]);
