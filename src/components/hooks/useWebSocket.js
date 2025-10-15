import {useState, useEffect, useCallback , useRef} from 'react';
import React from 'react'

const useWebSocket = (url, enabled=false) => {
    const[data, setData]=useState(null);
    const[isConnected, setIsConnected]=useState(false);
    const[error, setError]=useState(null);
    const wsRef=useState(null);

    const connect=useCallback(()=>{
        if(!url ||!enabled) return ;
   
    try{
        const ws=new WebSocket(url);
        ws.onopen=()=>{
            console.log("web socket connected");
            setIsConnected(true);
            setError(null);
        };

        ws.onmessage=(event)=>{
            try{
                const parseData=JSON.parse(event.data);
                setData(parseData);
            }catch(err){
                console.log('failed to parse websocket message:', err);
            }
        }

        ws.onerror=(event)=>{
            console.log('webScoket error', event);
        }

        ws.onclose=()=>{
            console.log('websocket disconnected');
            setIsConnected(false);
        }
        ws.Ref.current=ws;
        }
        catch(err){
                setError('failed to connect to websocket');
            }
     },[url, enabled]);

     const disconnect=useCallback(()=>{
        if(ws.Ref.current){
            wsRef.current.close();
            wsRef.current=null;
        }
     },[]);

     useEffect(()=>{
        if(enabled){
            connect();
        }
        return ()=>{
            connect();
        }
     }, [enabled,connect, disconnect]);

     return{
        data,
        isConnected,
        error,
        connect,
        disconnect
     }
    };

export default useWebSocket;