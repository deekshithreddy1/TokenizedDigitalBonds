import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Download,
  FileText,
  Info,
  Layers,
  LockKeyhole,
  ShieldCheck,
  Tag,
  TrendingUp,
  Wallet
} from 'lucide-react';
import { mockBonds } from '../data/mockBonds';
import TransactionHistory from '../components/TransactionHistory';
import { mockTransactions } from '../data/mockTransactions';

const BondDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<string>('details');
  
  // Find the bond by ID
  const bond = mockBonds.find(bond => bond.id === id);
  
  // Filter transactions for this bond
  const bondTransactions = mockTransactions.filter(
    transaction => transaction.bondId === id
  );
  
  if (!bond) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Bond Not Found</h2>
        <p className="mb-6">The bond you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/market"
          className="text-[#0033A0] font-medium flex items-center justify-center"
        >
          <ArrowLeft size={16} className="mr-1" />
          Return to Bond Market
        </Link>
      </div>
    );
  }
  
  // Calculate time to maturity
  const calculateTimeToMaturity = (): string => {
    const maturity = new Date(bond.maturityDate);
    const today = new Date();
    
    const diffTime = Math.abs(maturity.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 365) {
      return `${Math.floor(diffDays / 365)} years, ${Math.floor((diffDays % 365) / 30)} months`;
    } else {
      return `${diffDays} days`;
    }
  };
  
  return (
    <div>
      {/* Header with navigation */}
      <div className="mb-6">
        <Link
          to="/market"
          className="flex items-center text-gray-500 hover:text-gray-700 text-sm mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Bond Market
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">{bond.name}</h1>
              {!bond.available && (
                <span className="ml-3 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full font-medium">
                  Currently Locked
                </span>
              )}
            </div>
            <p className="text-gray-500 mt-1">Issued by {bond.issuer}</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            {bond.available ? (
              <>
                <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                  Add to Watchlist
                </button>
                <button className="px-4 py-2 bg-[#0033A0] text-white rounded-lg hover:bg-blue-900 transition-colors text-sm font-medium">
                  Trade Bond
                </button>
              </>
            ) : (
              <button className="px-4 py-2 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed text-sm font-medium flex items-center">
                <LockKeyhole size={14} className="mr-1.5" />
                Trading Locked
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Bond Summary Card */}
      <div className="bg-white rounded-xl shadow-sm mb-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5">
          <div>
            <div className="flex items-center text-gray-500 mb-1.5">
              <Tag size={14} className="mr-1.5" />
              <span className="text-sm">Bond Type</span>
            </div>
            <div className="text-lg font-semibold">{bond.type}</div>
            <div className="mt-1 flex items-center text-xs text-gray-500">
              <span className="mr-1">Rating:</span>
              <span className={`font-medium ${
                bond.rating.includes('A') ? 'text-green-600' : 'text-yellow-600'
              }`}>{bond.rating}</span>
            </div>
          </div>
          
          <div>
            <div className="flex items-center text-gray-500 mb-1.5">
              <TrendingUp size={14} className="mr-1.5" />
              <span className="text-sm">Interest Rates</span>
            </div>
            <div className="flex items-baseline">
              <span className="text-lg font-semibold text-[#0033A0]">{bond.couponRate}%</span>
              <span className="text-gray-500 mx-2">/</span>
              <span className="text-lg font-semibold text-[#B4975A]">{bond.currentYield}%</span>
            </div>
            <div className="mt-1 text-xs text-gray-500">Coupon / Current Yield</div>
          </div>
          
          <div>
            <div className="flex items-center text-gray-500 mb-1.5">
              <Calendar size={14} className="mr-1.5" />
              <span className="text-sm">Maturity Information</span>
            </div>
            <div className="text-lg font-semibold">
              {new Date(bond.maturityDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
            <div className="mt-1 text-xs text-gray-500">
              Time to maturity: {calculateTimeToMaturity()}
            </div>
          </div>
          
          <div>
            <div className="flex items-center text-gray-500 mb-1.5">
              <Wallet size={14} className="mr-1.5" />
              <span className="text-sm">Par Value</span>
            </div>
            <div className="text-lg font-semibold">${bond.parValue.toLocaleString()}</div>
            <div className="mt-1 text-xs text-gray-500">
              Last traded: {new Date(bond.lastTraded).toLocaleDateString()}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 p-5">
          <div className="flex items-center text-gray-500 mb-2">
            <Info size={14} className="mr-1.5" />
            <span className="text-sm font-medium">Bond Description</span>
          </div>
          <p className="text-gray-700">{bond.description}</p>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex -mb-px">
          {['details', 'tokenization', 'payments', 'documents'].map((tab) => (
            <button
              key={tab}
              className={`mr-8 py-4 px-1 text-sm font-medium border-b-2 ${
                activeTab === tab
                  ? 'border-[#0033A0] text-[#0033A0]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="mb-8">
        {activeTab === 'details' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Bond Performance</h3>
                <div className="h-64 flex items-center justify-center text-gray-400">
                  {/* In a real app, we would render a chart here */}
                  <div className="text-center">
                    <TrendingUp size={48} className="mx-auto mb-2 opacity-30" />
                    <p>Historical price and yield chart would be displayed here</p>
                  </div>
                </div>
              </div>
              
              <TransactionHistory transactions={bondTransactions} />
            </div>
            
            <div>
              <div className="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Tokenization Details</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Total Token Supply</div>
                    <div className="text-xl font-semibold">{bond.tokenSupply}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Tokens Available</div>
                    <div className="text-xl font-semibold">{bond.tokensAvailable}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Token Price</div>
                    <div className="text-xl font-semibold">
                      ${(bond.parValue / bond.tokenSupply).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                      <Layers size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">DAML Contract ID:</span>
                    </div>
                    <div className="text-xs font-mono bg-gray-50 p-2 rounded mt-1 overflow-auto">
                      00c8bc1f9c2e54b3a7d42dbdf9c8eb5b6c17c7d7d85a4de2d26a9d12c45e9a99f
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Payment Schedule</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Clock size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm">Next Coupon Payment</span>
                    </div>
                    <span className="text-sm font-medium">Apr 15, 2025</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Clock size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm">Payment Frequency</span>
                    </div>
                    <span className="text-sm font-medium">Semi-Annual</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Clock size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm">Day Count Convention</span>
                    </div>
                    <span className="text-sm font-medium">30/360</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-5">
                <div className="flex items-center mb-3">
                  <ShieldCheck className="text-[#0033A0] mr-3" size={24} />
                  <h3 className="font-semibold text-gray-900">Security Verification</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  This bond is secured by Canton Network's atomic transaction capabilities. All transfers are cryptographically verified.
                </p>
                <button className="bg-white text-[#0033A0] border border-blue-200 w-full py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors flex items-center justify-center">
                  <FileText size={14} className="mr-1.5" />
                  View Verification Report
                </button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'tokenization' && (
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Token Distribution</h3>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <Layers size={48} className="mx-auto mb-2 opacity-30" />
                <p>Token distribution visualization would be displayed here</p>
                <p className="text-sm text-gray-500 mt-1">Shows ownership and distribution of bond tokens</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'payments' && (
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4">Coupon Payment Schedule</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="px-5 py-3 border-b border-gray-200">Payment Date</th>
                    <th className="px-5 py-3 border-b border-gray-200">Amount</th>
                    <th className="px-5 py-3 border-b border-gray-200">Status</th>
                    <th className="px-5 py-3 border-b border-gray-200">Transaction</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="hover:bg-gray-50">
                    <td className="px-5 py-4 border-b border-gray-200">Apr 15, 2025</td>
                    <td className="px-5 py-4 border-b border-gray-200 font-medium">$23,750.00</td>
                    <td className="px-5 py-4 border-b border-gray-200">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Upcoming
                      </span>
                    </td>
                    <td className="px-5 py-4 border-b border-gray-200">-</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-5 py-4 border-b border-gray-200">Oct 15, 2024</td>
                    <td className="px-5 py-4 border-b border-gray-200 font-medium">$23,750.00</td>
                    <td className="px-5 py-4 border-b border-gray-200">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Paid
                      </span>
                    </td>
                    <td className="px-5 py-4 border-b border-gray-200">
                      <span className="font-mono text-xs">txn_7a2b9c4d3e8f5g</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-5 py-4 border-b border-gray-200">Apr 15, 2024</td>
                    <td className="px-5 py-4 border-b border-gray-200 font-medium">$23,750.00</td>
                    <td className="px-5 py-4 border-b border-gray-200">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Paid
                      </span>
                    </td>
                    <td className="px-5 py-4 border-b border-gray-200">
                      <span className="font-mono text-xs">txn_4d5e6f7g8h9i0j</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'documents' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-center mb-4">
                <FileText className="text-gray-400 mr-3" size={20} />
                <h3 className="font-semibold">Bond Prospectus</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Official document containing all details about the bond issuance, terms, and conditions.
              </p>
              <button className="flex items-center text-[#0033A0] text-sm font-medium">
                <Download size={14} className="mr-1.5" />
                Download PDF (2.4 MB)
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-center mb-4">
                <FileText className="text-gray-400 mr-3" size={20} />
                <h3 className="font-semibold">Legal Terms & Conditions</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Legal framework governing the tokenized bond, including rights and obligations.
              </p>
              <button className="flex items-center text-[#0033A0] text-sm font-medium">
                <Download size={14} className="mr-1.5" />
                Download PDF (1.8 MB)
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-center mb-4">
                <FileText className="text-gray-400 mr-3" size={20} />
                <h3 className="font-semibold">Technical Architecture</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Technical specifications of the bond tokenization on Canton Network.
              </p>
              <button className="flex items-center text-[#0033A0] text-sm font-medium">
                <Download size={14} className="mr-1.5" />
                Download PDF (3.1 MB)
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-center mb-4">
                <FileText className="text-gray-400 mr-3" size={20} />
                <h3 className="font-semibold">Rating Agency Report</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Latest credit assessment and rating report for this bond.
              </p>
              <button className="flex items-center text-[#0033A0] text-sm font-medium">
                <Download size={14} className="mr-1.5" />
                Download PDF (1.2 MB)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BondDetails;