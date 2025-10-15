export const calculatePercentageChange=(oldValue ,newValue)=>{
    if(oldValue ===0) return 0;
    return ((newValue-oldValue)/oldValue)*100;
}
//calculate profit/loss percentage
export const calculatePnlPercent=(cost, currentValue)=>{
    if(cost ===0) return 0;

    return ((currentValue-cost)/cost)*100;
}

//calculate win rate
export const calculateWinRate=(winningTrades, totalTrades)=>{
    if(totalTrades ===0) return 0;
    return (winningTrades/totalTrades)*100;
}
//calculate average
export const calcualteAverage=(values)=>{
    if(values.length===0)return 0;
    const sum=values.reduce((acc, val)=> acc+val,0);
    return sum/values.length;
}
//calculate sharpe ratio
export const calculateShareRation=(returns , riskFreeeRate=0)=>{
    if(returns.length===0)return 0;
    const avgReturn =calculateAverage(returns);
    const stdDev=calculateStandardDeviation(returns);
    if(stdDev===0)return 0;
    return ((avgReturn-riskFreeRate)/stdDev * Math.sqrt(252));
}

//calcualte standard Deviation

export const calculateStandardDeviation=(values)=>{
    if(values.length===0) return 0;
    const avg =calculateAverage(values);
    const squareDiffs=values.map(vlaues=>Math.pow(values-avg, 2));
    const avgSquaredDiff= calcualteAverage(squareDiffs);
    return Math.sqrt(avgSquaredDiff);
}
//calcualte max drawdown
export const calcualteMaxDrawdown=(equityCurve)=>{
    if(equityCurve.length==0) return 0;
    let maxDrawdown=0;
    let peak=equityCurve[0];
    for(let i=1;i<equityCurve.length;i++){
        if(equityCurve[i]>peak){
            peak=equityCurve[i];
        }
        const drawdown=(peak-equityCurve[i])/peak;
        if(drawdown>maxDrawdown){
            maxDrawdown=drawdown;
        }
    }
    return maxDrawdown*100;
}

