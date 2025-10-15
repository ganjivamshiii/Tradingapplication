import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

function LineChart({ data, dataKeys, xAxisKey = 'date', height = 400 }) {
  const colors = ['#3b82f6', '#10b981', '#ef4444', '#f59e0b'];

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip formatter={(value) => formatCurrency(value)} />
        <Legend />
        {dataKeys.map((key, index) => (
          <Line
            key={key.dataKey}
            type="monotone"
            dataKey={key.dataKey}
            stroke={colors[index % colors.length]}
            strokeWidth={2}
            dot={false}
            name={key.name}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

export default LineChart;