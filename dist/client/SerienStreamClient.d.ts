import { Series } from '../models/Series';
import { VideoDetails } from "../Models/VideoDetails";
import { Media } from "../Models/Media";
import { Logger } from '../internal/RequestHelper';
export declare class SerienStreamClient {
    private readonly hostUrl;
    private readonly site;
    private readonly logger?;
    private readonly requestHelper;
    constructor(hostUrl: string, site: string, ignoreCertificateValidation?: boolean, logger?: Logger);
    private getHtmlRoot;
    getSeries(title: string, signal?: AbortSignal): Promise<Series>;
    getEpisodes(title: string, season: number, signal?: AbortSignal): Promise<Media[]>;
    getMovies(title: string, signal?: AbortSignal): Promise<Media[]>;
    getEpisodeVideoInfo(title: string, number: number, season: number, signal?: AbortSignal): Promise<VideoDetails>;
    getMovieVideoInfo(title: string, number: number, signal?: AbortSignal): Promise<VideoDetails>;
}
