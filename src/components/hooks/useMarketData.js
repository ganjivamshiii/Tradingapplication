import { useState, useCallback } from 'react';
import { getHistoricalData, getLiveData } from '../../services/api'

const useMarketData = () => {
   const[data, setData]=useState(null);
      const[liveData, setLiveData]=useState(null);
      const[loading, setLoading]=useState(false);
      const[error, setError]=useState(null);
      
      const fetchHistoricalData=useCallback(async (symbol, period , interval)=>{
            setLoading(true);
            setError(null);
      try{
          const response=await getHistoricalData(symbol, period, interval);
          setData(response.data);
          return response.data;
      }catch(err){
         const erromsg=err.response?.data.details || 'Failed to fetch data';
         setError(erroMsg);
      }
      finally{
          setLoading(false);
      }
  },[]);
      
  const fetchLiveData=useCallback(async(symbol)=>{
      try{
          const reponse=await getLiveData(symbol);
          setLiveData(reponse.data);
          return response.data;
      }catch(err){
           console.error('failed to fetch data');
      }
  },[]);
  return{
       data,
       liveData,
       loading,
       error,
       fetchHistoricalData,
       fetchLiveData
  
  }
}

export default useMarketData;