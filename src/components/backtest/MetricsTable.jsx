import React from 'react';
import { formatCurrency } from '../../utils/formatters';

function MetricsTable({ metrics }) {
  const rows = [
    { label: 'Total Return', value: formatCurrency(metrics.total_return) },
    { label: 'Total Return %', value: `${metrics.total_return_percent.toFixed(2)}%` },
    { label: 'Winning Trades', value: metrics.winning_trades },
    { label: 'Losing Trades', value: metrics.losing_trades },
    { label: 'Win Rate', value: `${metrics.win_rate.toFixed(2)}%` },
    { label: 'Sharpe Ratio', value: metrics.sharpe_ratio.toFixed(2) },
    { label: 'Max Drawdown', value: `${metrics.max_drawdown.toFixed(2)}%` },
    { label: 'Avg Trade PnL', value: formatCurrency(metrics.avg_trade_pnl) },
    { label: 'Avg Win', value: formatCurrency(metrics.avg_win) },
    { label: 'Avg Loss', value: formatCurrency(metrics.avg_loss) },
    { label: 'Profit Factor', value: metrics.profit_factor.toFixed(2) },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Metric
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Value
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {row.label}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MetricsTable;