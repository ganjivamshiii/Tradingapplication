import React, { useEffect } from 'react';
import { formatDateTime, formatCurrency } from '../../utils/formatters';
import Card from '../common/Card';

const SignalIndicator = ({ signals }) => {
  useEffect(() => {
    console.log('[SignalIndicator] signals received:', signals);
  }, [signals]);

  if (!signals) {
    return (
      <Card title="Latest Signals">
        <p className="text-center text-gray-500 py-8">No signal data received</p>
      </Card>
    );
  }

  // Detect array structure
  const signalList =
    Array.isArray(signals)
      ? signals
      : signals.signals_summary ||
        signals.data ||
        signals.results ||
        [];

  if (!signalList || signalList.length === 0) {
    return (
      <Card title="Latest Signals">
        <p className="text-center text-gray-500 py-8">No signal available</p>
      </Card>
    );
  }

  // Auto-detect meta info
  const symbol =
    signals.symbol ||
    signals.ticker ||
    (signalList[0]?.symbol ?? 'Unknown Symbol');

  const strategy =
    signals.strategy ||
    signals.strategy_name ||
    (signalList[0]?.strategy ?? 'N/A');

  const latestSignals = signalList.slice(-10).reverse();

  const getSignalClass = (signalType) => {
    if (signalType === 'BUY') return 'bg-green-100 text-green-800';
    if (signalType === 'SELL') return 'bg-red-100 text-red-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <Card title={`Latest Signals - ${symbol}`}>
      <p className="text-sm text-gray-500 mb-4">
        Strategy: {strategy} | Total Signals:{' '}
        {signals.total_signals || signalList.length}
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Signal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reason
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {latestSignals.map((signal, idx) => (
              <tr key={signal.id || signal.timestamp || idx} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {signal.timestamp
                    ? formatDateTime(signal.timestamp)
                    : signal.date || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${getSignalClass(
                      signal.signal || signal.type
                    )}`}
                  >
                    {signal.signal || signal.type || '-'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {signal.price != null
                    ? formatCurrency(signal.price)
                    : signal.close || '-'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {signal.reason || signal.note || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default SignalIndicator;
