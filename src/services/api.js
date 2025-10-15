import axios from 'axios'
const API_BASE_URL='http://127.0.0.1:8000'

const api=axios.create({
    baseURL:API_BASE_URL,
    header:{
        'content-Type':'application/json'
    }
})

export const getHistoricalData=(symbol, period='1mo', interval='1d')=>{
    return api.get(`/api/market/historical/${symbol}`,{
        params:{period, interval}
    });
}

export const getLiveData=(symbol)=>{
    return api.get(`api/market/live/${symbol}`)
}

export const getLatestPrice =(symbol)=>{
    return api.get(`/api/market/price/${symbol}`)
}

export const getStrategies =()=>{
    return api.get('/api/strategies/list');
}

export const getSignals=(symbol, strategy, period='3mo', interval='1d')=>{
    return api.get(`/api/strategies/signals/${symbol}`,{
        params:{strategy, period, interval}
    })
}

export const analyzesymbols=(symbol, strategy, period='3mo')=>{
    return api.get(`/api/strategies/analyze/${symbol}`,{
          params:{strategy, period, interval}
    })
}

export const runBackTest=(data)=>{
    return api.post('/api/backtest/run', data);
}
export const listPortfolios=()=>{
    return api.get('/api/portfolio/');
}
export const compareStrategies =(symbol, period='1y', initialCapital=1000)=>{
    return api.get(`/api/backtest/compare/${symbol}`,{
        params:{period, intital_capital:initialCapital}
    })
}
export const getBacktestMetrics =(symbol, strategy, period='1y')=>{
    return api.get(`/api/backtest/metrics/${symbol}`,{
        params:{strategy, period}
    })
}
export const getPortfolio=(strategy)=>{
    return api.get(`/api/portfolio/${strategy}`)
}

export const createPortfolio=(strategy, intialCapital=10000)=>{
    return api.post(`/api/portfolio/create/${strategy}`,null,{
        params:{intial_capital:initialCapital}
    })
}
export const getPosition =(strategy)=>{
    return api.get(`/api/portfolio/${strategy}/positions`)
}
export const executeTrade=(data)=>{
    return api.post('/api/trades/execute',data);
}
export const getTradeHistory=(strategy, limit=100)=>{
    return api.get(`/api/trades/history/symbol/${strategy}`,{
        params:{limit}
    })

}
export const getTradeStats=(strategy)=>{
    return api.get(`/api/trade/stats/${strategy}`);
}
export const getSymbolTrade =(symbol , strategy=null, limit=100)=>{
    return api.get(`/api/trades/history/symbol/${symbol}`, {
        params:{strategy, limit}
    })
}
export default api;