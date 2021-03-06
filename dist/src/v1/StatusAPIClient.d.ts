import { IResult } from "./interfaces/data/IResponse";
import * as request from "request-promise";
import { IStatusInfo } from "./interfaces/status/IStatusInfo";
/**
 * Class responsible for calling to the Data endpoints
 */
export declare class StatusAPIClient {
    /**
     * Generic API calling function
     *
     * @template T
     * @param {string} accessToken
     * @param {string} path
     * @param {object} [qs]
     * @returns {Promise<IResult<T>>}
     */
    static callAPI<T>(path: string, qs?: object): Promise<IResult<T>>;
    /**
     * Build Request options
     *
     * @private
     * @param {string} accessToken
     * @param {string} path
     * @param {object} [qs]
     * @returns {request.Options}
     */
    static buildRequestOptions(path: string, qs?: object): request.Options;
    /**
     * Call to /data/status API.
     *
     * @returns {Promise<IResult<IStatusInfo>>}
     */
    static getStatus(from?: Date, to?: Date, providers?: string[], endpoints?: string[]): Promise<IResult<IStatusInfo>>;
}
