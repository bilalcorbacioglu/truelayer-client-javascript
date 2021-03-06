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
const DataAPIClient_1 = require("../../src/v1/DataAPIClient");
const ava_1 = require("ava");
const moment = require("moment");
const StatusAPIClient_1 = require("../../src/v1/StatusAPIClient");
// Get access token from environment variable
const access_token = process.env.access_token;
if (DataAPIClient_1.DataAPIClient.validateToken(access_token)) {
    ava_1.test.serial("Get /me returns success", (t) => __awaiter(void 0, void 0, void 0, function* () {
        t.plan(1);
        const response = yield t.notThrows(DataAPIClient_1.DataAPIClient.getMe(access_token));
    }));
    ava_1.test.serial("Get /me returns error - invalid token", (t) => __awaiter(void 0, void 0, void 0, function* () {
        t.plan(3);
        const error = yield t.throws(DataAPIClient_1.DataAPIClient.getMe("invalid_token"));
        t.is(error.error, "invalid_access_token");
        t.is(error.message, "Invalid access token.");
    }));
    ava_1.test.serial("Get /info returns success", (t) => __awaiter(void 0, void 0, void 0, function* () {
        t.plan(1);
        const response = yield t.notThrows(DataAPIClient_1.DataAPIClient.getInfo(access_token));
    }));
    ava_1.test.serial("Get /info returns error - invalid token", (t) => __awaiter(void 0, void 0, void 0, function* () {
        t.plan(3);
        const error = yield t.throws(DataAPIClient_1.DataAPIClient.getInfo("invalid_token"));
        t.is(error.error, "invalid_access_token");
        t.is(error.message, "Invalid access token.");
    }));
    ava_1.test.serial("Get /accounts returns success", (t) => __awaiter(void 0, void 0, void 0, function* () {
        t.plan(1);
        const response = yield t.notThrows(DataAPIClient_1.DataAPIClient.getAccounts(access_token));
    }));
    ava_1.test.serial("Get /accounts returns error - invalid token", (t) => __awaiter(void 0, void 0, void 0, function* () {
        t.plan(3);
        const error = yield t.throws(DataAPIClient_1.DataAPIClient.getAccounts("invalid_token"));
        t.is(error.error, "invalid_access_token");
        t.is(error.message, "Invalid access token.");
    }));
    ava_1.test.serial("Get /account returns success for each result account", (t) => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield DataAPIClient_1.DataAPIClient.getAccounts(access_token);
        const accounts = resp.results;
        const assertions = accounts.length;
        t.plan(assertions);
        for (const account of accounts) {
            const response = yield t.notThrows(DataAPIClient_1.DataAPIClient.getAccount(access_token, account.account_id));
        }
    }));
    ava_1.test.serial("Get /account returns error - invalid token", (t) => __awaiter(void 0, void 0, void 0, function* () {
        t.plan(3);
        const error = yield t.throws(DataAPIClient_1.DataAPIClient.getAccount("invalid_token", "account"));
        t.is(error.error, "invalid_access_token");
        t.is(error.message, "Invalid access token.");
    }));
    ava_1.test.serial("Get /account returns error - invalid account", (t) => __awaiter(void 0, void 0, void 0, function* () {
        t.plan(3);
        const error = yield t.throws(DataAPIClient_1.DataAPIClient.getAccount(access_token, "invalid_account"));
        t.is(error.error, "account_not_found");
        t.is(error.message, "account not found");
    }));
    ava_1.test.serial("Get /accounts/{id}/transactions returns success for each account", (t) => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield DataAPIClient_1.DataAPIClient.getAccounts(access_token);
        const accounts = resp.results;
        const assertions = accounts.length;
        t.plan(assertions);
        const from = moment().subtract(1, "month").format("YYYY-MM-DD");
        const to = moment().format("YYYY-MM-DD");
        for (const account of accounts) {
            const response = yield t.notThrows(DataAPIClient_1.DataAPIClient.getTransactions(access_token, account.account_id, from, to));
        }
    }));
    ava_1.test.serial("Get /accounts/{id}/transactions returns error - invalid token", (t) => __awaiter(void 0, void 0, void 0, function* () {
        t.plan(3);
        const error = yield t.throws(DataAPIClient_1.DataAPIClient.getTransactions("invalid_token", "invalid_account", "2017-05-05", "2017-05-07"));
        t.is(error.error, "invalid_access_token");
        t.is(error.message, "Invalid access token.");
    }));
    ava_1.test.serial("Get /accounts/{id}/transactions returns error - invalid account", (t) => __awaiter(void 0, void 0, void 0, function* () {
        t.plan(3);
        const error = yield t.throws(DataAPIClient_1.DataAPIClient.getTransactions(access_token, "invalid_account", "2017-05-05", "2017-05-07"));
        t.is(error.error, "account_not_found");
        t.is(error.message, "account not found");
    }));
    ava_1.test.serial("Get /accounts/{id}/transactions/pending returns success for each account", (t) => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield DataAPIClient_1.DataAPIClient.getAccounts(access_token);
        const accounts = resp.results;
        const assertions = accounts.length;
        t.plan(assertions);
        for (const account of accounts) {
            yield t.notThrows(DataAPIClient_1.DataAPIClient.getPendingTransactions(access_token, account.account_id));
        }
    }));
    ava_1.test.serial("Get /accounts/{id}/transactions/pending returns error - invalid token", (t) => __awaiter(void 0, void 0, void 0, function* () {
        t.plan(3);
        const error = yield t.throws(DataAPIClient_1.DataAPIClient.getPendingTransactions("invalid_token", "invalid_account"));
        t.is(error.error, "invalid_access_token");
        t.is(error.message, "Invalid access token.");
    }));
    ava_1.test.serial("Get /accounts/{id}/transactions/pending returns error - invalid account", (t) => __awaiter(void 0, void 0, void 0, function* () {
        t.plan(3);
        const error = yield t.throws(DataAPIClient_1.DataAPIClient.getPendingTransactions(access_token, "invalid_account"));
        t.is(error.error, "account_not_found");
        t.is(error.message, "account not found");
    }));
    ava_1.test.serial("Get /accounts/{id}/balance returns success for each account", (t) => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield DataAPIClient_1.DataAPIClient.getAccounts(access_token);
        const accounts = resp.results;
        const assertions = accounts.length;
        t.plan(assertions);
        for (const account of accounts) {
            const response = yield t.notThrows(DataAPIClient_1.DataAPIClient.getBalance(access_token, account.account_id));
        }
    }));
    ava_1.test.serial("Get /accounts/{id}/balance returns error - invalid token", (t) => __awaiter(void 0, void 0, void 0, function* () {
        t.plan(3);
        const error = yield t.throws(DataAPIClient_1.DataAPIClient.getBalance("invalid_token", "invalid_account"));
        t.is(error.error, "invalid_access_token");
        t.is(error.message, "Invalid access token.");
    }));
    ava_1.test.serial("Get /accounts/{id}/balance returns error - invalid account", (t) => __awaiter(void 0, void 0, void 0, function* () {
        t.plan(3);
        const error = yield t.throws(DataAPIClient_1.DataAPIClient.getBalance(access_token, "invalid_account"));
        t.is(error.error, "account_not_found");
        t.is(error.message, "account not found");
    }));
    /** cards **/
    ava_1.test.serial("Get /cards returns success", (t) => __awaiter(void 0, void 0, void 0, function* () {
        t.plan(1);
        const response = yield t.notThrows(DataAPIClient_1.DataAPIClient.getCards(access_token));
    }));
    ava_1.test.serial("Get /cards returns error - invalid token", (t) => __awaiter(void 0, void 0, void 0, function* () {
        t.plan(3);
        const error = yield t.throws(DataAPIClient_1.DataAPIClient.getCards("invalid_token"));
        t.is(error.error, "invalid_access_token");
        t.is(error.message, "Invalid access token.");
    }));
    ava_1.test.serial("Get /cards returns success for each result account", (t) => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield DataAPIClient_1.DataAPIClient.getCards(access_token);
        const cards = resp.results;
        const assertions = cards.length;
        t.plan(assertions);
        for (const card of cards) {
            const response = yield t.notThrows(DataAPIClient_1.DataAPIClient.getCard(access_token, card.account_id));
        }
    }));
    ava_1.test.serial("Get /card returns error - invalid token", (t) => __awaiter(void 0, void 0, void 0, function* () {
        t.plan(3);
        const error = yield t.throws(DataAPIClient_1.DataAPIClient.getCard("invalid_token", "account"));
        t.is(error.error, "invalid_access_token");
        t.is(error.message, "Invalid access token.");
    }));
    ava_1.test.serial("Get /card returns error - invalid account", (t) => __awaiter(void 0, void 0, void 0, function* () {
        t.plan(3);
        const error = yield t.throws(DataAPIClient_1.DataAPIClient.getCard(access_token, "invalid_account"));
        t.is(error.error, "account_not_found");
        t.is(error.message, "account not found");
    }));
    ava_1.test.serial("Get /cards/{id}/balance returns success for each card account", (t) => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield DataAPIClient_1.DataAPIClient.getCards(access_token);
        const cards = resp.results;
        const assertions = cards.length;
        t.plan(assertions);
        for (const card of cards) {
            const response = yield t.notThrows(DataAPIClient_1.DataAPIClient.getCardBalance(access_token, card.account_id));
        }
    }));
    ava_1.test.serial("Get /cards/{id}/balance returns error - invalid token", (t) => __awaiter(void 0, void 0, void 0, function* () {
        t.plan(3);
        const error = yield t.throws(DataAPIClient_1.DataAPIClient.getCardBalance("invalid_token", "invalid_account"));
        t.is(error.error, "invalid_access_token");
        t.is(error.message, "Invalid access token.");
    }));
    ava_1.test.serial("Get /cards/{id}/balance returns error - invalid account", (t) => __awaiter(void 0, void 0, void 0, function* () {
        t.plan(3);
        const error = yield t.throws(DataAPIClient_1.DataAPIClient.getCardBalance(access_token, "invalid_account"));
        t.is(error.error, "account_not_found");
        t.is(error.message, "account not found");
    }));
    ava_1.test.serial("Get /cards/{id}/transactions returns success for each account", (t) => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield DataAPIClient_1.DataAPIClient.getCards(access_token);
        const cards = resp.results;
        const assertions = cards.length;
        t.plan(assertions);
        const from = moment().subtract(1, "month").format("YYYY-MM-DD");
        const to = moment().format("YYYY-MM-DD");
        for (const card of cards) {
            const response = yield t.notThrows(DataAPIClient_1.DataAPIClient.getCardTransactions(access_token, card.account_id, from, to));
        }
    }));
    ava_1.test.serial("Get /cards/{id}/transactions returns error - invalid token", (t) => __awaiter(void 0, void 0, void 0, function* () {
        t.plan(3);
        const error = yield t.throws(DataAPIClient_1.DataAPIClient.getCardTransactions("invalid_token", "invalid_account", "2017-05-05", "2017-05-07"));
        t.is(error.error, "invalid_access_token");
        t.is(error.message, "Invalid access token.");
    }));
    ava_1.test.serial("Get /cards/{id}/transactions returns error - invalid account", (t) => __awaiter(void 0, void 0, void 0, function* () {
        t.plan(3);
        const error = yield t.throws(DataAPIClient_1.DataAPIClient.getCardTransactions(access_token, "invalid_account", "2017-05-05", "2017-05-07"));
        t.is(error.error, "account_not_found");
        t.is(error.message, "account not found");
    }));
    ava_1.test.serial("Get /cards/{id}/transactions/pending returns success for each account", (t) => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield DataAPIClient_1.DataAPIClient.getCards(access_token);
        const cards = resp.results;
        const assertions = cards.length;
        t.plan(assertions);
        for (const card of cards) {
            yield t.notThrows(DataAPIClient_1.DataAPIClient.getCardPendingTransactions(access_token, card.account_id));
        }
    }));
    ava_1.test.serial("Get /cards/{id}/transactions/pending returns error - invalid token", (t) => __awaiter(void 0, void 0, void 0, function* () {
        t.plan(3);
        const error = yield t.throws(DataAPIClient_1.DataAPIClient.getCardPendingTransactions("invalid_token", "invalid_account"));
        t.is(error.error, "invalid_access_token");
        t.is(error.message, "Invalid access token.");
    }));
    ava_1.test.serial("Get /cards/{id}/transactions/pending returns error - invalid account", (t) => __awaiter(void 0, void 0, void 0, function* () {
        t.plan(3);
        const error = yield t.throws(DataAPIClient_1.DataAPIClient.getCardPendingTransactions(access_token, "invalid_account"));
        t.is(error.error, "account_not_found");
        t.is(error.message, "account not found");
    }));
}
else {
    ava_1.test("No 'access_token' environment variable set. Integration test disabled.", (t) => t.pass());
}
const now = moment(new Date(Date.now())).startOf("hour");
const from = now.clone().subtract(2, "hours").toDate();
const to = now.clone().subtract(1, "hours").toDate();
const providers = ["hsbc", "oauth-monzo", "ob-barclays"];
const endpoints = ["accounts", "info"];
ava_1.test.serial("Get /data/status returns success", (t) => __awaiter(void 0, void 0, void 0, function* () {
    t.plan(1);
    yield t.notThrows(StatusAPIClient_1.StatusAPIClient.getStatus(from, to, providers, endpoints));
}));
ava_1.test.serial("Get /data/status actually returns something", (t) => __awaiter(void 0, void 0, void 0, function* () {
    t.plan(1);
    const statuses = (yield StatusAPIClient_1.StatusAPIClient.getStatus(from, to, providers, endpoints)).results;
    const receivedProviders = [];
    for (const status of statuses) {
        status.providers.map((p) => receivedProviders.push(p.provider_id));
    }
    t.deepEqual(receivedProviders, providers);
}));
