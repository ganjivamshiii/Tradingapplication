import React, { useState, useEffect } from 'react';
import { executeTrade, getTradeHistory, getSignals } from '../../services/api';
import Card from '../common/Card';
import TradeExecutor from './TradeExecutor';
import SignalIndicator from './SignalIndicator';
import OrderBook from './OrderBook';
import WebSocketService from '../../services/websocket';

function LiveTradingView() {
  const [symbol, setSymbol] = useState('AAPL');
  const [strategy, setStrategy] = useState('MA_CROSSOVER');
  const [quantity, setQuantity] = useState(10);
  const [orderType, setOrderType] = useState('BUY');

  const [tradeHistory, setTradeHistory] = useState([]);
  const [signals, setSignals] = useState(null);
  const [livePrice, setLivePrice] = useState(null); // ✅ Separate state for live price

  const [tradeLoading, setTradeLoading] = useState(false);
  const [signalLoading, setSignalLoading] = useState(false);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // WebSocket connection for live price updates
  useEffect(() => {
    const wsUrl = `ws://localhost:8000/ws/price/${symbol}`;

    console.log('[WebSocket] Connecting to', wsUrl);
    WebSocketService.connect(wsUrl);

    WebSocketService.on('connected', () => console.log('[WebSocket] Connected'));
    
    WebSocketService.on('price_update', (data) => {
      console.log('[WebSocket] Live price update:', data.data);
      setLivePrice(data.data); // ✅ Update live price separately
    });

    WebSocketService.on('disconnected', () =>
      console.log('[WebSocket] Disconnected')
    );

    return () => {
      console.log('[WebSocket] Cleaning up...');
      WebSocketService.disconnect();
    };
  }, [symbol]);

  // Execute a trade
  const handleExecuteTrade = async () => {
    console.log('[Trade] Executing trade:', { symbol, strategy, orderType, quantity });
    setTradeLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await executeTrade({ 
        symbol, 
        strategy, 
        order_type: orderType, 
        quantity 
      });
      console.log('[Trade] API Response:', res);

      setSuccess(`Trade executed successfully! ${orderType} ${quantity} shares of ${symbol}`);
      fetchTradeHistory(); // refresh history after trade
    } catch (err) {
      console.error('[Trade] Execution failed:', err);
      setError(err.response?.data?.detail || 'Trade execution failed');
    } finally {
      setTradeLoading(false);
    }
  };

  // Fetch last 20 trades
  const fetchTradeHistory = async () => {
    console.log('[History] Fetching trade history...');
    try {
      const response = await getTradeHistory(strategy, 20);
      console.log('[History] Response data:', response.data);
      setTradeHistory(response.data || []);
    } catch (err) {
      console.error('[History] Failed to fetch:', err);
      setError('Failed to fetch trade history');
    }
  };

  // Fetch signals
  const fetchSignals = async () => {
    console.log('[Signals] Fetching signals for:', { symbol, strategy });
    setSignalLoading(true);
    setError(null);
    try {
      const response = await getSignals(symbol, strategy, '3mo', '1d');
      console.log('[Signals] Response data:', JSON.stringify(response.data, null, 2));

      // ✅ Use 'data' if signals_summary is empty
      const signalData =
        response.data?.signals_summary?.length > 0
          ? response.data.signals_summary
          : response.data?.data || [];

      console.log('[Signals] Parsed data set to state:', signalData);
      setSignals(signalData);
    } catch (err) {
      console.error('[Signals] Failed to fetch:', err);
      setError('Failed to fetch signals');
    } finally {
      setSignalLoading(false);
    }
  };

  // Fetch history & signals on mount and when strategy/symbol changes
  useEffect(() => {
    console.log('[Init] Fetching data for:', { symbol, strategy });
    fetchTradeHistory();
    fetchSignals();
  }, [strategy, symbol]); // ✅ Added dependencies

  return (
    <div className="space-y-6">
      <Card title="Live Paper Trading">
        <TradeExecutor
          symbol={symbol}
          setSymbol={setSymbol}
          strategy={strategy}
          setStrategy={setStrategy}
          quantity={quantity}
          setQuantity={setQuantity}
          orderType={orderType}
          setOrderType={setOrderType}
          onExecute={handleExecuteTrade}
          loading={tradeLoading}
        />

        <div className="mt-4 flex gap-2">
          <button
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            onClick={fetchSignals}
            disabled={signalLoading}
          >
            {signalLoading ? 'Fetching Signals...' : 'Get Signals'}
          </button>

          <button
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            onClick={fetchTradeHistory}
          >
            Refresh History
          </button>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded">
            {success}
          </div>
        )}
      </Card>

      {/* ✅ Live Price Feed - Separate from signals */}
      {livePrice && (
        <Card title="Live Price Feed">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Symbol</p>
              <p className="text-lg font-semibold">{symbol}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Latest Price</p>
              <p className="text-lg font-semibold">
                ${livePrice.price?.toFixed(2) || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Change</p>
              <p className={`text-lg font-semibold ${
                livePrice.change_percent >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {livePrice.change_percent?.toFixed(2)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Volume</p>
              <p className="text-lg font-semibold">
                {livePrice.volume?.toLocaleString() || 'N/A'}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* ✅ Trading Signals */}
      {signals && signals.length > 0 && <SignalIndicator signals={signals} />}

      {/* ✅ Trade History / Order Book */}
      {tradeHistory.length > 0 && <OrderBook trades={tradeHistory} />}
    </div>
  );
}

export default LiveTradingView;