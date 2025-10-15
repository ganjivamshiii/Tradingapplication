import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceDot } from 'recharts';
import { formatCurrency, formatDate } from '../../utils/formatters';

function SignalChart({ priceData, signals }) {
  const chartData = priceData.map(item => ({
    date: formatDate(item.timestamp),
    close: item.close,
    signal: signals.find(s => formatDate(s.timestamp) === formatDate(item.timestamp))
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip formatter={(value) => formatCurrency(value)} />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="close" 
          stroke="#3b82f6" 
          strokeWidth={2} 
          name="Price" 
          dot={false} 
        />
        {chartData.map((entry, index) => {
          if (entry.signal) {
            return (
              <ReferenceDot
                key={index}
                x={entry.date}
                y={entry.close}
                r={6}
                fill={entry.signal.signal === 'BUY' ? '#10b981' : '#ef4444'}
                stroke="white"
                strokeWidth={2}
              />
            );
          }
          return null;
        })}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SignalChart;