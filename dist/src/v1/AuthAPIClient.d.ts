import { IOptions } from "./interfaces/auth/IOptions";
import { IConfig } from "./interfaces/auth/IConfig";
import { IProviderInfo } from './interfaces/auth/IProviderInfo';
import { ITokenResponse } from "./interfaces/auth/ITokenResponse";
/**
 * Class responsible for performing authentication with TrueLayer
 *
 * @export
 * @class AuthAPIClient
 */
export declare class AuthAPIClient {
    private readonly options;
    /**
     * Creates an instance of AuthAPIClient - If no constructor options are passed then look for environment variables by default.
     *
     * @param {IOptions} options
     */
    constructor(options?: IOptions);
    /**
     * Builds a correctly formatted authentication url
     *
     * @param {object} options
     * @returns {string}
     */
    getAuthUrl(options: IConfig): string;
    /**
     * Validates that a given string is a correct scope literal
     *
     * @private
     * @param {string} grant
     * @returns {boolean}
     */
    private static isValidScope;
    /**
     * Exchanges an auth code for an access token
     *
     * @param {string} redirectURI
     * @param {string} code
     * @returns {Promise<ITokenResponse>}
     */
    exchangeCodeForToken(redirectURI: string, code: string): Promise<ITokenResponse>;
    /**
     * Exchanges a refresh token for a fresh access token
     *
     * @param {string} refreshToken
     * @returns {Promise<ITokenResponse>}
     */
    refreshAccessToken(refreshToken: string): Promise<ITokenResponse>;
    /**
     * Gets info about available providers
     * Docs: https://docs.truelayer.com/#list-of-supported-providers
     *
     * @param {string} [type] when provided, returns only providers of the given type
    */
    static getProviderInfos(type?: "credentialssharing" | "oauth" | "oauth/openbanking"): Promise<IProviderInfo[]>;
}
