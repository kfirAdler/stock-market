import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch top 50 stocks (Mock API Call)
    fetch('https://api.example.com/top50stocks')
      .then(response => response.json())
      .then(data => setStocks(data))
      .catch(error => console.error('Error fetching stock data:', error));
  }, []);

  const handleSearch = () => {
    navigate(`/stock/${searchTerm}`);
    };

  const navigateToStockList = () => {
    navigate('/stocks');    
};

  return (
    <div className={styles.home}>
      <h1>Welcome to the Stock Market App</h1>
      <div className={styles.buttons}>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a stock"
          />
        </span>
        <Button label="Search" icon="pi pi-search" onClick={handleSearch} />
        <Button label="Go to Stock List" icon="pi pi-list" onClick={navigateToStockList} />
      </div>
      <div className={styles.stockList}>
        {stocks.map((stock, index) => (
          <Card key={index} title={stock.name} subTitle={stock.symbol}>
            <p>{stock.price}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
