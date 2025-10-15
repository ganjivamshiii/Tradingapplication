import React from 'react';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency, formatDate } from '../../utils/formatters';

function CandlestickChart({ data }) {
  const chartData = data.map(item => ({
    date: formatDate(item.timestamp),
    high: item.high,
    low: item.low,
    open: item.open,
    close: item.close,
    color: item.close >= item.open ? '#10b981' : '#ef4444'
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip formatter={(value) => formatCurrency(value)} />
        <Legend />
        <Bar dataKey="high" fill="#10b981" name="High" />
        <Bar dataKey="low" fill="#ef4444" name="Low" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default CandlestickChart;