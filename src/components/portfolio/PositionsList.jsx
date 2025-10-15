import React from 'react';
import Card from '../common/Card';

function PositionsList({ positions }) {
  if (!positions || Object.keys(positions).length === 0) {
    return (
      <Card title="Current Positions">
        <p className="text-center text-gray-500 py-8">No open positions</p>
      </Card>
    );
  }

  return (
    <Card title="Current Positions">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(positions).map(([symbol, quantity]) => (
              <tr key={symbol} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {symbol}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default PositionsList;