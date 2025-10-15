import React from 'react'
import {Navigate} from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
import Loader from './Loader'


const ProtectedRoute = ({children}) => {
    const {isAuthicated , loading}=useAuth();
    if(loading){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader size="lg" text="Loading..."></Loader>

            </div>
        );
    }
    if(!isAuthicated){
        return <Navigate to="/login" replace/>
    }
}

export default ProtectedRoute