import React from 'react';
import { formatPercent } from '../../utils/formatters';
import Card from '../common/Card';

function StrategyComparison({ comparison }) {
  if (!comparison) return null;

  return (
    <Card title={`Strategy Comparison - ${comparison.symbol}`}>
      {comparison.best_strategy && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded mb-4">
          <strong>🏆 Best Strategy:</strong> {comparison.best_strategy.strategy} with{' '}
          {formatPercent(comparison.best_strategy.total_return_percent)} return
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Strategy
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Return
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Win Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sharpe
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Max DD
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trades
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {comparison.strategies.map((s, idx) => (
              <tr 
                key={idx} 
                className={`hover:bg-gray-50 ${
                  comparison.best_strategy && s.strategy === comparison.best_strategy.strategy 
                    ? 'bg-green-50' 
                    : ''
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {s.strategy}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${
                  s.total_return_percent >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatPercent(s.total_return_percent)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {s.win_rate.toFixed(2)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {s.sharpe_ratio.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                  {s.max_drawdown.toFixed(2)}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {s.total_trades}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default StrategyComparison;