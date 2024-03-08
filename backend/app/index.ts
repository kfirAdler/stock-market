import express, { Request, Response } from 'express';
import cheerio from 'cheerio';
import cors from 'cors';

const app = express();
app.use(cors());


async function getStockData(symbol: string) {
    const url = `https://finance.yahoo.com/quote/${symbol}/history?p=${symbol}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch. Status: ${response.status}`);
        }
        const html = await response.text();
        const historicalData = parseStockDataFromHTML(html);
        return historicalData;
    } catch (error: any) {
        console.error('Error fetching stock data:', error.message);
        throw error;
    }
}

function parseStockDataFromHTML(html: string): any[] {
    const $ = cheerio.load(html);
    const historicalData: any[] = [];

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

app.get('/api/data', async (req: Request, res: Response) => {
    try {
        const { symbol } = req.query;

        if (!symbol) {
            // If symbol is not provided in the query, respond with a bad request status
            return res.status(400).json({ error: 'Stock symbol is required in the query parameters.' });
        }

        const historicalData = await getStockData(symbol as string);
        console.log(historicalData);
        res.json(historicalData);
    } catch (error: any) {
        console.error('Error in API request:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/api/stocks', async (req: Request, res: Response) => {
    try {
        const { search } = req.query;
        const apiUrl = `https://query2.finance.yahoo.com/v1/finance/search?q=${search}&lang=en-US&region=US&quotesCount=6&enableResearchReports=false`;

        const apiResponse = await fetch(apiUrl);
        const responseData = await apiResponse.json();

        // Extract symbols from the quotes
        const symbols = responseData.quotes.map((quote: any) => quote.symbol);

        res.json(symbols);
    } catch (error: any) {
        console.error('Error in API request:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.listen(3001, () => {
    console.log('Server listening on port 3001');
});