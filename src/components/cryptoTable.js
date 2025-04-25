import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAllAssets } from '../store/cryptoSlice';
import mockWebSocket from '../services/mockWebSocket';
import './cryptoTable.css'; // Assuming you have a CSS file for styling

const CryptoTable = () => {
   // Select all crypto assets from Redux store
  const assets = useSelector(selectAllAssets);

 // Connect mock WebSocket on mount and clean up on unmount
  useEffect(() => {
    mockWebSocket.connect();

    return () => {
      mockWebSocket.disconnect();
    };
  }, []);

    // Format numbers for better readability (e.g., 1.5K, 2.3M, 1.2B)
  const formatNumber = (number) => {
    if (number >= 1000000000) {
      return (number / 1000000000).toFixed(2) + 'B';
    } else if (number >= 1000000) {
      return (number / 1000000).toFixed(2) + 'M';
    } else if (number >= 1000) {
      return (number / 1000).toFixed(2) + 'K';
    }
    return number.toFixed(2);
  };

    // Handle null supply values as ∞
  const formatSupply = (supply, symbol) => {
    if (supply === null) {
      return '∞';
    }
    return `${formatNumber(supply)} ${symbol}`;
  };

    // Generate inline sparkline SVG from 7-day price data
  const generateSparklineSVG = (data) => {
    if (!data || data.length < 2) {
      return null;
    }

    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);
    const height = 30;
    const width = 100;
    const points = data.map((value, index) => `${(index / (data.length - 1)) * width},${height - ((value - minValue) / (maxValue - minValue)) * (height - 5)}`).join(' ');
   

    return (
      <svg width={width} height={height}>
        <defs>
          <linearGradient id={`sparklineGradient-${Math.random()}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(0, 200, 0, 0.3)" />
            <stop offset="100%" stopColor="rgba(0, 200, 0, 0.05)" />
          </linearGradient>
        </defs>
        <path d={`M0,${height - ((data[0] - minValue) / (maxValue - minValue)) * (height - 5)} L${points} L${width},${height} L0,${height} Z`} fill={`url(#sparklineGradient-${Math.random()})`} stroke="none" />
        <path d={`M0,${height - ((data[0] - minValue) / (maxValue - minValue)) * (height - 5)} L${points}`} stroke="rgba(0, 200, 0, 0.8)" strokeWidth="1" fill="none" />
      </svg>
    );
  };

  return (
    <div className="crypto-table-container">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>1h %</th>
            <th>24h %</th>
            <th>7d %</th>
            <th>Market Cap</th>
            <th>24h Volume</th>
            <th>Circulating Supply</th>
            <th>Max Supply</th>
            <th>7D Chart</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => (
            <tr key={asset.id}>
              <td>{index + 1}</td>
              <td>
                <div className="name-container">
                  <span className="logo">{asset.symbol.slice(0, 2)}</span>
                  <div className="name-symbol">
                    <span className="name">{asset.name}</span>
                    <span className="symbol">{asset.symbol}</span>
                  </div>
                </div>
              </td>
              <td>${asset.price.toFixed(2)}</td>
              <td className={asset.change1h >= 0 ? 'positive' : 'negative'}>{asset.change1h.toFixed(2)}%</td>
              <td className={asset.change24h >= 0 ? 'positive' : 'negative'}>{asset.change24h.toFixed(2)}%</td>
              <td className={asset.change7d >= 0 ? 'positive' : 'negative'}>{asset.change7d.toFixed(2)}%</td>
              <td>${formatNumber(asset.marketCap)}</td>
              <td>${formatNumber(asset.volume24h)}</td>
              <td>{formatSupply(asset.circulatingSupply, asset.symbol)}</td>
              <td>{formatSupply(asset.maxSupply, asset.symbol)}</td>
              <td>
                <div className="sparkline">{generateSparklineSVG(asset.sparkline7d)}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;