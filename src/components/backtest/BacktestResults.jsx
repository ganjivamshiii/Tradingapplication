import React from 'react';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import Card from '../common/Card';
import EquityCurve from '../charts/EquityCurve';

function BacktestResults({ results }) {
  return (
    <div className="space-y-6">
      <Card title={`Results - ${results.strategy}`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Initial Capital</div>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(results.initial_capital)}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Final Value</div>
            <div className="text-2xl font-bold text-gray-900">{formatCurrency(results.final_portfolio_value)}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Return</div>
            <div className={`text-2xl font-bold ${results.total_return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatPercent(results.total_return_percent)}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Win Rate</div>
            <div className="text-2xl font-bold text-gray-900">{results.win_rate.toFixed(2)}%</div>
          </div>
        </div>
      </Card>

      <Card title="Equity Curve">
        <EquityCurve data={results.equity_curve} />
      </Card>
    </div>
  );
}

export default BacktestResults;