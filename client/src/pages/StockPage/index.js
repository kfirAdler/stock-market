import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './StockPage.module.css';
import CandlestickChart from '../../components/CandlestickChart';

const StockPage = () => {
  const { symbol } = useParams();
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    // Fetch stock data by symbol (Actual API Call)
    fetch(`http://localhost:4000/v1/stocks/${symbol}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const stock = {
            name: data[0].symbol, // Change to data[0].companyName if available
            symbol: data[0].symbol,
            chartData: data.map(item => ({ x: new Date(item.date), y: [item.open, item.high, item.low, item.close] })),
            price: data[data.length - 1].close, // Assuming 'close' is the last price in the data
            marketCap: "Example Market Cap" // Replace with actual market cap if available in data
          };
          console.log(stock.chartData);
          setStockData(stock);
        } else {
          console.error('Stock data not found for symbol:', symbol);
        }
      })
      .catch(error => console.error('Error fetching stock data:', error));
  }, [symbol]);

  return (
    <div className={styles.stockPage}>
      {stockData ? (
        <>
          <h1>{stockData.name} ({stockData.symbol})</h1>
          <div className={styles.chart}>
            <CandlestickChart data={stockData.chartData} />
          </div>
          <div className={styles.details}>
            <p>Price: {stockData.price}</p>
            <p>Market Cap: {stockData.marketCap}</p>
            {/* Add more details as needed */}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StockPage;
