import React, {useState} from 'react'
import usePortfolio from '../hooks/usePortfolio'
import Card from '../common/Card'
import Loader from '../common/Loader'
import PortfolioSummary from './PortfolioSummary'
import PositionList from './PositionsList'
import TradeHistory from './TradeHistory'
import PnLChart from './PnLChart'
import { getTradeHistory } from '../../services/api'

const PortfolioView = () => {
  const {portfolios, selectedPortfolio, loading, fetchPortfolioDetails}=usePortfolio();
  const [selectedStrategy, setSelectedStrategy]=useState('');
  const [trades, setTrades]=useState([]);
  
  const handleStrategyChange=async(e)=>{
    const strategy=e.target.value;
    setSelectedStrategy(strategy);
    
    if(strategy){
      try{
        await fetchPortfolioDetails(strategy);

        const response=await getTradeHistory(strategy,50);
        setTrades(response.data);
      }catch(err){
        console.error("error Fetching portfolio details", err);
      }
    }
    else{
      setTrades([]);
    }
  };
  return (
       <div className="space-y-6">
        <Card title="Portfolio Management">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              select Strategy
            </label>
            <select
            className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedStrategy}
            onChange={handleStrategyChange}
            >
              <option value="">select a Strategy</option>
              {portfolios.map((p,idx)=>(
                <option key={idx} value={p.strategy}>{p.strategy}</option>
              ))}
            </select>
          </div>
          {portfolios.length===0 && !loading&&(
            <div className="text-center py-12 text-gray-500">
              <p className=" text-lg ">NO portfolio found</p>
              <p className="text-sm mt-2"> start trading to create a portfolio</p>

            </div>
          )}
          {portfolios.length>0 && !selectedStrategy &&(
            <div>
              <h3 className=" text-lg font-medium text-gray-900 mb-4"> All Portfolios</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Strategy
                       </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cash
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Equity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total PnL
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trades
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Win Rate
                    </th>
                    </tr>

                  </thead>
                  <tbody className="bg-white divide-y divide-gray-300">
                    {portfolios.map((p, idx)=>(
                     <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {p.strategy}

                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${p.cash.toFixed(2)}
                      </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${p.equity.toFixed(2)}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${p.total_pnl>=0 ?"text-green-600":"text-red-600"}`}>
                         ${p.total_pnl.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {p.total_trades}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {p.win_rate.toFixed(2)}%
                        </td>
                     </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Card>
        {loading && <Loader text="Loading portfolio..."/>}
        {selectedPortfolio &&(
          <>
          <PortfolioSummary portfolio={selectedPortfolio}/>
          <PositionList positions={selectedPortfolio.positions}/>
          {trades.length>0 && (
            <>
            <Card>
              <PnLChart trades={trades}/>

            </Card>
            <TradeHistory trades={trades}/>
            </>
          )}
          </>
        )}
       </div>
  )
}

export default PortfolioView