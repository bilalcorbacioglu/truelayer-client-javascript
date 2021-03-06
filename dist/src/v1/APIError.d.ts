/**
 * Base class extending native errors
 *
 * @class ApiError
 * @extends {Error}
 */
export declare class ApiError extends Error {
    error: string;
    /**
     * Creates an instance of ApiError.
     *
     * @param {Error} error
     */
    constructor(error: Error);
    /**
     * Construct error response
     *
     * @param {string} code
     * @param {string} description
     * @returns {IError}
     */
    private static constructErrorResponse;
    /**
     * Construct error response based on generic HTTP status code
     *
     * @param httpStatusCode
     * @returns {string}
     */
    private static genericHttpResponse;
    /**
     * Construct error response object
     *
     * @param {Error} error
     * @returns {IError}
     */
    private static getErrorResponse;
}
