import React from 'react';
import { ORDER_TYPE} from '../../utils/constants';
import Button from '../common/Button';

function TradeExecutor({ 
  symbol, 
  setSymbol, 
  strategy, 
  setStrategy, 
  quantity, 
  setQuantity,
  orderType,
  setOrderType,
  onExecute,
  loading 
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onExecute();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Symbol
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            required
          />
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
            <option value="MA_CROSSOVER">MA Crossover</option>
            <option value="RSI">RSI Strategy</option>
            <option value="BOLLINGER_BANDS">Bollinger Bands</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Order Type
          </label>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={orderType} 
            onChange={(e) => setOrderType(e.target.value)}
            required
          >
            <option value={ORDER_TYPE.BUY}>BUY</option>
            <option value={ORDER_TYPE
              .SELL}>SELL</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            required
          />
        </div>
      </div>

      <Button 
        type="submit" 
        variant={orderType === ORDER_TYPE.BUY ? 'success' : 'danger'}
        disabled={loading}
      >
        {loading ? 'Executing...' : `Execute ${orderType}`}
      </Button>
    </form>
  );
}

export default TradeExecutor;