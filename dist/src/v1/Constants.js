"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Project wide constants
 * @class Constants
 */
class Constants {
}
exports.Constants = Constants;
// Constants
Constants.AUTH_URL = "https://auth.truelayer-sandbox.com";
Constants.API_URL = "https://api.truelayer-sandbox.com";
Constants.STATUS_URL = "https://status-api.truelayer.com";
Constants.API_TIMEOUT = 60000;
Constants.AVAILABLE_SCOPES = ["offline_access", "info", "accounts", "transactions", "balance", "cards", "direct_debits", "standing_orders"];
