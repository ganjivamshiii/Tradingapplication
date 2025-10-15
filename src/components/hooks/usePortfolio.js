import { useState, useCallback, useEffect } from 'react';
import { listPortfolios, getPortfolio } from '../../services/api';

function usePortfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPortfolios = useCallback(async () => {
    setLoading(true);
    try {
      const response = await listPortfolios();
      setPortfolios(response.data.portfolios);
      return response.data.portfolios;
    } catch (err) {
      setError('Failed to fetch portfolios');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPortfolioDetails = useCallback(async (strategy) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPortfolio(strategy);
      setSelectedPortfolio(response.data);
      return response.data;
    } catch (err) {
      setError('Failed to fetch portfolio details');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  return {
    portfolios,
    selectedPortfolio,
    loading,
    error,
    fetchPortfolios,
    fetchPortfolioDetails
  };
}

export default usePortfolio;