import React, { useState } from 'react';
import { 
  BarChart2, 
  Clock, 
  DollarSign, 
  Info, 
  Layers, 
  RefreshCw, 
  Shield, 
  TrendingUp
} from 'lucide-react';
import BondCard from '../components/BondCard';
import TransactionHistory from '../components/TransactionHistory';
import { mockBonds } from '../data/mockBonds';
import { mockTransactions } from '../data/mockTransactions';

const Dashboard: React.FC = () => {
  const [activeTimeframe, setActiveTimeframe] = useState<string>('month');
  
  // Filter only recent transactions for dashboard view
  const recentTransactions = mockTransactions.slice(0, 5);
  
  // Filter featured bonds
  const featuredBonds = mockBonds.slice(0, 3);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center">
          <button className="flex items-center text-sm text-gray-500 mr-4">
            <RefreshCw size={14} className="mr-1" />
            Last updated: 2 mins ago
          </button>
          <select className="text-sm border-gray-300 rounded-lg">
            <option>Enterprise View</option>
            <option>Personal View</option>
          </select>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-500 mb-1">Total Portfolio Value</div>
              <div className="text-2xl font-bold text-gray-900">$8,245,638</div>
              <div className="flex items-center mt-1 text-sm text-green-600">
                <TrendingUp size={14} className="mr-1" />
                <span>+2.5% from last month</span>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <DollarSign className="text-[#0033A0]" size={22} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-500 mb-1">Active Bonds</div>
              <div className="text-2xl font-bold text-gray-900">24</div>
              <div className="flex items-center mt-1 text-sm text-blue-600">
                <Layers size={14} className="mr-1" />
                <span>12 corporate, 8 govt, 4 municipal</span>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Layers className="text-[#0033A0]" size={22} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-500 mb-1">Upcoming Payments</div>
              <div className="text-2xl font-bold text-gray-900">$342,500</div>
              <div className="flex items-center mt-1 text-sm text-gray-600">
                <Clock size={14} className="mr-1" />
                <span>Next payment in 12 days</span>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Clock className="text-[#0033A0]" size={22} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-sm text-gray-500 mb-1">Overall Yield</div>
              <div className="text-2xl font-bold text-[#B4975A]">4.78%</div>
              <div className="flex items-center mt-1 text-sm text-gray-600">
                <BarChart2 size={14} className="mr-1" />
                <span>Avg maturity: 6.2 years</span>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <BarChart2 className="text-[#0033A0]" size={22} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Portfolio Performance */}
      <div className="bg-white rounded-xl shadow-sm mb-6 border border-gray-100">
        <div className="p-5 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Portfolio Performance</h2>
            <div className="flex bg-gray-100 rounded-lg p-0.5">
              {['week', 'month', 'quarter', 'year'].map((timeframe) => (
                <button
                  key={timeframe}
                  className={`px-3 py-1 text-sm rounded-md ${
                    activeTimeframe === timeframe
                      ? 'bg-white text-[#0033A0] shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTimeframe(timeframe)}
                >
                  {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-5">
          <div className="h-64 flex items-center justify-center text-gray-400">
            {/* In a real app, we would render a chart here */}
            <div className="text-center">
              <BarChart2 size={48} className="mx-auto mb-2 opacity-30" />
              <p>Portfolio performance visualization would be displayed here</p>
              <p className="text-sm text-gray-500 mt-1">Showing data for: {activeTimeframe}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Bonds */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Featured Bonds</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {featuredBonds.map(bond => (
          <BondCard key={bond.id} bond={bond} />
        ))}
      </div>
      
      {/* Transaction History & Network Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TransactionHistory transactions={recentTransactions} />
        </div>
        <div>
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 mb-6">
            <h3 className="text-lg font-semibold mb-4">Canton Network Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Network Uptime</span>
                </div>
                <span className="text-sm font-medium">99.998%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Transaction Speed</span>
                </div>
                <span className="text-sm font-medium">2.1s avg</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Active Nodes</span>
                </div>
                <span className="text-sm font-medium">246</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm">API Response Time</span>
                </div>
                <span className="text-sm font-medium">312ms</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <button className="text-[#0033A0] text-sm font-medium flex items-center">
                View detailed network stats
                <ArrowRight size={14} className="ml-1" />
              </button>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-5">
            <div className="flex items-start mb-4">
              <div className="bg-[#0033A0] bg-opacity-10 p-2 rounded-lg mr-4">
                <Shield className="text-[#0033A0]" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Security Status</h3>
                <p className="text-sm text-gray-600 mt-1">All systems secured with encryption</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center">
                <Info size={14} className="text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">Multi-factor authentication enabled</span>
              </div>
              <div className="flex items-center">
                <Info size={14} className="text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">Last security scan: 2 hours ago</span>
              </div>
              <div className="flex items-center">
                <Info size={14} className="text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">KYC verification up to date</span>
              </div>
            </div>
            
            <button className="mt-4 w-full bg-[#0033A0] text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors">
              View Security Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;