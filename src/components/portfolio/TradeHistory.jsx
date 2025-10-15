import React from 'react';
import { formatDateTime, formatCurrency } from '../../utils/formatters';
import Card from '../common/Card';

function TradeHistory({ trades }) {
  if (!trades || trades.length === 0) {
    return (
      <Card title="Trade History">
        <p className="text-center text-gray-500 py-8">No trades yet</p>
      </Card>
    );
  }

  return (
    <Card title="Trade History">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PnL</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {trades.map((trade) => (
              <tr key={trade.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDateTime(trade.timestamp)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {trade.symbol}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    trade.order_type === 'BUY' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {trade.order_type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {trade.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(trade.price)}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                  trade.pnl >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {trade.pnl ? formatCurrency(trade.pnl) : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default TradeHistory;