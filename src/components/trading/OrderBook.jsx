import React from 'react';
import { formatDateTime, formatCurrency } from '../../utils/formatters';
import Card from '../common/Card';

function OrderBook({ trades }) {
  if (!trades || trades.length === 0) {
    return (
      <Card title="Recent Orders">
        <p className="text-center text-gray-500 py-8">No orders yet</p>
      </Card>
    );
  }

  const getOrderTypeClass = (type) =>
    type === 'BUY' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

  const getStatusClass = (status) =>
    status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

  return (
    <Card title="Recent Orders">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Qty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {trades.slice(0, 10).map((trade) => (
              <tr key={trade.id || `${trade.symbol}-${trade.timestamp}`} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDateTime(trade.timestamp)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {trade.symbol}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getOrderTypeClass(
                      trade.order_type
                    )}`}
                  >
                    {trade.order_type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {trade.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(trade.price)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(
                      trade.status
                    )}`}
                  >
                    {trade.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default OrderBook;
