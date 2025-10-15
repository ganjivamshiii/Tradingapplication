import React from 'react';
import {PERIODS} from '../../utils/constants';
import Button from '../common/Button'

const BacktestForm = ({
     symbol, 
  setSymbol, 
  strategy, 
  setStrategy, 
  period, 
  setPeriod, 
  initialCapital, 
  setInitialCapital,
  strategies,
  onSubmit,
  loading 
}) => {
    const handleSubmit=(e)=>{
        e.preventDefault();
        onSubmit();
    };
    
  return (
     <form onSubmit={handleSubmit}>
        <div className=" grid grid-cols-1 md:grid-cols=2 lg:grid-cols-4 gap-4 mb-4">
            <div>
                <label className=" block text-sm font-medium text-gray-700 mb-2">
                    symbol
                </label>
                <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    value={symbol}
                    onChange={(e)=> setSymbol(e.target.value.toUpperCase())}
                    placeholder="AAPL"
                    required>
                </input>

            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Strategy
                </label>
                 <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={strategy} 
            onChange={(e) => setStrategy(e.target.value)}
            required
          >
                        {strategies.map(s => (
              <option key={s.name} value={s.name}>{s.name}</option>
            ))}
          </select>
          </div>
            <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Period
          </label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={period} 
            onChange={(e) => setPeriod(e.target.value)}
            required
          >
            {PERIODS.filter(p => ['1mo', '3mo', '6mo', '1y', '2y', '5y'].includes(p.value)).map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>
        </div>
          <Button type="submit" disabled={loading}>
        {loading ? 'Running Backtest...' : 'Run Backtest'}
      </Button>
     </form>

  )
}

export default BacktestForm