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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cheerio_1 = require("cheerio");
var cors_1 = require("cors");
var app = express();
app.use((0, cors_1.default)());
function getStockData(symbol) {
    return __awaiter(this, void 0, void 0, function () {
        var url, response, html, historicalData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://finance.yahoo.com/quote/".concat(symbol, "/history?p=").concat(symbol);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url)];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Failed to fetch. Status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.text()];
                case 3:
                    html = _a.sent();
                    historicalData = parseStockDataFromHTML(html);
                    return [2 /*return*/, historicalData];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error fetching stock data:', error_1.message);
                    throw error_1;
                case 5: return [2 /*return*/];
            }
        });
    });
}
function parseStockDataFromHTML(html) {
    var $ = cheerio_1.default.load(html);
    var historicalData = [];
    // Assuming the data is present in a table on the webpage
    $('table tbody tr').each(function (index, element) {
        var columns = $(element).find('td');
        var date = columns.eq(0).text().trim();
        var open = parseFloat(columns.eq(1).text().trim().replace(/,/g, ''));
        var high = parseFloat(columns.eq(2).text().trim().replace(/,/g, ''));
        var low = parseFloat(columns.eq(3).text().trim().replace(/,/g, ''));
        var close = parseFloat(columns.eq(4).text().trim().replace(/,/g, ''));
        var volume = parseInt(columns.eq(6).text().trim().replace(/,/g, ''), 10);
        historicalData.push({
            date: date,
            open: open,
            high: high,
            low: low,
            close: close,
            volume: volume,
        });
    });
    return historicalData;
}
app.get('/api/data', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var symbol, historicalData, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                symbol = req.query.symbol;
                if (!symbol) {
                    // If symbol is not provided in the query, respond with a bad request status
                    return [2 /*return*/, res.status(400).json({ error: 'Stock symbol is required in the query parameters.' })];
                }
                return [4 /*yield*/, getStockData(symbol)];
            case 1:
                historicalData = _a.sent();
                console.log(historicalData);
                res.json(historicalData);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error('Error in API request:', error_2.message);
                res.status(500).json({ error: 'Internal Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/api/stocks', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var search, apiUrl, apiResponse, responseData, symbols, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                search = req.query.search;
                apiUrl = "https://query2.finance.yahoo.com/v1/finance/search?q=".concat(search, "&lang=en-US&region=US&quotesCount=6&enableResearchReports=false");
                return [4 /*yield*/, fetch(apiUrl)];
            case 1:
                apiResponse = _a.sent();
                return [4 /*yield*/, apiResponse.json()];
            case 2:
                responseData = _a.sent();
                symbols = responseData.quotes.map(function (quote) { return quote.symbol; });
                res.json(symbols);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                console.error('Error in API request:', error_3.message);
                res.status(500).json({ error: 'Internal Server Error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.listen(3001, function () {
    console.log('Server listening on port 3001');
});
