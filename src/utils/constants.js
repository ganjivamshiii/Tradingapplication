export const STRATEGIES={
    MA_CROSSOVER:'MA_CROSSOVER',
    RSI:'RSI',
    BOLLINNGER_BRANDS:'BOLLINGER_BRANDS'
};
export const ORDER_TYPE={
    BUY:'BUY',
    SELL:'SELL'
}
export const PERIODS=[
    {value:'1d', label:'1 day'},
    {value:'5d', label:'5 day'},
    {value:'1mo', label:'1 Month'},
    {value:'3mo', label:'3 Months'},
    {value:'6mo', label:'6 Months'},
    {value:'1y', label:'1 year'},
    {value:'2y', label:'1 years'},
    {value:'5y', label:'5 years'}
];

export const INTERVALS = [
  { value: '1m', label: '1 Minute' },
  { value: '5m', label: '5 Minutes' },
  { value: '15m', label: '15 Minutes' },
  { value: '1h', label: '1 Hour' },
  { value: '1d', label: '1 Day' },
  { value: '1wk', label: '1 Week' }
];
export const CHART_COLORS = {
  primary: '#3b82f6',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  gray: '#6b7280'
};
export const DEFAULT_INITIAL_CAPITAL = 100000;
export const DEFAULT_COMMISSION = 0.001;