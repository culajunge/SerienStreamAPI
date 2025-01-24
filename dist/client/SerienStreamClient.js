"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerienStreamClient = void 0;
const RequestHelper_1 = require("../internal/RequestHelper");
const Series_1 = require("../models/Series");
const Rating_1 = require("../models/Rating");
const SeriesNotFoundException_1 = require("../exceptions/SeriesNotFoundException");
const Extensions_1 = require("../internal/Extensions");
const VideoDetails_1 = require("../Models/VideoDetails");
const VideoStream_1 = require("../Models/VideoStream");
const MediaLanguage_1 = require("../Models/MediaLanguage");
const Language_1 = require("../Enums/Language");
const SeasonNotFoundException_1 = require("../Exceptions/SeasonNotFoundException");
const MovieNotFoundException_1 = require("../Exceptions/MovieNotFoundException");
const EpisodeNotFoundException_1 = require("../Exceptions/EpisodeNotFoundException");
const Media_1 = require("../Models/Media");
const cheerio_1 = require("cheerio");
class SerienStreamClient {
    constructor(hostUrl, site, ignoreCertificateValidation = false, logger) {
        this.hostUrl = hostUrl;
        this.site = site;
        this.logger = logger;
        this.requestHelper = new RequestHelper_1.RequestHelper(ignoreCertificateValidation, logger);
        logger?.logInformation("[SerienStreamClient-.ctor] SerienStreamClient has been initialized.");
    }
    async getHtmlRoot(path, signal) {
        this.logger?.logInformation("[SerienStreamClient-GetHtmlRootAsync] Getting HTML document: %s...", path);
        const webContent = await this.requestHelper.getAndValidateAsync(this.hostUrl, path, undefined, signal);
        return (0, cheerio_1.load)(webContent);
    }
    async getSeries(title, signal) {
        // Get HTML document
        const $ = await this.getHtmlRoot(`${this.site}/stream/${Extensions_1.Extensions.toRelativePath(title)}`, signal);
        const root = $('html');
        if (root.find("div.messageAlert.danger").length > 0) {
            throw new SeriesNotFoundException_1.SeriesNotFoundException(title);
        }
        // Parse HTML document into series info
        this.logger?.logInformation("[SerienStreamClient-GetSeriesAsync] Parsing HTML document into series info: %s...", title);
        const endYearText = root.find("span[itemprop='endDate'] a").text();
        const hasMovies = root.find("div#stream ul:first li:nth-child(2) a").text() === "Filme";
        return new Series_1.Series(root.find("div.series-title h1").text(), root.find("p.seri_des").attr("data-full-description") || "", `${this.hostUrl}/${(root.find("div.seriesCoverBox img").attr("data-src") || "").trim()}`, parseInt(root.find("span[itemprop='startDate'] a").text()), endYearText === "Heute" ? null : parseInt(endYearText), root.find("li[itemprop='director'] span[itemprop='name']").map((_, el) => $(el).text()).get(), root.find("li[itemprop='actor'] span[itemprop='name']").map((_, el) => $(el).text()).get(), root.find("li[itemprop='creator'] span[itemprop='name']").map((_, el) => $(el).text()).get(), root.find("li[itemprop='countryOfOrigin'] span[itemprop='name']").map((_, el) => $(el).text()).get(), root.find("div.genres li a[itemprop='genre']").map((_, el) => $(el).text()).get(), parseInt(root.find("div[class*='fsk']").attr("data-fsk") || "0"), new Rating_1.Rating(parseInt(root.find("div[itemprop='aggregateRating'] span[itemprop='ratingValue']").text()), parseInt(root.find("div[itemprop='aggregateRating'] span[itemprop='bestRating']").text()), parseInt(root.find("div[itemprop='aggregateRating'] span[itemprop='ratingCount']").text())), root.find("a.imdb-link").attr("href") || null, root.find("div[itemprop='trailer'] a[itemprop='url']").attr("href") || null, hasMovies, parseInt(root.find("meta[itemprop='numberOfSeasons']").attr("content") || "0") - (hasMovies ? 1 : 0));
    }
    async getEpisodes(title, season, signal) {
        // Get HTML document
        const $ = await this.getHtmlRoot(`${this.site}/stream/${Extensions_1.Extensions.toRelativePath(title)}/staffel-${season}`, signal);
        const root = $('html');
        if (root.children().length === 0) {
            if (season === 0) {
                return Promise.resolve([]);
            }
            else {
                throw new SeasonNotFoundException_1.SeasonNotFoundException(title, season);
            }
        }
        if (root.find("div.messageAlert.danger").length > 0) {
            throw new SeriesNotFoundException_1.SeriesNotFoundException(title);
        }
        // Parse HTML document into series info
        this.logger?.logInformation("[SerienStreamClient-GetEpisodesAsync] Parsing HTML document into media info list: %s, %s...", title, season);
        return Extensions_1.Extensions.select($, "table.seasonEpisodesList tbody tr", node => new Media_1.Media(parseInt(node.find("td:first-child a").text().slice(6)), node.find("td:nth-child(2) a strong").text(), node.find("td:nth-child(2) a span").text(), Extensions_1.Extensions.select($, "td:nth-child(3) i", child => Extensions_1.Extensions.toHoster(child.attr("title") || "")), Extensions_1.Extensions.select($, "td:nth-child(4) img", child => Extensions_1.Extensions.toMediaLanguage(child.attr("src") || ""))));
    }
    getMovies(title, signal) {
        return this.getEpisodes(title, 0, signal);
    }
    async getEpisodeVideoInfo(title, number, season, signal) {
        // Get HTML document
        const $ = await this.getHtmlRoot(`${this.site}/stream/${Extensions_1.Extensions.toRelativePath(title)}/staffel-${season}/episode-${number}`, signal);
        const root = $('html');
        if (root.children().length === 0) {
            throw season === 0 ? new MovieNotFoundException_1.MovieNotFoundException(title, number) : new EpisodeNotFoundException_1.EpisodeNotFoundException(title, season, number);
        }
        if (root.find("div.messageAlert.danger").length > 0) {
            throw new SeriesNotFoundException_1.SeriesNotFoundException(title);
        }
        if (root.find("div.hosterSiteDirectNav").length === 0) {
            throw new SeasonNotFoundException_1.SeasonNotFoundException(title, season);
        }
        // Parse HTML document into series info
        this.logger?.logInformation("[SerienStreamClient-GetEpisodeVideoInfoAsync] Parsing HTML document into video info: %s, %s, %s...", title, number, season);
        const languageMapping = Extensions_1.Extensions.map($, "div.changeLanguageBox img", node => [
            parseInt(node.attr("data-lang-key") || "0"),
            Extensions_1.Extensions.toMediaLanguage(node.attr("src") || "")
        ]);
        return new VideoDetails_1.VideoDetails(parseInt($("ul li a.active[data-episode-id]").text()), $("div.hosterSiteTitle h2 span.episodeGermanTitle").text(), $("div.hosterSiteTitle h2 small.episodeEnglishTitle").text(), $("div.hosterSiteTitle p[itemprop='description']").text(), Extensions_1.Extensions.select($, "ul.row li", node => new VideoStream_1.VideoStream(this.hostUrl + "/" + (node.find("a.watchEpisode").attr("href") || "").trim('/'), Extensions_1.Extensions.toHoster(node.find("h4").text()), languageMapping.get(parseInt(node.attr("data-lang-key") || "0")) || new MediaLanguage_1.MediaLanguage(Language_1.Language.Unknown, null))));
    }
    getMovieVideoInfo(title, number, signal) {
        return this.getEpisodeVideoInfo(title, number, 0, signal);
    }
}
exports.SerienStreamClient = SerienStreamClient;
