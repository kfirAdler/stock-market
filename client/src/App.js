import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import StockList from './pages/StockList';
import StockPage from './pages/StockPage';

function App() {
  return (
    <Router>
      <div>
        <nav>
          {/* <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/stocks">Stock List</Link>
            </li>
          </ul> */}
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stocks" element={<StockList/>} />
          <Route path="/stock/:symbol" element={<StockPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
