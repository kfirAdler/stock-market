import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StockList = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/stocks');
        setStocks(response.data);
      } catch (error) {
        console.error('Error fetching stocks', error);
      }
    };

    fetchStocks();
  }, []);

  return (
    <div>
      <h1>Stock List</h1>
      <ul>
        {stocks.map(stock => (
          <li key={stock.id}>{stock.name} ({stock.symbol}): ${stock.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default StockList;
