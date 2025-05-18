import React from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Bond } from '../types/bond';
import { Link } from 'react-router-dom';

interface BondCardProps {
  bond: Bond;
}

const BondCard: React.FC<BondCardProps> = ({ bond }) => {
  const timeToMaturity = calculateTimeToMaturity(bond.maturityDate);
  const progressPercentage = calculateMaturityProgress(bond.issueDate, bond.maturityDate);
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {bond.type}
            </span>
            <h3 className="mt-2 text-lg font-semibold text-gray-900">{bond.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{bond.issuer}</p>
          </div>
          <div className="bg-blue-50 p-2 rounded-lg">
            <TrendingUp className="text-[#0033A0]" size={18} />
          </div>
        </div>
        
        <div className="flex justify-between mt-4">
          <div>
            <div className="text-xs text-gray-500 mb-1">Coupon Rate</div>
            <div className="text-lg font-bold text-[#0033A0]">{bond.couponRate}%</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Current Yield</div>
            <div className="text-lg font-bold text-[#B4975A]">{bond.currentYield}%</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Par Value</div>
            <div className="text-lg font-bold">${bond.parValue.toLocaleString()}</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-500">Maturity Progress</span>
            <span className="text-xs font-medium">{timeToMaturity}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-[#0033A0] h-1.5 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
          <div>
            <div className="text-sm font-semibold text-gray-900">
              {bond.available ? 'Available for Trade' : 'Currently Locked'}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">
              Last traded: {formatDate(bond.lastTraded)}
            </div>
          </div>
          <Link 
            to={`/bonds/${bond.id}`}
            className="flex items-center text-[#0033A0] font-medium text-sm"
          >
            View Details <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Helper functions
const calculateTimeToMaturity = (maturityDate: string): string => {
  const maturity = new Date(maturityDate);
  const today = new Date();
  
  const diffTime = Math.abs(maturity.getTime() - today.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays > 365) {
    return `${Math.floor(diffDays / 365)} years left`;
  } else {
    return `${diffDays} days left`;
  }
};

const calculateMaturityProgress = (issueDate: string, maturityDate: string): number => {
  const issue = new Date(issueDate).getTime();
  const maturity = new Date(maturityDate).getTime();
  const today = new Date().getTime();
  
  const totalDuration = maturity - issue;
  const elapsed = today - issue;
  
  return Math.min(100, Math.max(0, Math.floor((elapsed / totalDuration) * 100)));
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  }).format(date);
};

export default BondCard;