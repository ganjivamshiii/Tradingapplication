import React, { useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/context/AuthContext';
import { 
  FiTrendingUp, 
  FiBarChart2, 
  FiActivity, 
  FiBriefcase, 
  FiLogOut,
  FiUser,
  FiMenu,
  FiX,
  FiLogIn
} from 'react-icons/fi';
import MarketDataView from '../components/market/MarketDataView';
import BacktestView from '../components/backtest/BacktestView';
import LiveTradingView from '../components/trading/LiveTradingView';
import PortfolioView from '../components/portfolio/PortfolioView';

function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigation = [
    { name: 'Market Data', path: '/dashboard', icon: FiTrendingUp },
    { name: 'Backtest', path: '/dashboard/backtest', icon: FiBarChart2 },
    { name: 'Live Trading', path: '/dashboard/live-trading', icon: FiActivity },
    { name: 'Portfolio', path: '/dashboard/portfolio', icon: FiBriefcase },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left side - Logo & Menu */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {sidebarOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
              </button>
              
              <div className="flex items-center space-x-3 ml-4 lg:ml-0 cursor-pointer" onClick={() => navigate('/')}>
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <FiTrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">AlgoTrader</h1>
                  <p className="text-xs text-gray-500 hidden sm:block">Professional Trading Platform</p>
                </div>
              </div>
            </div>

            {/* Right side - User Menu */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <div className="hidden sm:flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-lg">
                    <FiUser className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user?.username}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FiLogOut className="h-5 w-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <div className="bg-yellow-50 border border-yellow-200 px-3 py-2 rounded-lg hidden md:flex items-center space-x-2">
                    <span className="text-xs font-medium text-yellow-800">Demo Mode</span>
                  </div>
                  
                  <button
                    onClick={() => navigate('/login')}
                    className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <FiLogIn className="h-5 w-5" />
                    <span>Sign In</span>
                  </button>
                  
                  <button
                    onClick={() => navigate('/register')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-20 w-64 bg-white border-r border-gray-200 pt-16 lg:pt-0
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <nav className="px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/dashboard'}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Demo Mode Notice in Sidebar */}
          {!isAuthenticated && (
            <div className="mx-4 mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-900 mb-2">Demo Mode Active</p>
              <p className="text-xs text-blue-700 mb-3">
                Sign up to save your progress and access advanced features
              </p>
              <button
                onClick={() => navigate('/register')}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
              >
                Create Free Account
              </button>
            </div>
          )}
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <Routes>
            <Route path="/" element={<MarketDataView />} />
            <Route path="/backtest" element={<BacktestView />} />
            <Route path="/live-trading" element={<LiveTradingView />} />
            <Route path="/portfolio" element={<PortfolioView />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;