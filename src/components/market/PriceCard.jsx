import React from 'react'
import { formatCurrency } from '../../utils/formatters'


const PriceCard = ({ label, value, change, changePercent, colorsize = false }) => {
    const getColorClass=()=>{
        if(!colorsize || change === undefined) return 'text-gray-900';
         return change >= 0 ? 'text-green-600' : 'text-red-600';
    }
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
        <div className="text-xs text-gray-500 upper tracking-wide mb-1">
            {label}
        </div>
          <div className={`text-2xl font-bold ${getColorClass()}`}>
            {typeof value==='number' ? formatCurrency(value):value}
        </div>
        {changePercent!==undefined && (<div
        className={`text-sm mt-1 ${getColorClass()}`}>
            {change>=0? '+':""}{changePercent.toFixed(2)}%

            </div>)}
    </div>
  )
}

export default PriceCard