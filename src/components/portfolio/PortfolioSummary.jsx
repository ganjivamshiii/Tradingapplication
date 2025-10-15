import React from 'react';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import Card from '../common/Card';

function PortfolioSummary({ portfolio }) {
  if (!portfolio) return null;

  return (
    <Card title={`Portfolio Summary - ${portfolio.strategy}`}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Value</div>
          <div className="text-2xl font-bold text-gray-900">{formatCurrency(portfolio.total_value)}</div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Cash</div>
          <div className="text-2xl font-bold text-gray-900">{formatCurrency(portfolio.cash)}</div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Invested</div>
          <div className="text-2xl font-bold text-gray-900">{formatCurrency(portfolio.invested)}</div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total PnL</div>
          <div className={`text-2xl font-bold ${portfolio.total_pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(portfolio.total_pnl)}
            <div className="text-sm mt-1">
              ({formatPercent(portfolio.total_pnl_percent)})
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Trades</div>
          <div className="text-2xl font-bold text-gray-900">{portfolio.total_trades}</div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Win Rate</div>
          <div className="text-2xl font-bold text-gray-900">{portfolio.win_rate.toFixed(2)}%</div>
        </div>
      </div>
    </Card>
  );
}

export default PortfolioSummary;