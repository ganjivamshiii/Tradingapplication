import React, { useState } from 'react';

const SymbolSearch = ({ onSelect, className }) => {
  const [query, setQuery] = useState('');

  const popularSymbols = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'GOOG', name: 'Google Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Inc.' },
    { symbol: 'TSLA', name: 'Tesla Inc.' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'META', name: 'Meta Platforms Inc.' },
  ];

  const handleSelect = (symbol) => {
    setQuery(symbol);
    onSelect(symbol);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSelect(query);
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter stock symbol (e.g., AAPL)"
            value={query}
            onChange={(e) => setQuery(e.target.value.toUpperCase())}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </form>

      <p className="text-sm text-gray-600 mb-2">Popular Symbols:</p>
      <div className="flex flex-wrap gap-2">
        {popularSymbols.map(({ symbol, name }) => (
          <button
            key={symbol}
            onClick={() => handleSelect(symbol)}
            className="px-3 py-1 text-sm border border-gray-300 rounded-full hover:bg-gray-50"
            title={name}
          >
            {symbol}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SymbolSearch;
