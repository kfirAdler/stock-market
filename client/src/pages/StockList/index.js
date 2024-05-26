import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';
import styles from './StockList.module.css';

const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStocks = async () => {
    try {
      const response = await axios.get('http://localhost:4000/v1/stocks');
      setStocks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stocks', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
    const intervalId = setInterval(fetchStocks, 30000);

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>Stock List</h1>
      {loading ? (
        <ProgressSpinner />
      ) : (
        <DataTable value={stocks} paginator rows={10} responsiveLayout="scroll">
          <Column field="name" header="Name" sortable />
          <Column field="symbol" header="Symbol" sortable />
          <Column field="price" header="Price" sortable />
        </DataTable>
      )}
    </div>
  );
};

export default StockList;
