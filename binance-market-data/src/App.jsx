// src/App.jsx
import React, { useEffect, useState } from 'react';
import CandlestickChart from './components/CandlestickChart';
import CryptoSelector from './components/CryptoSelector';
import { connectWebSocket } from './services/binanceServer';

const App = () => {
  const [symbol, setSymbol] = useState('ethusdt');
  const [interval, setInterval] = useState('1m');
  const [candlestickData, setCandlestickData] = useState([]);

  useEffect(() => {
    const socket = connectWebSocket(symbol, interval, (data) => {
      const candlestick = data.k;
      const newEntry = {
        x: new Date(candlestick.t),
        o: candlestick.o,
        h: candlestick.h,
        l: candlestick.l,
        c: candlestick.c,
      };

      setCandlestickData((prevData) => [...prevData, newEntry]);
    });

    return () => socket.close();
  }, [symbol, interval]);

  return (
    <div className="container mx-auto p-4">
      <CryptoSelector
        selectedSymbol={symbol}
        onChangeSymbol={setSymbol}
        interval={interval}
        onChangeInterval={setInterval}
      />
      <CandlestickChart data={candlestickData} />
    </div>
  );
};

export default App;
