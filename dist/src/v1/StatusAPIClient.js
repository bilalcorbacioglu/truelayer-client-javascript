"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const APIError_1 = require("./APIError");
const Constants_1 = require("./Constants");
const request = require("request-promise");
const moment = require("moment");
/**
 * Class responsible for calling to the Data endpoints
 */
class StatusAPIClient {
    /**
     * Generic API calling function
     *
     * @template T
     * @param {string} accessToken
     * @param {string} path
     * @param {object} [qs]
     * @returns {Promise<IResult<T>>}
     */
    static callAPI(path, qs) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = StatusAPIClient.buildRequestOptions(path, qs);
            try {
                const response = yield request.get(requestOptions);
                const parsedResponse = JSON.parse(response);
                return parsedResponse;
            }
            catch (error) {
                throw new APIError_1.ApiError(error);
            }
        });
    }
    /**
     * Build Request options
     *
     * @private
     * @param {string} accessToken
     * @param {string} path
     * @param {object} [qs]
     * @returns {request.Options}
     */
    static buildRequestOptions(path, qs) {
        const requestOptions = {
            uri: path,
            timeout: Constants_1.Constants.API_TIMEOUT
        };
        if (qs) {
            requestOptions.qs = qs;
            requestOptions.useQuerystring = true;
        }
        return requestOptions;
    }
    /**
     * Call to /data/status API.
     *
     * @returns {Promise<IResult<IStatusInfo>>}
     */
    static getStatus(from, to, providers, endpoints) {
        return __awaiter(this, void 0, void 0, function* () {
            const dateFormat = "YYYY-MM-DD HH:MM:SS";
            const url = `${Constants_1.Constants.STATUS_URL}/api/v1/data/status`;
            const qs = {
                from: moment(from).format(dateFormat),
                to: moment(to).format(dateFormat),
                providers: providers ? providers.join(",") : null,
                endpoints: endpoints ? endpoints.join(",") : null,
            };
            return yield StatusAPIClient.callAPI(url, qs);
        });
    }
}
exports.StatusAPIClient = StatusAPIClient;
