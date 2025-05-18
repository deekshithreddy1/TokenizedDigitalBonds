import React, { useState } from 'react';
import { 
  AlertTriangle,
  Check,
  ChevronDown, 
  CreditCard, 
  FileText, 
  Info, 
  Lock, 
  Plus, 
  Shield
} from 'lucide-react';

const IssueBond: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [bondDetails, setBondDetails] = useState({
    name: '',
    type: '',
    couponRate: '',
    maturityYears: '',
    parValue: '',
    tokenSupply: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBondDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate bond issuance through DAML contract
    setTimeout(() => {
      setIsSubmitting(false);
      setShowConfirmation(true);
    }, 2000);
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Issue New Digital Bond</h1>
      <p className="text-gray-500 mb-6">Create a new bond issuance with atomic settlement on Canton Network</p>
      
      {/* Stepper */}
      <div className="mb-8">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-[#0033A0] text-white' : 'bg-gray-200 text-gray-500'}`}>
            1
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-[#0033A0]' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-[#0033A0] text-white' : 'bg-gray-200 text-gray-500'}`}>
            2
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-[#0033A0]' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-[#0033A0] text-white' : 'bg-gray-200 text-gray-500'}`}>
            3
          </div>
        </div>
        <div className="flex justify-between mt-2 px-2">
          <div className="text-sm font-medium text-center">
            <div className={step >= 1 ? 'text-[#0033A0]' : 'text-gray-500'}>Bond Details</div>
          </div>
          <div className="text-sm font-medium text-center">
            <div className={step >= 2 ? 'text-[#0033A0]' : 'text-gray-500'}>Tokenization</div>
          </div>
          <div className="text-sm font-medium text-center">
            <div className={step >= 3 ? 'text-[#0033A0]' : 'text-gray-500'}>Review & Submit</div>
          </div>
        </div>
      </div>
      
      {showConfirmation ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-100">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="text-green-600" size={28} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Bond Successfully Issued</h2>
          <p className="text-gray-600 mb-6">Your digital bond has been created and is now available on Canton Network</p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Bond Name:</span>
              <span className="font-medium">{bondDetails.name}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">DAML Contract ID:</span>
              <span className="font-mono text-xs">00a4e9b2c81d76f5309e8c5f4b3d2a1e7c6f9d8a</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Tokens Created:</span>
              <span className="font-medium">{bondDetails.tokenSupply}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Transaction Hash:</span>
              <span className="font-mono text-xs">0x92fd71ebc4dcf821981522a6be8ea97243d5bc9</span>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button 
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              onClick={() => window.location.href = '/market'}
            >
              Go to Bond Market
            </button>
            <button 
              className="px-6 py-2 bg-[#0033A0] text-white rounded-lg hover:bg-blue-900"
              onClick={() => window.location.href = '/bonds/new'}
            >
              View Bond Details
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md border border-gray-100">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Bond Details */}
            {step === 1 && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">1. Enter Bond Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Bond Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={bondDetails.name}
                      onChange={handleChange}
                      placeholder="e.g. GS Corporate Bond 2032"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                      Bond Type
                    </label>
                    <div className="relative">
                      <select
                        id="type"
                        name="type"
                        required
                        value={bondDetails.type}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg appearance-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select type</option>
                        <option value="Corporate">Corporate</option>
                        <option value="Government">Government</option>
                        <option value="Municipal">Municipal</option>
                        <option value="Treasury">Treasury</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="couponRate" className="block text-sm font-medium text-gray-700 mb-1">
                      Coupon Rate (%)
                    </label>
                    <input
                      id="couponRate"
                      name="couponRate"
                      type="number"
                      required
                      step="0.01"
                      min="0"
                      max="20"
                      value={bondDetails.couponRate}
                      onChange={handleChange}
                      placeholder="e.g. 4.75"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="maturityYears" className="block text-sm font-medium text-gray-700 mb-1">
                      Maturity (Years)
                    </label>
                    <input
                      id="maturityYears"
                      name="maturityYears"
                      type="number"
                      required
                      min="1"
                      max="30"
                      value={bondDetails.maturityYears}
                      onChange={handleChange}
                      placeholder="e.g. 10"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="parValue" className="block text-sm font-medium text-gray-700 mb-1">
                      Par Value ($)
                    </label>
                    <input
                      id="parValue"
                      name="parValue"
                      type="number"
                      required
                      min="10000"
                      step="10000"
                      value={bondDetails.parValue}
                      onChange={handleChange}
                      placeholder="e.g. 1000000"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Bond Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    required
                    value={bondDetails.description}
                    onChange={handleChange}
                    placeholder="Provide a description of the bond..."
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 mt-6 flex items-start">
                  <Info className="text-blue-600 mt-0.5 mr-3 flex-shrink-0" size={18} />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">DAML Contract Creation</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Bond details will be encoded in a DAML contract to ensure atomic settlement and regulatory compliance.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 2: Tokenization Details */}
            {step === 2 && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">2. Tokenization Parameters</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="tokenSupply" className="block text-sm font-medium text-gray-700 mb-1">
                      Token Supply
                    </label>
                    <input
                      id="tokenSupply"
                      name="tokenSupply"
                      type="number"
                      required
                      min="1"
                      value={bondDetails.tokenSupply}
                      onChange={handleChange}
                      placeholder="e.g. 1000"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Number of tokens to create (each representing a fraction of the bond)
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Token Price (calculated)
                    </label>
                    <div className="w-full p-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-700">
                      ${bondDetails.parValue && bondDetails.tokenSupply 
                        ? (Number(bondDetails.parValue) / Number(bondDetails.tokenSupply)).toFixed(2) 
                        : '0.00'}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Price per token based on par value and supply
                    </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium text-gray-900 mb-3">Transfer Restrictions</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="restriction-accredited"
                        name="restriction-accredited"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="restriction-accredited" className="ml-2 text-sm text-gray-700">
                        Accredited investors only
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="restriction-kyc"
                        name="restriction-kyc"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="restriction-kyc" className="ml-2 text-sm text-gray-700">
                        KYC verification required
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="restriction-geography"
                        name="restriction-geography"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="restriction-geography" className="ml-2 text-sm text-gray-700">
                        Geographic restrictions
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h3 className="font-medium text-gray-900 mb-3">Payment Configuration</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Coupon Frequency
                      </label>
                      <div className="relative">
                        <select
                          className="w-full p-2 border border-gray-300 rounded-lg appearance-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option>Semi-Annual</option>
                          <option>Quarterly</option>
                          <option>Annual</option>
                          <option>Monthly</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Day Count Convention
                      </label>
                      <div className="relative">
                        <select
                          className="w-full p-2 border border-gray-300 rounded-lg appearance-none focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option>30/360</option>
                          <option>Actual/360</option>
                          <option>Actual/365</option>
                          <option>Actual/Actual</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4 mt-6 flex items-start">
                  <Shield className="text-blue-600 mt-0.5 mr-3 flex-shrink-0" size={18} />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Atomic Settlement</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Canton Network ensures atomic settlement of bond transfers with built-in regulatory compliance checks.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Step 3: Review and Submit */}
            {step === 3 && (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">3. Review and Submit</h2>
                
                <div className="bg-gray-50 rounded-lg p-5 mb-6">
                  <h3 className="font-medium text-gray-900 mb-4">Bond Parameters</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Bond Name:</span>
                      <span className="font-medium">{bondDetails.name}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-500">Bond Type:</span>
                      <span className="font-medium">{bondDetails.type}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-500">Coupon Rate:</span>
                      <span className="font-medium">{bondDetails.couponRate}%</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-500">Maturity:</span>
                      <span className="font-medium">{bondDetails.maturityYears} years</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-500">Par Value:</span>
                      <span className="font-medium">${Number(bondDetails.parValue).toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-500">Token Supply:</span>
                      <span className="font-medium">{Number(bondDetails.tokenSupply).toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-500">Token Price:</span>
                      <span className="font-medium">
                        ${bondDetails.parValue && bondDetails.tokenSupply 
                          ? (Number(bondDetails.parValue) / Number(bondDetails.tokenSupply)).toFixed(2) 
                          : '0.00'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-500">Coupon Payments:</span>
                      <span className="font-medium">Semi-Annual</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-gray-500 mb-2">Description:</div>
                    <div className="text-sm">{bondDetails.description}</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-5 mb-6">
                  <h3 className="font-medium text-gray-900 mb-4">Legal & Technical</h3>
                  
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start">
                      <Lock className="text-gray-400 mt-0.5 mr-3 flex-shrink-0" size={16} />
                      <div>
                        <span className="font-medium">DAML Contract Encoding</span>
                        <p className="text-gray-600 mt-1">
                          Bond terms will be encoded as a DAML contract on Canton Network
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Shield className="text-gray-400 mt-0.5 mr-3 flex-shrink-0" size={16} />
                      <div>
                        <span className="font-medium">Regulatory Compliance</span>
                        <p className="text-gray-600 mt-1">
                          All transfers will include automated compliance checks
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <CreditCard className="text-gray-400 mt-0.5 mr-3 flex-shrink-0" size={16} />
                      <div>
                        <span className="font-medium">Automated Coupon Payments</span>
                        <p className="text-gray-600 mt-1">
                          Smart contract will handle coupon payments to token holders
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FileText className="text-gray-400 mt-0.5 mr-3 flex-shrink-0" size={16} />
                      <div>
                        <span className="font-medium">Legal Documentation</span>
                        <p className="text-gray-600 mt-1">
                          Digital legal agreements will be attached to the bond contract
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-4 mb-6 flex items-start border border-yellow-100">
                  <AlertTriangle className="text-yellow-500 mt-0.5 mr-3 flex-shrink-0" size={18} />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Important Notice</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      By issuing this bond, you certify that all information provided is accurate and that you have the legal authority to issue this bond.
                    </p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                      I agree to the <a href="#" className="text-[#0033A0] hover:underline">Terms and Conditions</a> and confirm this bond complies with all applicable regulations
                    </label>
                  </div>
                </div>
              </div>
            )}
            
            {/* Navigation buttons */}
            <div className="bg-gray-50 px-6 py-4 flex justify-between rounded-b-xl">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Back
                </button>
              ) : (
                <div></div>
              )}
              
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2 bg-[#0033A0] text-white rounded-lg hover:bg-blue-900 transition-colors"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  className={`px-6 py-2 bg-[#0033A0] text-white rounded-lg transition-colors ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-900'
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Issue Bond'}
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default IssueBond;