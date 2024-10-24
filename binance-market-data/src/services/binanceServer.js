// src/services/binanceService.js
export const connectWebSocket = (symbol, interval, onMessage) => {
    let ws;
    const connect = () => {
      ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`);
  
      ws.onopen = () => console.log(`Connected to ${symbol} at ${interval}`);
  
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.k) onMessage(data);
      };
  
      ws.onclose = (event) => {
        console.warn("WebSocket closed. Reconnecting...");
        setTimeout(connect, 1000); // Reconnect after 1 second
      };
  
      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        ws.close(); // Close and trigger reconnect logic
      };
    };
  
    connect();
    return ws;
  };
  