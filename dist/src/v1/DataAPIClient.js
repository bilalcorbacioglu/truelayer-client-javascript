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
const decode = require("jwt-decode");
const moment = require("moment");
const request = require("request-promise");
/**
 * Class responsible for calling to the Data endpoints
 */
class DataAPIClient {
    /**
     * Generic API calling function
     *
     * @template T
     * @param {string} accessToken
     * @param {string} path
     * @param {object} [qs]
     * @returns {Promise<IResult<T>>}
     */
    static callAPI(accessToken, path, qs) {
        return __awaiter(this, void 0, void 0, function* () {
            const isValidToken = DataAPIClient.validateToken(accessToken);
            if (!isValidToken) {
                throw new APIError_1.ApiError(new Error("Invalid access token"));
            }
            const requestOptions = DataAPIClient.buildRequestOptions(accessToken, path, qs);
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
    static buildRequestOptions(accessToken, path, qs) {
        const requestOptions = {
            uri: path,
            headers: {
                Authorization: "Bearer " + accessToken
            },
            timeout: Constants_1.Constants.API_TIMEOUT
        };
        if (qs) {
            requestOptions.qs = qs;
        }
        return requestOptions;
    }
    /**
     * Call to /me API.
     *
     * @param accessToken
     * @returns {Promise<IResult<IMe>>}
     */
    static getMe(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DataAPIClient.callAPI(accessToken, `${Constants_1.Constants.API_URL}/data/v1/me`);
        });
    }
    /**
     * Call to /info API.
     *
     * @param {string} accessToken
     * @returns {Promise<IResult<IInfo>>}
     */
    static getInfo(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DataAPIClient.callAPI(accessToken, `${Constants_1.Constants.API_URL}/data/v1/info`);
        });
    }
    /**
     * Call to /accounts API.
     *
     * @param accessToken
     * @returns {Promise<IResult<IAccount>>}
     */
    static getAccounts(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DataAPIClient.callAPI(accessToken, `${Constants_1.Constants.API_URL}/data/v1/accounts`);
        });
    }
    /**
     * Call to /accounts/account_id API.
     *
     * @param accessToken
     * @param accountId
     * @returns {Promise<IResult<IAccount>>}
     */
    static getAccount(accessToken, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DataAPIClient.callAPI(accessToken, `${Constants_1.Constants.API_URL}/data/v1/accounts/${accountId}`);
        });
    }
    /**
     * Call to /accounts/account_id/transactions API
     * Date format expected: YYYY-MM-DD
     *
     * @param accessToken
     * @param accountId
     * @param from
     * @param to
     * @returns {Promise<IResult<ITransaction>>}
     */
    static getTransactions(accessToken, accountId, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const qs = Object.assign(Object.assign({}, from ? { from: from } : {}), to ? { to: to } : {});
            return yield DataAPIClient.callAPI(accessToken, `${Constants_1.Constants.API_URL}/data/v1/accounts/${accountId}/transactions`, qs);
        });
    }
    /**
     * Call to /accounts/account_id/transactions/pending API
     *
     * @param accessToken
     * @param accountId
     * @returns {Promise<IResult<ITransaction>>}
     */
    static getPendingTransactions(accessToken, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DataAPIClient.callAPI(accessToken, `${Constants_1.Constants.API_URL}/data/v1/accounts/${accountId}/transactions/pending`);
        });
    }
    /**
     * Call to /accounts/account_id/balance API
     *
     * @param accessToken
     * @param accountId
     * @returns {Promise<IResult<IBalance>>}
     */
    static getBalance(accessToken, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DataAPIClient.callAPI(accessToken, `${Constants_1.Constants.API_URL}/data/v1/accounts/${accountId}/balance`);
        });
    }
    /**
     * Call to /accounts/account_id/direct_debits API
     *
     * @param accessToken
     * @param accountId
     * @returns {Promise<IResult<IDirectDebit>>}
     */
    static getDirectDebits(accessToken, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DataAPIClient.callAPI(accessToken, `${Constants_1.Constants.API_URL}/data/v1/accounts/${accountId}/direct_debits`);
        });
    }
    /**
     * Call to /accounts/account_id/standing_orders API
     *
     * @param accessToken
     * @param accountId
     * @returns {Promise<IResult<IStandingOrder>>}
     */
    static getStandingOrders(accessToken, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DataAPIClient.callAPI(accessToken, `${Constants_1.Constants.API_URL}/data/v1/accounts/${accountId}/standing_orders`);
        });
    }
    /**
     * Call to /cards API.
     *
     * @param accessToken
     * @returns {Promise<IResult<ICard>>}
     */
    static getCards(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DataAPIClient.callAPI(accessToken, `${Constants_1.Constants.API_URL}/data/v1/cards`);
        });
    }
    /**
     * Call to /cards/account_id API.
     *
     * @param accessToken
     * @param accountId
     * @returns {Promise<IResult<ICard>>}
     */
    static getCard(accessToken, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DataAPIClient.callAPI(accessToken, `${Constants_1.Constants.API_URL}/data/v1/cards/${accountId}`);
        });
    }
    /**
     * Call to /cards/account_id/transactions API
     * Date format expected: YYYY-MM-DD
     *
     * @param accessToken
     * @param accountId
     * @param from
     * @param to
     * @returns {Promise<IResult<ICardTransaction>>}
     */
    static getCardTransactions(accessToken, accountId, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const qs = Object.assign(Object.assign({}, from ? { from: from } : {}), to ? { to: to } : {});
            return yield DataAPIClient.callAPI(accessToken, `${Constants_1.Constants.API_URL}/data/v1/cards/${accountId}/transactions`, qs);
        });
    }
    /**
     * Call to /cards/account_id/transactions/pending API
     *
     * @param accessToken
     * @param accountId
     * @returns {Promise<IResult<ICardTransaction>>}
     */
    static getCardPendingTransactions(accessToken, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DataAPIClient.callAPI(accessToken, `${Constants_1.Constants.API_URL}/data/v1/cards/${accountId}/transactions/pending`);
        });
    }
    /**
     * Call to /cards/account_id/balance API
     *
     * @param accessToken
     * @param accountId
     * @returns {Promise<IResult<ICardBalance>>}
     */
    static getCardBalance(accessToken, accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield DataAPIClient.callAPI(accessToken, `${Constants_1.Constants.API_URL}/data/v1/cards/${accountId}/balance`);
        });
    }
    /**
     * Returns a boolean indicating whether the token is valid.
     *
     * @param {string} accessToken
     * @returns {boolean}
     */
    static validateToken(accessToken) {
        let decoded;
        try {
            decoded = decode(accessToken);
        }
        catch (error) {
            return false;
        }
        const expiry = decoded.exp;
        const now = moment().utc().unix();
        return now - expiry < 0;
    }
}
exports.DataAPIClient = DataAPIClient;
