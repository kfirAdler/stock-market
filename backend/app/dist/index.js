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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cheerio_1 = __importDefault(require("cheerio"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
function getStockData(symbol) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://finance.yahoo.com/quote/${symbol}/history?p=${symbol}`;
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch. Status: ${response.status}`);
            }
            const html = yield response.text();
            const historicalData = parseStockDataFromHTML(html);
            return historicalData;
        }
        catch (error) {
            console.error('Error fetching stock data:', error.message);
            throw error;
        }
    });
}
function parseStockDataFromHTML(html) {
    const $ = cheerio_1.default.load(html);
    const historicalData = [];
    // Assuming the data is present in a table on the webpage
    $('table tbody tr').each((index, element) => {
        const columns = $(element).find('td');
        const date = columns.eq(0).text().trim();
        const open = parseFloat(columns.eq(1).text().trim().replace(/,/g, ''));
        const high = parseFloat(columns.eq(2).text().trim().replace(/,/g, ''));
        const low = parseFloat(columns.eq(3).text().trim().replace(/,/g, ''));
        const close = parseFloat(columns.eq(4).text().trim().replace(/,/g, ''));
        const volume = parseInt(columns.eq(6).text().trim().replace(/,/g, ''), 10);
        historicalData.push({
            date,
            open,
            high,
            low,
            close,
            volume,
        });
    });
    return historicalData;
}
app.get('/api/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { symbol } = req.query;
        if (!symbol) {
            // If symbol is not provided in the query, respond with a bad request status
            return res.status(400).json({ error: 'Stock symbol is required in the query parameters.' });
        }
        const historicalData = yield getStockData(symbol);
        console.log(historicalData);
        res.json(historicalData);
    }
    catch (error) {
        console.error('Error in API request:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.get('/api/stocks', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search } = req.query;
        const apiUrl = `https://query2.finance.yahoo.com/v1/finance/search?q=${search}&lang=en-US&region=US&quotesCount=6&enableResearchReports=false`;
        const apiResponse = yield fetch(apiUrl);
        const responseData = yield apiResponse.json();
        // Extract symbols from the quotes
        const symbols = responseData.quotes.map((quote) => quote.symbol);
        res.json(symbols);
    }
    catch (error) {
        console.error('Error in API request:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.listen(3001, () => {
    console.log('Server listening on port 3001');
});
