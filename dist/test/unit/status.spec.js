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
const fixtures_1 = require("./fixtures");
const ava_1 = require("ava");
const request = require("request-promise");
const sinon = require("sinon");
const StatusAPIClient_1 = require("../../src/v1/StatusAPIClient");
// Instantiate to access fixtures
const fixtures = new fixtures_1.Fixtures();
// Create sinon instance
const mock = sinon.sandbox.create();
ava_1.test.afterEach((t) => {
    // After each test restore stubbed methods
    mock.restore();
});
ava_1.test.serial("stubbed request body for /data/status endpoint is correctly parsed", (t) => __awaiter(void 0, void 0, void 0, function* () {
    const expected = fixtures.statusResponse;
    mock.stub(request, "get").returns(JSON.stringify(expected));
    const from = new Date("2019-01-07T10:00:00");
    const to = new Date("2019-01-08T13:00:00");
    const providers = ["hsbc", "oauth-monzo", "ob-barclays"];
    const endpoints = ["accounts", "info"];
    const actual = yield StatusAPIClient_1.StatusAPIClient.getStatus(from, to, providers, endpoints);
    t.plan(1);
    t.deepEqual(actual, expected);
}));
