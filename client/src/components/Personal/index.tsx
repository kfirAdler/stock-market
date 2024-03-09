import React, { useEffect, useState } from 'react';
import { IgrFinancialChart, IgrFinancialChartModule } from 'igniteui-react-charts';
import axios from 'axios';
import SearchBar from '../SearchBar';

IgrFinancialChartModule.register();

interface StockData {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

const Personal: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const [stockData, setStockData] = useState<StockData[]>([]);
    const [selectedStock, setSelectedStock] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (selectedStock) {
                    // Fetch stock data for the selected stock
                    console.log(selectedStock)
                    const response = await axios.get(`http://localhost:3001/api/data?symbol=${selectedStock}`);
                    console.log(response)
                    setStockData(response.data);
                }
            } catch (error: any) {
                console.error('Error fetching stock data:', error.message);
            }
        };

        fetchData();
    }, [selectedStock]);

    const handleSearch = (stockName: string) => {
        // Set the selected stock for fetching data
        setSelectedStock(stockName);
    };

    return (
        <div className="container sample">
            <SearchBar onSearch={handleSearch} />
            <div className="container" style={{ height: "80vh", width: "100vh" }}>
                <IgrFinancialChart
                    width="100%"
                    height="100%"
                    chartType="Candle"
                    thickness={2}
                    chartTitle="Stock Market Data"
                    subtitle={selectedStock ? `${selectedStock} - Last 100 Data Points` : ''}
                    yAxisMode="Numeric"
                    yAxisTitle="Close"
                    dataSource={stockData}
                />
            </div>
        </div>
    );
};

export default Personal;