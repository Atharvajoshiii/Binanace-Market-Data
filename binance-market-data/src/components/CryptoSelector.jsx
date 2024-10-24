// src/components/CryptoSelector.jsx
import React from 'react';

const CryptoSelector = ({ selectedSymbol, onChangeSymbol, interval, onChangeInterval }) => (
  <div className="flex gap-4">
    <select value={selectedSymbol} onChange={e => onChangeSymbol(e.target.value)}>
      <option value="ethusdt">ETH/USDT</option>
      <option value="bnbusdt">BNB/USDT</option>
      <option value="dotusdt">DOT/USDT</option>
    </select>

    <select value={interval} onChange={e => onChangeInterval(e.target.value)}>
      <option value="1m">1 Minute</option>
      <option value="3m">3 Minutes</option>
      <option value="5m">5 Minutes</option>
    </select>
  </div>
);

export default CryptoSelector;
