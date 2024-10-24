// src/components/CandlestickChart.jsx
import { useEffect, useRef } from 'react';
import { Chart, registerables, TimeScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { CandlestickController, OhlcElement } from 'chartjs-chart-financial';

// Register necessary components
Chart.register(
  ...registerables,
  CandlestickController,
  OhlcElement,  // Open-high-low-close (OHLC) element for candlestick charts
  TimeScale,
  LinearScale,
  Tooltip,
  Legend
);

const CandlestickChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const chart = new Chart(ctx, {
      type: 'candlestick',
      data: {
        datasets: [
          {
            label: 'Candlestick Data',
            data,  // Must follow {t, o, h, l, c} structure
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'top' },
        },
        scales: {
          x: {
            type: 'time',
            time: { unit: 'minute' },
            title: { display: true, text: 'Time' },
          },
          y: {
            title: { display: true, text: 'Price' },
          },
        },
      },
    });

    return () => chart.destroy(); // Cleanup on unmount
  }, [data]);

  return <canvas ref={chartRef}></canvas>;
};

export default CandlestickChart;
