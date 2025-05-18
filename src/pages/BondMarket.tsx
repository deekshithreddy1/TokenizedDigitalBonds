import React, { useState } from 'react';
import { 
  ChevronDown,
  Filter,
  Search,
  SlidersHorizontal
} from 'lucide-react';
import BondCard from '../components/BondCard';
import { mockBonds } from '../data/mockBonds';

const BondMarket: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [bondType, setBondType] = useState('all');
  const [sortBy, setSortBy] = useState('yield');
  
  // Filter bonds based on search and bond type
  const filteredBonds = mockBonds.filter(bond => {
    const matchesSearch = bond.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bond.issuer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = bondType === 'all' || bond.type === bondType;
    return matchesSearch && matchesType;
  });
  
  // Sort bonds based on selected criteria
  const sortedBonds = [...filteredBonds].sort((a, b) => {
    switch (sortBy) {
      case 'yield':
        return b.currentYield - a.currentYield;
      case 'maturity':
        return new Date(a.maturityDate).getTime() - new Date(b.maturityDate).getTime();
      case 'coupon':
        return b.couponRate - a.couponRate;
      case 'value':
        return b.parValue - a.parValue;
      default:
        return 0;
    }
  });
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Bond Market</h1>
        <button className="px-4 py-2 bg-[#0033A0] text-white rounded-lg hover:bg-blue-900 transition-colors text-sm font-medium">
          Issue New Bond
        </button>
      </div>
      
      {/* Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-gray-100">
        <div className="relative w-full md:w-auto md:flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search bonds by name or issuer..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <select
              className="appearance-none pl-4 pr-8 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={bondType}
              onChange={(e) => setBondType(e.target.value)}
            >
              <option value="all">All Bond Types</option>
              <option value="Corporate">Corporate</option>
              <option value="Government">Government</option>
              <option value="Municipal">Municipal</option>
              <option value="Treasury">Treasury</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
          
          <div className="relative w-full md:w-auto">
            <select
              className="appearance-none pl-4 pr-8 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="yield">Sort by Yield</option>
              <option value="maturity">Sort by Maturity</option>
              <option value="coupon">Sort by Coupon Rate</option>
              <option value="value">Sort by Value</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
          </div>
          
          <button className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Filter size={16} className="mr-1" />
            <span className="text-sm">More Filters</span>
          </button>
        </div>
      </div>
      
      {/* Market Insights */}
      <div className="bg-[#0033A0] bg-opacity-5 rounded-xl p-4 mb-6">
        <div className="flex items-center text-[#0033A0]">
          <SlidersHorizontal size={18} className="mr-2" />
          <h2 className="font-semibold">Market Insights</h2>
        </div>
        <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-sm text-gray-500">Avg. Corporate Yield</div>
            <div className="text-xl font-bold mt-1">4.85%</div>
            <div className="text-xs text-green-600 mt-1">↑ 0.12% from last week</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-sm text-gray-500">Avg. Term Length</div>
            <div className="text-xl font-bold mt-1">7.2 years</div>
            <div className="text-xs text-gray-600 mt-1">Stable from last week</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="text-sm text-gray-500">New Issuances (Weekly)</div>
            <div className="text-xl font-bold mt-1">12</div>
            <div className="text-xs text-blue-600 mt-1">↑ 3 from previous week</div>
          </div>
        </div>
      </div>
      
      {/* Bond Listings */}
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Available Bonds</h2>
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">{sortedBonds.length}</span> bonds
        </div>
      </div>
      
      {sortedBonds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedBonds.map(bond => (
            <BondCard key={bond.id} bond={bond} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-8 text-center">
          <div className="text-lg text-gray-400 mb-2">No bonds match your criteria</div>
          <p className="text-gray-500">Try adjusting your filters or search query</p>
        </div>
      )}
      
      {/* Pagination */}
      {sortedBonds.length > 0 && (
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-1">
            <button className="px-4 py-2 border border-gray-200 rounded-l-lg hover:bg-gray-50">
              Previous
            </button>
            <button className="px-4 py-2 border-t border-b border-gray-200 bg-[#0033A0] text-white">
              1
            </button>
            <button className="px-4 py-2 border-t border-b border-gray-200 hover:bg-gray-50">
              2
            </button>
            <button className="px-4 py-2 border-t border-b border-gray-200 hover:bg-gray-50">
              3
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-r-lg hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BondMarket;