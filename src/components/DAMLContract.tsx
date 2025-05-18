import React from 'react';
import { Book, CheckCircle, Shield } from 'lucide-react';

interface DAMLContractProps {
  contractId: string;
  status: 'active' | 'pending' | 'expired';
  bondName: string;
  issueDate: string;
  participants: string[];
  onView?: () => void;
}

const DAMLContract: React.FC<DAMLContractProps> = ({
  contractId,
  status,
  bondName,
  issueDate,
  participants,
  onView
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center">
            <Book size={16} className="text-[#0033A0] mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">{bondName}</h3>
          </div>
          <p className="text-sm text-gray-500 mt-1">Issued: {new Date(issueDate).toLocaleDateString()}</p>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      
      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-1">DAML Contract ID</div>
        <div className="font-mono text-sm bg-gray-50 p-2 rounded overflow-auto">
          {contractId}
        </div>
      </div>
      
      <div className="mb-4">
        <div className="text-xs text-gray-500 mb-1">Contract Participants</div>
        <div className="flex flex-wrap gap-2 mt-1">
          {participants.map((participant, index) => (
            <div 
              key={index} 
              className="bg-blue-50 text-[#0033A0] text-xs px-2 py-1 rounded-md flex items-center"
            >
              <Shield size={12} className="mr-1" />
              {participant}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center text-sm text-gray-500 border-t border-gray-100 pt-4">
        <CheckCircle size={16} className="text-green-500 mr-2" />
        Atomic settlement enabled
        
        {onView && (
          <button 
            onClick={onView}
            className="ml-auto text-[#0033A0] font-medium hover:underline"
          >
            View Contract
          </button>
        )}
      </div>
    </div>
  );
};

export default DAMLContract;