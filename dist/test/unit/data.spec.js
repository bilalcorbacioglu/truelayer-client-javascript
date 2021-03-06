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
const Constants_1 = require("../../src/v1/Constants");
const DataAPIClient_1 = require("../../src/v1/DataAPIClient");
const fixtures_1 = require("./fixtures");
const ava_1 = require("ava");
const request = require("request-promise");
const sinon = require("sinon");
// Instantiate to access fixtures
const fixtures = new fixtures_1.Fixtures();
// validateToken() tests
ava_1.test("validateToken returns false on expired token", (t) => __awaiter(void 0, void 0, void 0, function* () {
    t.plan(1);
    const expired = DataAPIClient_1.DataAPIClient.validateToken(fixtures.accessToken);
    t.false(expired);
}));
// Create sinon instance
const mock = sinon.sandbox.create();
ava_1.test.afterEach((t) => {
    // After each test restore stubbed methods
    mock.restore();
});
ava_1.test("buildRequestOptions() - returns well formed request options - required params", (t) => __awaiter(void 0, void 0, void 0, function* () {
    t.plan(1);
    const actual = yield DataAPIClient_1.DataAPIClient.buildRequestOptions(fixtures.accessToken, `${Constants_1.Constants.API_URL}/data/v1/info`);
    const expected = fixtures.requestOptions;
    t.deepEqual(actual, expected, "Incorrect response object.");
}));
ava_1.test("buildRequestOptions() - returns well formed request options - all params", (t) => __awaiter(void 0, void 0, void 0, function* () {
    const qs = {
        from: "2017-04-20",
        to: "2017-04-30"
    };
    t.plan(1);
    const actual = yield DataAPIClient_1.DataAPIClient.buildRequestOptions(fixtures.accessToken, `${Constants_1.Constants.API_URL}/data/v1/info`, qs);
    const expected = fixtures.requestOptionsQs;
    t.deepEqual(actual, expected, "Incorrect response object.");
}));
// Get access token from environment variable
const access_token = process.env.access_token;
// Only run the below stubbed tests with a valid access token
if (DataAPIClient_1.DataAPIClient.validateToken(access_token)) {
    ava_1.test("validateToken returns false on fresh token", (t) => __awaiter(void 0, void 0, void 0, function* () {
        t.plan(1);
        const expired = DataAPIClient_1.DataAPIClient.validateToken(access_token);
        t.true(expired, "You need to provide a working access token that hasn't gone beyond its one hour expiration");
    }));
    ava_1.test("stubbed request body for /Me endpoint is correctly parsed", (t) => __awaiter(void 0, void 0, void 0, function* () {
        const expected = fixtures.meResponse;
        mock.stub(request, "get").returns(JSON.stringify(expected));
        const actual = yield DataAPIClient_1.DataAPIClient.getMe(access_token);
        t.plan(1);
        t.deepEqual(actual, expected);
    }));
    ava_1.test.serial("stubbed request body for /Info endpoint is correctly parsed", (t) => __awaiter(void 0, void 0, void 0, function* () {
        const expected = fixtures.infoResponse;
        mock.stub(request, "get").returns(JSON.stringify(expected));
        const actual = yield DataAPIClient_1.DataAPIClient.getInfo(access_token);
        t.plan(1);
        t.deepEqual(actual, expected);
    }));
    ava_1.test.serial("stubbed request body for /Accounts endpoint is correctly parsed", (t) => __awaiter(void 0, void 0, void 0, function* () {
        const expected = fixtures.accountsResponse;
        mock.stub(request, "get").returns(JSON.stringify(expected));
        const actual = yield DataAPIClient_1.DataAPIClient.getAccounts(access_token);
        t.plan(1);
        t.deepEqual(actual, expected);
    }));
    ava_1.test.serial("stubbed request body for /Accounts/{id} endpoint.deepEqual correctly parsed", (t) => __awaiter(void 0, void 0, void 0, function* () {
        const expected = fixtures.accountsResponse;
        mock.stub(request, "get").returns(JSON.stringify(expected));
        const actual = yield DataAPIClient_1.DataAPIClient.getAccount(access_token, "test_account_id");
        t.plan(1);
        t.deepEqual(actual, expected);
    }));
    ava_1.test.serial("stubbed request body for /Accounts/{id}/Balance endpoint is correctly parsed", (t) => __awaiter(void 0, void 0, void 0, function* () {
        const expected = fixtures.accountBalanceResponse;
        mock.stub(request, "get").returns(JSON.stringify(expected));
        const actual = yield DataAPIClient_1.DataAPIClient.getBalance(access_token, "test_account_id");
        t.plan(1);
        t.deepEqual(actual, expected);
    }));
    ava_1.test.serial("stubbed request body for /Accounts/{id}/Transactions endpoint is correctly parsed", (t) => __awaiter(void 0, void 0, void 0, function* () {
        const expected = fixtures.accountTransactionsResponse;
        mock.stub(request, "get").returns(JSON.stringify(expected));
        const actual = yield DataAPIClient_1.DataAPIClient.getTransactions(access_token, "test_account_id", "2017-04-20", "2017-04-30");
        t.plan(1);
        t.deepEqual(actual, expected);
    }));
    ava_1.test.serial("stubbed request body for /Accounts/{id}/DirectDebits endpoint is correctly parsed", (t) => __awaiter(void 0, void 0, void 0, function* () {
        const expected = fixtures.accountDirectDebitResponse;
        mock.stub(request, "get").returns(JSON.stringify(expected));
        const actual = yield DataAPIClient_1.DataAPIClient.getDirectDebits(access_token, "test_account_id");
        t.plan(1);
        t.deepEqual(actual, expected);
    }));
    ava_1.test.serial("stubbed request body for /Accounts/{id}/StandingOrders endpoint is correctly parsed", (t) => __awaiter(void 0, void 0, void 0, function* () {
        const expected = fixtures.accountStandingOrderResponse;
        mock.stub(request, "get").returns(JSON.stringify(expected));
        const actual = yield DataAPIClient_1.DataAPIClient.getStandingOrders(access_token, "test_account_id");
        t.plan(1);
        t.deepEqual(actual, expected);
    }));
    ava_1.test.serial("stubbed request body for /Cards endpoint is correctly parsed", (t) => __awaiter(void 0, void 0, void 0, function* () {
        const expected = fixtures.cardsResponse;
        mock.stub(request, "get").returns(JSON.stringify(expected));
        const actual = yield DataAPIClient_1.DataAPIClient.getCards(access_token);
        t.plan(1);
        t.deepEqual(actual, expected);
    }));
    ava_1.test.serial("stubbed request body for /Cards/{id} endpoint.deepEqual correctly parsed", (t) => __awaiter(void 0, void 0, void 0, function* () {
        const expected = fixtures.cardResponse;
        mock.stub(request, "get").returns(JSON.stringify(expected));
        const actual = yield DataAPIClient_1.DataAPIClient.getCard(access_token, "test_account_id");
        t.plan(1);
        t.deepEqual(actual, expected);
    }));
    ava_1.test.serial("stubbed request body for /Cards/{id}/Balance endpoint is correctly parsed", (t) => __awaiter(void 0, void 0, void 0, function* () {
        const expected = fixtures.cardBalanceResponse;
        mock.stub(request, "get").returns(JSON.stringify(expected));
        const actual = yield DataAPIClient_1.DataAPIClient.getCardBalance(access_token, "test_account_id");
        t.plan(1);
        t.deepEqual(actual, expected);
    }));
    ava_1.test.serial("stubbed request body for /Cards/{id}/Transactions endpoint is correctly parsed", (t) => __awaiter(void 0, void 0, void 0, function* () {
        const expected = fixtures.cardTransactionsResponse;
        mock.stub(request, "get").returns(JSON.stringify(expected));
        const actual = yield DataAPIClient_1.DataAPIClient.getCardTransactions(access_token, "test_account_id", "2017-04-20", "2017-04-30");
        t.plan(1);
        t.deepEqual(actual, expected);
    }));
}
