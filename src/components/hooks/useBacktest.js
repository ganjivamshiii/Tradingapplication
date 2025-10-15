import { useState, useCallback } from 'react';
import { runBackTest, compareStrategies } from '../../services/api';

function useBacktest() {
  const [results, setResults] = useState(null);
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeBacktest = useCallback(async (backtestData) => {
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const response = await runBackTest(backtestData);
      setResults(response.data);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Backtest failed';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const compareAllStrategies = useCallback(async (symbol, period, initialCapital) => {
    setLoading(true);
    setError(null);
    setComparison(null);
    try {
      const response = await compareStrategies(symbol, period, initialCapital);
      setComparison(response.data);
      return response.data;
    } catch (err) {
      const errorMsg = err.response?.data?.detail || 'Comparison failed';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    results,
    comparison,
    loading,
    error,
    executeBacktest,
    compareAllStrategies
  };
}

export default useBacktest;