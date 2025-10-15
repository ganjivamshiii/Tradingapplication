import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency, formatDate } from '../../utils/formatters';

function EquityCurve({ data }) {
  const chartData = data.map(item => ({
    date: formatDate(item.timestamp),
    value: item.portfolio_value,
    returns: item.returns
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip 
          formatter={(value, name) => {
            if (name === 'Portfolio Value') return formatCurrency(value);
            return `${value.toFixed(2)}%`;
          }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#3b82f6" 
          strokeWidth={2} 
          name="Portfolio Value" 
          dot={false} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default EquityCurve;