import { IAccount } from "./interfaces/data/IAccount";
import { IBalance } from "./interfaces/data/IBalance";
import { IDirectDebit } from "./interfaces/data/IDirectDebit";
import { IStandingOrder } from "./interfaces/data/IStandingOrder";
import { IInfo } from "./interfaces/data/IInfo";
import { IMe } from "./interfaces/data/IMe";
import { IResult } from "./interfaces/data/IResponse";
import { ITransaction } from "./interfaces/data/ITransaction";
import * as request from "request-promise";
/** Card Interfaces **/
import { ICard } from "./interfaces/data/ICard";
import { ICardBalance } from "./interfaces/data/ICardBalance";
import { ICardTransaction } from "./interfaces/data/ICardTransaction";
/**
 * Class responsible for calling to the Data endpoints
 */
export declare class DataAPIClient {
    /**
     * Generic API calling function
     *
     * @template T
     * @param {string} accessToken
     * @param {string} path
     * @param {object} [qs]
     * @returns {Promise<IResult<T>>}
     */
    static callAPI<T>(accessToken: string, path: string, qs?: object): Promise<IResult<T>>;
    /**
     * Build Request options
     *
     * @private
     * @param {string} accessToken
     * @param {string} path
     * @param {object} [qs]
     * @returns {request.Options}
     */
    static buildRequestOptions(accessToken: string, path: string, qs?: object): request.Options;
    /**
     * Call to /me API.
     *
     * @param accessToken
     * @returns {Promise<IResult<IMe>>}
     */
    static getMe(accessToken: string): Promise<IResult<IMe>>;
    /**
     * Call to /info API.
     *
     * @param {string} accessToken
     * @returns {Promise<IResult<IInfo>>}
     */
    static getInfo(accessToken: string): Promise<IResult<IInfo>>;
    /**
     * Call to /accounts API.
     *
     * @param accessToken
     * @returns {Promise<IResult<IAccount>>}
     */
    static getAccounts(accessToken: string): Promise<IResult<IAccount>>;
    /**
     * Call to /accounts/account_id API.
     *
     * @param accessToken
     * @param accountId
     * @returns {Promise<IResult<IAccount>>}
     */
    static getAccount(accessToken: string, accountId: string): Promise<IResult<IAccount>>;
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
    static getTransactions(accessToken: string, accountId: string, from?: string, to?: string): Promise<IResult<ITransaction>>;
    /**
     * Call to /accounts/account_id/transactions/pending API
     *
     * @param accessToken
     * @param accountId
     * @returns {Promise<IResult<ITransaction>>}
     */
    static getPendingTransactions(accessToken: string, accountId: string): Promise<IResult<ITransaction>>;
    /**
     * Call to /accounts/account_id/balance API
     *
     * @param accessToken
     * @param accountId
     * @returns {Promise<IResult<IBalance>>}
     */
    static getBalance(accessToken: string, accountId: string): Promise<IResult<IBalance>>;
    /**
     * Call to /accounts/account_id/direct_debits API
     *
     * @param accessToken
     * @param accountId
     * @returns {Promise<IResult<IDirectDebit>>}
     */
    static getDirectDebits(accessToken: string, accountId: string): Promise<IResult<IDirectDebit>>;
    /**
     * Call to /accounts/account_id/standing_orders API
     *
     * @param accessToken
     * @param accountId
     * @returns {Promise<IResult<IStandingOrder>>}
     */
    static getStandingOrders(accessToken: string, accountId: string): Promise<IResult<IStandingOrder>>;
    /**
     * Call to /cards API.
     *
     * @param accessToken
     * @returns {Promise<IResult<ICard>>}
     */
    static getCards(accessToken: string): Promise<IResult<ICard>>;
    /**
     * Call to /cards/account_id API.
     *
     * @param accessToken
     * @param accountId
     * @returns {Promise<IResult<ICard>>}
     */
    static getCard(accessToken: string, accountId: string): Promise<IResult<ICard>>;
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
    static getCardTransactions(accessToken: string, accountId: string, from?: string, to?: string): Promise<IResult<ICardTransaction>>;
    /**
     * Call to /cards/account_id/transactions/pending API
     *
     * @param accessToken
     * @param accountId
     * @returns {Promise<IResult<ICardTransaction>>}
     */
    static getCardPendingTransactions(accessToken: string, accountId: string): Promise<IResult<ICardTransaction>>;
    /**
     * Call to /cards/account_id/balance API
     *
     * @param accessToken
     * @param accountId
     * @returns {Promise<IResult<ICardBalance>>}
     */
    static getCardBalance(accessToken: string, accountId: string): Promise<IResult<ICardBalance>>;
    /**
     * Returns a boolean indicating whether the token is valid.
     *
     * @param {string} accessToken
     * @returns {boolean}
     */
    static validateToken(accessToken: string): boolean;
}
