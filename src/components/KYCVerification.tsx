import React, { useState } from 'react';
import { Check, Shield, UserCog, X } from 'lucide-react';

interface KYCVerificationProps {
  isVerified: boolean;
  onStartVerification?: () => void;
  level: 'basic' | 'advanced' | 'institutional';
}

const KYCVerification: React.FC<KYCVerificationProps> = ({ 
  isVerified, 
  onStartVerification,
  level = 'basic'
}) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const getLevelDetails = () => {
    switch(level) {
      case 'basic':
        return {
          title: 'Basic KYC',
          requirements: [
            'Email verification',
            'Phone number verification',
            'Personal identity document'
          ]
        };
      case 'advanced':
        return {
          title: 'Advanced KYC',
          requirements: [
            'Email verification',
            'Phone number verification',
            'Personal identity document',
            'Proof of address',
            'Source of funds declaration'
          ]
        };
      case 'institutional':
        return {
          title: 'Institutional KYC',
          requirements: [
            'Company registration documents',
            'Director identification',
            'Authorized representatives',
            'Beneficial ownership declaration',
            'AML compliance documentation',
            'Regulatory certifications'
          ]
        };
      default:
        return { title: 'KYC', requirements: [] };
    }
  };
  
  const levelInfo = getLevelDetails();
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              isVerified ? 'bg-green-100' : 'bg-yellow-100'
            }`}>
              {isVerified ? (
                <Check className="text-green-600" size={20} />
              ) : (
                <UserCog className="text-yellow-600" size={20} />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{levelInfo.title}</h3>
              <p className="text-sm text-gray-500 mt-0.5">
                {isVerified ? 'Verification complete' : 'Verification required'}
              </p>
            </div>
          </div>
          
          {isVerified ? (
            <span className="bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded-full font-medium">
              Verified
            </span>
          ) : (
            onStartVerification && (
              <button 
                onClick={onStartVerification}
                className="px-3 py-1.5 bg-[#0033A0] text-white text-sm rounded-lg hover:bg-blue-900 transition-colors"
              >
                Complete KYC
              </button>
            )
          )}
        </div>
        
        <button 
          className="text-sm text-[#0033A0] mt-4 flex items-center font-medium"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide details' : 'Show details'}
        </button>
        
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium mb-2">Requirements:</h4>
            <ul className="space-y-2">
              {levelInfo.requirements.map((requirement, index) => (
                <li key={index} className="flex items-center text-sm">
                  {isVerified ? (
                    <Check size={16} className="text-green-500 mr-2 flex-shrink-0" />
                  ) : (
                    <X size={16} className="text-gray-300 mr-2 flex-shrink-0" />
                  )}
                  <span className={isVerified ? 'text-gray-700' : 'text-gray-500'}>
                    {requirement}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 px-5 py-3 flex items-center">
        <Shield size={14} className="text-gray-500 mr-2" />
        <span className="text-xs text-gray-500">
          Encryption and secure data storage compliant with regulations
        </span>
      </div>
    </div>
  );
};

export default KYCVerification;