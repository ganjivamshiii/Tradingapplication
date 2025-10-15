import React, { useState, useEffect } from 'react';
import { getStrategies } from '../../services/api';
import useBacktest from '../hooks/useBacktest'
import Card from '../common/Card';
import Button from '../common/Button';
import Loader from '../common/Loader';
import BacktestForm from './BacktestForm';
import BacktestResults from './BacktestResults';
import MetricsTable from './MetricsTable';
import StrategyComparison from '../backtest/StrategyComparision';
import { formatDate } from '../../utils/formatters';

function BacktestView() {
  const [symbol, setSymbol] = useState('AAPL');
  const [strategy, setStrategy] = useState('MA_CROSSOVER');
  const [period, setPeriod] = useState('1y');
  const [initialCapital, setInitialCapital] = useState(100000);
  const [strategies, setStrategies] = useState([]);

  const { results, comparison, loading, error, executeBacktest, compareAllStrategies } = useBacktest();

  useEffect(() => {
    fetchStrategies();
  }, []);

  const fetchStrategies = async () => {
    try {
      const response = await getStrategies();
      setStrategies(response.data.strategies);
      if (response.data.strategies.length > 0) {
        setStrategy(response.data.strategies[0].name);
      }
    } catch (err) {
      console.error('Failed to fetch strategies:', err);
    }
  };

  const handleBacktest = () => {
    executeBacktest({
      symbol,
      strategy,
      period,
      initial_capital: initialCapital,
      interval: '1d'
    });
  };

  const handleCompare = () => {
    compareAllStrategies(symbol, period, initialCapital);
  };

  return (
    <div className="space-y-6">
      <Card title="Backtest Strategy">
        <BacktestForm
          symbol={symbol}
          setSymbol={setSymbol}
          strategy={strategy}
          setStrategy={setStrategy}
          period={period}
          setPeriod={setPeriod}
          initialCapital={initialCapital}
          setInitialCapital={setInitialCapital}
          strategies={strategies}
          onSubmit={handleBacktest}
          loading={loading}
        />

        <div className="mt-4">
          <Button variant="secondary" onClick={handleCompare} disabled={loading}>
            Compare All Strategies
          </Button>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
            {error}
          </div>
        )}
      </Card>

      {loading && <Loader text="Running backtest..." />}

      {results && (
        <>
          <BacktestResults results={results} />
          
          <Card title="Detailed Metrics">
            <MetricsTable metrics={results.metrics} />
          </Card>

          <Card title="Trade History (Last 10)">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PnL</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {results.trades.slice(0, 10).map((trade, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(trade.timestamp)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          trade.type === 'BUY' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {trade.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${trade.price.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trade.quantity.toFixed(2)}</td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        trade.pnl >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {trade.pnl ? `$${trade.pnl.toFixed(2)}` : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      {comparison && <StrategyComparison comparison={comparison} />}
    </div>
  );
}

export default BacktestView;