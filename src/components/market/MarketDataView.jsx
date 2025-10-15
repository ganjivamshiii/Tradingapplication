import React, { useState } from 'react';
import useMarketData from '../hooks/useMarketData';
import { formatDate } from '../../utils/formatters';
import { PERIODS, INTERVALS } from '../../utils/constants';
import Card from '../common/Card';
import Button from '../common/Button';
import Loader from '../common/Loader';
import SymbolSearch from './SymbolSearch';
import PriceCard from './PriceCard';
import LineChart from '../charts/LineChart';

function MarketDataView() {
  const [symbol, setSymbol] = useState('AAPL');
  const [period, setPeriod] = useState('1mo');
  const [interval, setInterval] = useState('1d');
  
  const { data, liveData, loading, error, fetchHistoricalData, fetchLiveData } = useMarketData();

  const handleFetchData = () => {
    fetchHistoricalData(symbol, period, interval);
  };

  const handleFetchLive = () => {
    fetchLiveData(symbol);
  };

  const handleSymbolSelect = (selectedSymbol) => {
    setSymbol(selectedSymbol);
  };

  const chartData = data?.data?.map(item => ({
    date: formatDate(item.timestamp),
    close: item.close,
    open: item.open,
    high: item.high,
    low: item.low
  })) || [];

  const lineChartKeys = [
    { dataKey: 'close', name: 'Close' },
    { dataKey: 'high', name: 'High' },
    { dataKey: 'low', name: 'Low' }
  ];

  return (
    <div className="space-y-6">
      <Card title="Market Data">
        <SymbolSearch onSelect={handleSymbolSelect} className="mb-6" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Symbol</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              placeholder="AAPL"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Period</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={period} 
              onChange={(e) => setPeriod(e.target.value)}
            >
              {PERIODS.map(p => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Interval</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={interval} 
              onChange={(e) => setInterval(e.target.value)}
            >
              {INTERVALS.map(i => (
                <option key={i.value} value={i.value}>{i.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleFetchData} disabled={loading}>
            {loading ? 'Loading...' : 'Get Data'}
          </Button>
          <Button variant="secondary" onClick={handleFetchLive}>
            Get Live Price
          </Button>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {liveData && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
            <PriceCard label="Current Price" value={liveData.price} />
            <PriceCard 
              label="Change" 
              value={`${liveData.change >= 0 ? '+' : ''}${liveData.change_percent.toFixed(2)}%`}
              change={liveData.change}
              colorize 
            />
            <PriceCard label="Open" value={liveData.open} />
            <PriceCard label="High" value={liveData.high} />
            <PriceCard label="Low" value={liveData.low} />
            <PriceCard label="Volume" value={liveData.volume.toLocaleString()} />
          </div>
        )}
      </Card>

      {loading && <Loader />}

      {chartData.length > 0 && (
        <Card title={`Price Chart - ${symbol}`}>
          <LineChart data={chartData} dataKeys={lineChartKeys} xAxisKey="date" />
          <p className="text-sm text-gray-500 mt-4">Total data points: {chartData.length}</p>
        </Card>
      )}
    </div>
  );
}

export default MarketDataView;