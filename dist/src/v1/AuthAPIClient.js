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
/**
 * Class responsible for performing authentication with TrueLayer
 *
 * @export
 * @class AuthAPIClient
 */
class AuthAPIClient {
    /**
     * Creates an instance of AuthAPIClient - If no constructor options are passed then look for environment variables by default.
     *
     * @param {IOptions} options
     */
    constructor(options) {
        if (options) {
            this.options = options;
        }
        else if (process.env.CLIENT_ID && process.env.CLIENT_SECRET) {
            this.options = {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET
            };
        }
        else {
            throw new Error("Need to pass client_id and client_secret or set as environment variables");
        }
    }
    /**
     * Builds a correctly formatted authentication url
     *
     * @param {object} options
     * @returns {string}
     */
    getAuthUrl(options) {
        const { scope, redirectURI, nonce, responseMode, state, enableMock, enableCredentialsSharing, enableCredentialsSharingDe, enableOauth, enableOpenBanking, disableProviders, providerId } = options;
        for (const grant of scope) {
            if (!AuthAPIClient.isValidScope(grant)) {
                throw new Error(`Provided scope is not valid: ${grant}`);
            }
        }
        let concatDisableProviders = "";
        if (disableProviders) {
            concatDisableProviders = disableProviders.join(" ");
        }
        const concatScope = scope.join(" ");
        let authUrl = `${Constants_1.Constants.AUTH_URL}/?` +
            `response_type=code&` +
            `client_id=${this.options.client_id}&` +
            `redirect_uri=${redirectURI}&` +
            `scope=${concatScope}&` +
            `nonce=${nonce}`;
        if (responseMode) {
            authUrl += `&response_mode=${responseMode}`;
        }
        if (state) {
            authUrl += `&state=${state}`;
        }
        if (enableMock) {
            authUrl += `&enable_mock=true`;
        }
        if (enableCredentialsSharing) {
            authUrl += `&enable_credentials_sharing_providers=true`;
        }
        if (enableCredentialsSharingDe) {
            authUrl += `&enable_credentials_sharing_providers_de=true`;
        }
        if (enableOauth) {
            authUrl += `&enable_oauth_providers=true`;
        }
        if (enableOpenBanking) {
            authUrl += `&enable_open_banking_providers=true`;
        }
        if (concatDisableProviders) {
            authUrl += `&disable_providers=${concatDisableProviders}`;
        }
        if (providerId) {
            authUrl += `&provider_id=${providerId}`;
        }
        return encodeURI(authUrl);
    }
    /**
     * Validates that a given string is a correct scope literal
     *
     * @private
     * @param {string} grant
     * @returns {boolean}
     */
    static isValidScope(grant) {
        return Constants_1.Constants.AVAILABLE_SCOPES.includes(grant);
    }
    /**
     * Exchanges an auth code for an access token
     *
     * @param {string} redirectURI
     * @param {string} code
     * @returns {Promise<ITokenResponse>}
     */
    exchangeCodeForToken(redirectURI, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = {
                uri: `${Constants_1.Constants.AUTH_URL}/connect/token`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                form: {
                    grant_type: "authorization_code",
                    client_id: this.options.client_id,
                    client_secret: this.options.client_secret,
                    redirect_uri: redirectURI,
                    code
                }
            };
            try {
                const response = yield request.post(requestOptions);
                const parsedResponse = JSON.parse(response);
                return {
                    access_token: parsedResponse.access_token,
                    refresh_token: parsedResponse.refresh_token
                };
            }
            catch (error) {
                throw new APIError_1.ApiError(error);
            }
        });
    }
    /**
     * Exchanges a refresh token for a fresh access token
     *
     * @param {string} refreshToken
     * @returns {Promise<ITokenResponse>}
     */
    refreshAccessToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = {
                uri: `${Constants_1.Constants.AUTH_URL}/connect/token`,
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                form: {
                    grant_type: "refresh_token",
                    client_id: this.options.client_id,
                    client_secret: this.options.client_secret,
                    refresh_token: refreshToken
                }
            };
            try {
                const response = yield request(requestOptions);
                const parsedResponse = JSON.parse(response);
                return {
                    access_token: parsedResponse.access_token,
                    refresh_token: parsedResponse.refresh_token
                };
            }
            catch (error) {
                throw new APIError_1.ApiError(error);
            }
        });
    }
    /**
     * Gets info about available providers
     * Docs: https://docs.truelayer.com/#list-of-supported-providers
     *
     * @param {string} [type] when provided, returns only providers of the given type
    */
    static getProviderInfos(type) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = {
                uri: `${Constants_1.Constants.AUTH_URL}/api/providers/${type || ""}`,
            };
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
}
exports.AuthAPIClient = AuthAPIClient;
