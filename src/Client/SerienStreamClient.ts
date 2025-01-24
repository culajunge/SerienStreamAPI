import { RequestHelper } from '../internal/RequestHelper'
import { Series } from '../models/Series'
import { Rating } from '../models/Rating'
import { SeriesNotFoundException } from '../exceptions/SeriesNotFoundException'
import { Extensions } from '../internal/Extensions'
import {VideoDetails} from "../Models/VideoDetails";
import {VideoStream} from "../Models/VideoStream";
import {MediaLanguage} from "../Models/MediaLanguage";
import {Language} from "../Enums/Language";
import {SeasonNotFoundException} from "../Exceptions/SeasonNotFoundException";
import {MovieNotFoundException} from "../Exceptions/MovieNotFoundException";
import {EpisodeNotFoundException} from "../Exceptions/EpisodeNotFoundException";
import {Media} from "../Models/Media";
import { Logger } from '../internal/RequestHelper';
const cheerio = require('cheerio');

export class SerienStreamClient {
    private readonly hostUrl: string;
    private readonly site: string;
    private readonly logger?: Logger;
    private readonly requestHelper: RequestHelper;

    constructor(
        hostUrl: string,
        site: string,
        ignoreCertificateValidation: boolean = false,
        logger?: Logger
    ) {
        this.hostUrl = hostUrl;
        this.site = site;
        this.logger = logger;
        this.requestHelper = new RequestHelper(ignoreCertificateValidation, logger);

        logger?.logInformation("[SerienStreamClient-.ctor] SerienStreamClient has been initialized.");
    }

    private async getHtmlRoot(path: string, signal?: AbortSignal): Promise<cheerio.Root> {
        this.logger?.logInformation("[SerienStreamClient-GetHtmlRootAsync] Getting HTML document: %s...", path);
        const webContent = await this.requestHelper.getAndValidateAsync(this.hostUrl, path, undefined, signal);
        return cheerio.load(webContent);
    }

    public async getSeries(title: string, signal?: AbortSignal): Promise<Series> {
        // Get HTML document
        const $ = await this.getHtmlRoot(`${this.site}/stream/${Extensions.toRelativePath(title)}`, signal);
        const root = $('html');

        if (root.find("div.messageAlert.danger").length > 0) {
            throw new SeriesNotFoundException(title);
        }

        // Parse HTML document into series info
        this.logger?.logInformation("[SerienStreamClient-GetSeriesAsync] Parsing HTML document into series info: %s...", title);

        const endYearText = root.find("span[itemprop='endDate'] a").text();
        const hasMovies = root.find("div#stream ul:first li:nth-child(2) a").text() === "Filme";

        return new Series(
            root.find("div.series-title h1").text(),
            root.find("p.seri_des").attr("data-full-description") || "",
            `${this.hostUrl}/${(root.find("div.seriesCoverBox img").attr("data-src") || "").trim()}`,
        parseInt(root.find("span[itemprop='startDate'] a").text()),
            endYearText === "Heute" ? null : parseInt(endYearText),
            root.find("li[itemprop='director'] span[itemprop='name']").map((_, el) => $(el).text()).get(),
            root.find("li[itemprop='actor'] span[itemprop='name']").map((_, el) => $(el).text()).get(),
            root.find("li[itemprop='creator'] span[itemprop='name']").map((_, el) => $(el).text()).get(),
            root.find("li[itemprop='countryOfOrigin'] span[itemprop='name']").map((_, el) => $(el).text()).get(),
            root.find("div.genres li a[itemprop='genre']").map((_, el) => $(el).text()).get(),
            parseInt(root.find("div[class*='fsk']").attr("data-fsk") || "0"),
            new Rating(
                parseInt(root.find("div[itemprop='aggregateRating'] span[itemprop='ratingValue']").text()),
                parseInt(root.find("div[itemprop='aggregateRating'] span[itemprop='bestRating']").text()),
                parseInt(root.find("div[itemprop='aggregateRating'] span[itemprop='ratingCount']").text())
            ),
            root.find("a.imdb-link").attr("href") || null,
            root.find("div[itemprop='trailer'] a[itemprop='url']").attr("href") || null,
            hasMovies,
            parseInt(root.find("meta[itemprop='numberOfSeasons']").attr("content") || "0") - (hasMovies ? 1 : 0)
        );
    }

    public async getEpisodes(title: string, season: number, signal?: AbortSignal): Promise<Media[]> {
        // Get HTML document
        const $ = await this.getHtmlRoot(`${this.site}/stream/${Extensions.toRelativePath(title)}/staffel-${season}`, signal);
        const root = $('html');

        if (root.children().length === 0) {
            if (season === 0) {
                return Promise.resolve([] as Media[]);
            } else {
                throw new SeasonNotFoundException(title, season);
            }
        }
        if (root.find("div.messageAlert.danger").length > 0) {
            throw new SeriesNotFoundException(title);
        }

        // Parse HTML document into series info
        this.logger?.logInformation("[SerienStreamClient-GetEpisodesAsync] Parsing HTML document into media info list: %s, %s...", title, season);

        return Extensions.select($, "table.seasonEpisodesList tbody tr", (node: ReturnType<typeof cheerio.load> & cheerio.Cheerio) => new Media(
            parseInt(node.find("td:first-child a").text().slice(6)),
            node.find("td:nth-child(2) a strong").text(),
            node.find("td:nth-child(2) a span").text(),
            Extensions.select($, "td:nth-child(3) i", (child: ReturnType<typeof cheerio.load> & cheerio.Cheerio) => Extensions.toHoster(child.attr("title") || "")),
            Extensions.select($, "td:nth-child(4) img", (child: ReturnType<typeof cheerio.load> & cheerio.Cheerio) => Extensions.toMediaLanguage(child.attr("src") || ""))
        ));
    }

    public getMovies(title: string, signal?: AbortSignal): Promise<Media[]> {
        return this.getEpisodes(title, 0, signal);
    }

    public async getEpisodeVideoInfo(title: string, number: number, season: number, signal?: AbortSignal): Promise<VideoDetails> {
        // Get HTML document
        const $ = await this.getHtmlRoot(`${this.site}/stream/${Extensions.toRelativePath(title)}/staffel-${season}/episode-${number}`, signal);
        const root = $('html');

        if (root.children().length === 0) {
            throw season === 0 ? new MovieNotFoundException(title, number) : new EpisodeNotFoundException(title, season, number);
        }
        if (root.find("div.messageAlert.danger").length > 0) {
            throw new SeriesNotFoundException(title);
        }
        if (root.find("div.hosterSiteDirectNav").length === 0) {
            throw new SeasonNotFoundException(title, season);
        }

        // Parse HTML document into series info
        this.logger?.logInformation("[SerienStreamClient-GetEpisodeVideoInfoAsync] Parsing HTML document into video info: %s, %s, %s...", title, number, season);

        const languageMapping = Extensions.map($, "div.changeLanguageBox img", (node: ReturnType<typeof cheerio.load> & cheerio.Cheerio) => [
            parseInt(node.attr("data-lang-key") || "0"),
            Extensions.toMediaLanguage(node.attr("src") || "")
        ]);

        return new VideoDetails(
            parseInt($("ul li a.active[data-episode-id]").text()),
            $("div.hosterSiteTitle h2 span.episodeGermanTitle").text(),
            $("div.hosterSiteTitle h2 small.episodeEnglishTitle").text(),
            $("div.hosterSiteTitle p[itemprop='description']").text(),
            Extensions.select($, "ul.row li", (node: ReturnType<typeof cheerio.load> & cheerio.Cheerio) => new VideoStream(
                `${this.hostUrl}/${(node.find("a.watchEpisode").attr("href") || "").trim()}`,
        Extensions.toHoster(node.find("h4").text()),
                languageMapping.get(parseInt(node.attr("data-lang-key") || "0")) || new MediaLanguage(Language.Unknown, null)
            ))
        );

    }

    public getMovieVideoInfo(title: string, number: number, signal?: AbortSignal): Promise<VideoDetails> {
        return this.getEpisodeVideoInfo(title, number, 0, signal);
    }
}
