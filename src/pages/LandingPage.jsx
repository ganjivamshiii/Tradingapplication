import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiTrendingUp, 
  FiBarChart2, 
  FiActivity, 
  FiBriefcase,
  FiCheckCircle,
  FiArrowRight,
  FiZap,
  FiShield,
  FiPieChart
} from 'react-icons/fi';

function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: FiBarChart2,
      title: 'Advanced Backtesting',
      description: 'Test your strategies on historical data with detailed metrics and performance analysis'
    },
    {
      icon: FiActivity,
      title: 'Live Trading Simulation',
      description: 'Practice paper trading in real-time with live market data and instant execution'
    },
    {
      icon: FiBriefcase,
      title: 'Portfolio Management',
      description: 'Track your positions, PnL, and trading performance with comprehensive analytics'
    },
    {
      icon: FiZap,
      title: 'Multiple Strategies',
      description: 'Choose from MA Crossover, RSI, Bollinger Bands, and more trading strategies'
    },
    {
      icon: FiShield,
      title: 'Risk Management',
      description: 'Built-in risk controls with stop-loss, position sizing, and drawdown limits'
    },
    {
      icon: FiPieChart,
      title: 'Real-time Analytics',
      description: 'Interactive charts and live data feeds for informed trading decisions'
    }
  ];

  const stats = [
    { value: '3+', label: 'Trading Strategies' },
    { value: '100K+', label: 'Data Points' },
    { value: 'Real-time', label: 'Market Data' },
    { value: 'Free', label: 'Paper Trading' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <FiTrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AlgoTrader</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Try Demo
              </button>
              <Link
                to="/login"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Trade Smarter with
            <span className="text-blue-600"> Algorithmic Trading</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Professional-grade backtesting and paper trading platform. Test your strategies, 
            analyze performance, and trade with confidence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
            >
              <span>Try Demo - No Login Required</span>
              <FiArrowRight className="h-5 w-5" />
            </button>
            <Link
              to="/register"
              className="flex items-center space-x-2 border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors text-lg font-medium"
            >
              <span>Create Free Account</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Trade
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features for both beginners and experienced traders
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="p-6 border border-gray-200 rounded-xl hover:border-blue-600 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Start trading in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Choose Strategy
              </h3>
              <p className="text-gray-600">
                Select from pre-built strategies or create your own custom algorithms
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Backtest & Analyze
              </h3>
              <p className="text-gray-600">
                Test your strategy on historical data and review performance metrics
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Trade Live
              </h3>
              <p className="text-gray-600">
                Execute paper trades in real-time and track your portfolio performance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of traders using our platform. No credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors text-lg font-medium"
            >
              Try Demo Now
            </button>
            <Link
              to="/register"
              className="bg-blue-700 text-white px-8 py-4 rounded-lg hover:bg-blue-800 transition-colors text-lg font-medium"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <FiTrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-bold">AlgoTrader</span>
              </div>
              <p className="text-sm">
                Professional algorithmic trading platform for everyone.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/dashboard" className="hover:text-white">Features</Link></li>
                <li><Link to="/dashboard" className="hover:text-white">Strategies</Link></li>
                <li><Link to="/dashboard" className="hover:text-white">Backtesting</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Disclaimer</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2024 AlgoTrader. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;