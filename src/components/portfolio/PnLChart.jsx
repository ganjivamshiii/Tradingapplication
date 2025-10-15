import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

const PnLChart = ({trades}) => {
    if(!trades || trades.length==0){
        return null;
        }
    const dailyPnl =trades.reduce((acc, trade)=>{
        if(trade.pnl){
            const date=new Date(trade.timestamp).toLocalDataString();
            if(!acc[date]){
                acc[date]=0;
            }
            acc[date]+=trade.pnl;
        }
        return acc;
    },[])
  
    const chartData=Object.entries(dailyPnl).map(([date,pnl])=>({
        date,
        pnl,
        color: pnl>=0 ?'#10b981' : '#ef4444'
    }));

  return (
     <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily PnL</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Legend />
          <Bar dataKey="pnl" fill="#3b82f6" name="PnL" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default PnLChart