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
const AuthAPIClient_1 = require("../../src/v1/AuthAPIClient");
const fixtures_1 = require("./fixtures");
const ava_1 = require("ava");
const request = require("request-promise");
const sinon = require("sinon");
const TrueLayer = require("../../index");
// Build client options
const options = {
    client_id: "client_id",
    client_secret: "client_secret"
};
// Create an array of scopes
const scope = [
    "offline_access",
    "info",
    "accounts",
    "transactions",
    "balance",
    "cards"
];
// Create auth client instance
const client = new TrueLayer.AuthAPIClient(options);
// Instantiate to access fixtures
const fixtures = new fixtures_1.Fixtures();
ava_1.test("Get authentication URL - no mock or response mode", (t) => {
    t.plan(1);
    const actual = client.getAuthUrl({
        redirectURI: "http://url",
        scope,
        nonce: "nonce",
        state: "state",
        enableMock: false
    });
    const expected = "https://auth.truelayer.com/?response_type=code&client_id=client_id&redirect_uri=http://url&scope=offline_access%20info%20accounts%20transactions%20balance%20cards&nonce=nonce&state=state";
    t.is(actual, expected, "Authentication url does not have the expected value");
});
ava_1.test("Get authentication URL - with explicit response mode and without mock enabled", (t) => {
    t.plan(1);
    const actual = client.getAuthUrl({
        redirectURI: "http://url",
        scope,
        nonce: "nonce",
        responseMode: "form_post",
        state: "state",
        enableMock: false
    });
    const expected = "https://auth.truelayer.com/?response_type=code&client_id=client_id&redirect_uri=http://url&scope=offline_access%20info%20accounts%20transactions%20balance%20cards&nonce=nonce&response_mode=form_post&state=state";
    t.is(actual, expected, "Authentication url does not have the expected value");
});
ava_1.test("Get authentication URL - with mock and state", (t) => {
    t.plan(1);
    const actual = client.getAuthUrl({
        redirectURI: "http://url",
        scope,
        nonce: "nonce",
        state: "state",
        enableMock: true
    });
    const expected = "https://auth.truelayer.com/?response_type=code&client_id=client_id&redirect_uri=http://url&scope=offline_access%20info%20accounts%20transactions%20balance%20cards&nonce=nonce&state=state&enable_mock=true";
    t.is(actual, expected, "Authentication url does not have the expected value");
});
ava_1.test("Get authentication URL - all optional params provided", (t) => {
    t.plan(1);
    const response = client.getAuthUrl({
        redirectURI: "http://url",
        scope,
        nonce: "nonce",
        responseMode: "form_post",
        state: "state",
        enableMock: true,
        enableCredentialsSharing: true,
        enableCredentialsSharingDe: true,
        enableOauth: true,
        enableOpenBanking: true,
        disableProviders: ["a", "b", "c"],
        providerId: "z"
    });
    const expected = "https://auth.truelayer.com/?response_type=code&client_id=client_id&redirect_uri=http://url&scope=offline_access%20info%20accounts%20transactions%20balance%20cards&nonce=nonce&response_mode=form_post&state=state&enable_mock=true&enable_credentials_sharing_providers=true&enable_credentials_sharing_providers_de=true&enable_oauth_providers=true&enable_open_banking_providers=true&disable_providers=a%20b%20c&provider_id=z";
    t.is(response, expected, "Authentication url does not have the expected value");
});
ava_1.test("Get authentication URL - no optional params provided", (t) => {
    t.plan(1);
    const response = client.getAuthUrl({
        redirectURI: "http://url",
        scope,
        nonce: "nonce"
    });
    const expected = "https://auth.truelayer.com/?response_type=code&client_id=client_id&redirect_uri=http://url&scope=offline_access%20info%20accounts%20transactions%20balance%20cards&nonce=nonce";
    t.is(response, expected, "Authentication url does not have the expected value");
});
ava_1.test("Exchange code for token", (t) => __awaiter(void 0, void 0, void 0, function* () {
    t.plan(2);
    sinon.stub(request, "post").returns(fixtures.authResponse);
    const expected = {
        access_token: "test_access_token",
        refresh_token: "test_refresh_token"
    };
    const actual = yield client.exchangeCodeForToken("https://test.com", "dummy_code");
    t.deepEqual(actual.access_token, expected.access_token, "Access token not as expected");
    t.deepEqual(actual.refresh_token, expected.refresh_token, "Refresh token not as expected");
}));
ava_1.test("Get providers", (t) => __awaiter(void 0, void 0, void 0, function* () {
    t.plan(2);
    const stub = sinon.stub(request, "get").returns(JSON.stringify(fixtures.providersResponse));
    const actual = yield AuthAPIClient_1.AuthAPIClient.getProviderInfos("oauth");
    const expectedGetUri = "https://auth.truelayer.com/api/providers/oauth";
    t.is(stub.getCall(0).args[0].uri, expectedGetUri);
    t.deepEqual(actual, fixtures.providersResponse);
}));
