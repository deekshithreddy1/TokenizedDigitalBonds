import React, { useState } from 'react';
import { 
  BarChart2, 
  Filter, 
  List, 
  LucideIcon, 
  Plus, 
  Search, 
  Shield, 
  Tag, 
  TrendingUp 
} from 'lucide-react';
import BondCard from '../components/BondCard';
import DAMLContract from '../components/DAMLContract';
import KYCVerification from '../components/KYCVerification';
import { mockBonds } from '../data/mockBonds';

const Portfolio: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('bonds');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter bonds owned by the current user (in a real app, this would be data from the API)
  const userBonds = mockBonds.filter(bond => Math.random() > 0.5).slice(0, 4);
  
  // Mock DAML contracts data
  const mockContracts = [
    {
      contractId: '00c8bc1f9c2e54b3a7d42dbdf9c8eb5b6c17c7d7d85a4de2d26a9d12c45e9a99f',
      status: 'active' as const,
      bondName: 'GS Corporate Bond 2032',
      issueDate: '2022-04-15',
      participants: ['Goldman Sachs Group', 'Your Institution', 'Regulator']
    },
    {
      contractId: '00a4e9b2c81d76f5309e8c5f4b3d2a1e7c6f9d8a5b4c3d2e1f0a9b8c7d6e5f4a3',
      status: 'active' as const,
      bondName: 'Microsoft Corp 2030',
      issueDate: '2023-05-12',
      participants: ['Microsoft Corporation', 'Your Institution']
    },
    {
      contractId: '00e5d4c3b2a19876543210fedcba9876543210fedc0123456789abcdef012345',
      status: 'pending' as const,
      bondName: 'JPMorgan Chase 2035',
      issueDate: '2023-08-30',
      participants: ['JPMorgan Chase & Co.', 'Your Institution', 'Regulator']
    }
  ];
  
  interface ViewOption {
    id: string;
    label: string;
    icon: LucideIcon;
  }
  
  const viewOptions: ViewOption[] = [
    { id: 'bonds', label: 'My Bonds', icon: Tag },
    { id: 'contracts', label: 'DAML Contracts', icon: List },
    { id: 'verification', label: 'Compliance', icon: Shield }
  ];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
        <button className="px-4 py-2 bg-[#0033A0] text-white rounded-lg hover:bg-blue-900 transition-colors text-sm font-medium flex items-center">
          <Plus size={16} className="mr-1.5" />
          Buy New Bond
        </button>
      </div>
      
      {/* Portfolio Summary */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Portfolio Summary</h2>
            <p className="text-gray-500 text-sm mt-1">Updated as of {new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-1">Holdings Value</div>
              <div className="text-lg font-bold text-gray-900">$3,945,000</div>
            </div>
            
            <div className="h-10 border-r border-gray-200"></div>
            
            <div className="flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-1">Coupon Income</div>
              <div className="text-lg font-bold text-[#B4975A]">$187,562</div>
            </div>
            
            <div className="h-10 border-r border-gray-200"></div>
            
            <div className="flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-1">Avg. Yield</div>
              <div className="text-lg font-bold text-[#0033A0]">4.65%</div>
            </div>
            
            <div className="h-10 border-r border-gray-200"></div>
            
            <div className="flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-1">Total Bonds</div>
              <div className="text-lg font-bold text-gray-900">{userBonds.length}</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* View Tabs */}
      <div className="bg-white rounded-xl shadow-sm mb-6 border border-gray-100 overflow-hidden">
        <div className="flex">
          {viewOptions.map((option) => (
            <button
              key={option.id}
              className={`flex items-center px-4 py-3 text-sm font-medium ${
                activeView === option.id
                  ? 'text-[#0033A0] border-b-2 border-[#0033A0]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveView(option.id)}
            >
              <option.icon size={16} className="mr-2" />
              {option.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Search and Filter Bar */}
      {activeView !== 'verification' && (
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full md:w-auto md:flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder={`Search ${activeView === 'bonds' ? 'bonds' : 'contracts'}...`}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button className="flex items-center justify-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter size={16} className="mr-1.5" />
            <span className="text-sm">Filter</span>
          </button>
        </div>
      )}
      
      {/* Content based on active view */}
      {activeView === 'bonds' && (
        <div>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Your Bond Holdings</h2>
            <div className="flex items-center">
              <TrendingUp size={16} className="text-gray-400 mr-1.5" />
              <span className="text-sm text-gray-500">Sort by: </span>
              <select className="text-sm border-none appearance-none focus:outline-none pl-1">
                <option>Value</option>
                <option>Yield</option>
                <option>Maturity</option>
              </select>
            </div>
          </div>
          
          {userBonds.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userBonds
                .filter(bond => 
                  bond.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  bond.issuer.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map(bond => (
                  <BondCard key={bond.id} bond={bond} />
                ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="text-lg text-gray-400 mb-2">No bonds in your portfolio</div>
              <p className="text-gray-500 mb-4">Start by purchasing bonds from the market</p>
              <button className="px-4 py-2 bg-[#0033A0] text-white rounded-lg hover:bg-blue-900 transition-colors text-sm font-medium">
                Browse Bond Market
              </button>
            </div>
          )}
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Payments</h3>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="px-5 py-3 border-b border-gray-200">Bond</th>
                    <th className="px-5 py-3 border-b border-gray-200">Payment Date</th>
                    <th className="px-5 py-3 border-b border-gray-200">Amount</th>
                    <th className="px-5 py-3 border-b border-gray-200">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="hover:bg-gray-50">
                    <td className="px-5 py-4 border-b border-gray-200 font-medium">GS Corporate Bond 2032</td>
                    <td className="px-5 py-4 border-b border-gray-200">Apr 15, 2025</td>
                    <td className="px-5 py-4 border-b border-gray-200 font-medium">$23,750.00</td>
                    <td className="px-5 py-4 border-b border-gray-200">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Upcoming
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-5 py-4 border-b border-gray-200 font-medium">Microsoft Corp 2030</td>
                    <td className="px-5 py-4 border-b border-gray-200">Nov 12, 2024</td>
                    <td className="px-5 py-4 border-b border-gray-200 font-medium">$15,937.50</td>
                    <td className="px-5 py-4 border-b border-gray-200">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Scheduled
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {activeView === 'contracts' && (
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">DAML Contracts</h2>
            <p className="text-sm text-gray-500">View and manage your active smart contracts on Canton Network</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockContracts
              .filter(contract => 
                contract.bondName.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((contract, index) => (
                <DAMLContract 
                  key={index}
                  contractId={contract.contractId}
                  status={contract.status}
                  bondName={contract.bondName}
                  issueDate={contract.issueDate}
                  participants={contract.participants}
                  onView={() => alert(`Viewing contract: ${contract.contractId}`)}
                />
              ))}
          </div>
          
          <div className="mt-8 bg-blue-50 rounded-xl p-5">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <BarChart2 className="text-[#0033A0]" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Contract Analytics</h3>
                <p className="text-sm text-gray-600">Summary of your DAML contract activity</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-white rounded-lg p-3">
                <div className="text-xs text-gray-500">Active Contracts</div>
                <div className="text-xl font-bold mt-1">5</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-xs text-gray-500">Transaction Volume (30d)</div>
                <div className="text-xl font-bold mt-1">$1.25M</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-xs text-gray-500">Automated Payments</div>
                <div className="text-xl font-bold mt-1">12</div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeView === 'verification' && (
        <div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Compliance & Verification</h2>
            <p className="text-sm text-gray-500">Manage your verification status and compliance documentation</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <KYCVerification 
              isVerified={true}
              level="institutional"
            />
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Regulatory Compliance</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">AML Verification</span>
                  </div>
                  <span className="text-sm font-medium">Compliant</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">OFAC Screening</span>
                  </div>
                  <span className="text-sm font-medium">Passed</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm">Accredited Investor Status</span>
                  </div>
                  <span className="text-sm font-medium">Verified</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-sm">Annual Review</span>
                  </div>
                  <span className="text-sm font-medium">Due in 45 days</span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm text-gray-500">Last updated: 30 days ago</span>
                <button className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  Update Documents
                </button>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Trading Permissions</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Corporate Bonds</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Authorized
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Government Bonds</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Authorized
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Municipal Bonds</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Authorized
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">International Bonds</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Additional Verification Required
                  </span>
                </div>
              </div>
              
              <button className="mt-6 w-full bg-[#0033A0] text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-900 transition-colors">
                Request Additional Permissions
              </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-3">Document Repository</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <FileText size={14} className="text-gray-400 mr-2" />
                    <span className="text-sm">KYC Documentation</span>
                  </div>
                  <span className="text-xs text-gray-500">Uploaded 90 days ago</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <FileText size={14} className="text-gray-400 mr-2" />
                    <span className="text-sm">Trading Agreement</span>
                  </div>
                  <span className="text-xs text-gray-500">Signed 180 days ago</span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <FileText size={14} className="text-gray-400 mr-2" />
                    <span className="text-sm">AML Certification</span>
                  </div>
                  <span className="text-xs text-gray-500">Expires in 275 days</span>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <FileText size={14} className="text-gray-400 mr-2" />
                    <span className="text-sm">Tax Documentation</span>
                  </div>
                  <span className="text-xs text-gray-500">Current tax year</span>
                </div>
              </div>
              
              <button className="mt-6 w-full border border-gray-200 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                <Plus size={14} className="mr-1.5" />
                Upload New Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;