import React from 'react';
import { ChevronDown, Download, Filter } from 'lucide-react';
import { Transaction } from '../types/transaction';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-5 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
          <div className="flex space-x-2">
            <button className="flex items-center px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={14} className="mr-1.5" />
              Filter
              <ChevronDown size={14} className="ml-1.5" />
            </button>
            <button className="flex items-center px-3 py-1.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Download size={14} className="mr-1.5" />
              Export
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-5 py-3 border-b border-gray-200">Transaction ID</th>
              <th className="px-5 py-3 border-b border-gray-200">Date & Time</th>
              <th className="px-5 py-3 border-b border-gray-200">Bond</th>
              <th className="px-5 py-3 border-b border-gray-200">Type</th>
              <th className="px-5 py-3 border-b border-gray-200">Amount</th>
              <th className="px-5 py-3 border-b border-gray-200">Counterparty</th>
              <th className="px-5 py-3 border-b border-gray-200">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-5 py-4 border-b border-gray-200">
                  <span className="font-mono text-xs">{transaction.id.substring(0, 8)}</span>
                </td>
                <td className="px-5 py-4 border-b border-gray-200">
                  {formatDateTime(transaction.timestamp)}
                </td>
                <td className="px-5 py-4 border-b border-gray-200 font-medium">
                  {transaction.bondName}
                </td>
                <td className="px-5 py-4 border-b border-gray-200">
                  <span 
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                      ${getTransactionTypeStyles(transaction.type)}
                    `}
                  >
                    {transaction.type}
                  </span>
                </td>
                <td className="px-5 py-4 border-b border-gray-200 font-medium">
                  ${transaction.amount.toLocaleString()}
                </td>
                <td className="px-5 py-4 border-b border-gray-200">
                  {transaction.counterparty}
                </td>
                <td className="px-5 py-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <div 
                      className={`w-2 h-2 rounded-full mr-2 
                        ${getStatusColor(transaction.status)}
                      `} 
                    />
                    <span>{transaction.status}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {transactions.length === 0 && (
        <div className="py-8 text-center text-gray-500">
          No transactions found
        </div>
      )}
      
      <div className="px-5 py-3 flex justify-between items-center border-t border-gray-200">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">{transactions.length}</span> transactions
        </div>
        <div className="flex">
          <button className="px-3 py-1 border border-gray-200 rounded-l-lg text-sm hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border-t border-b border-r border-gray-200 rounded-r-lg text-sm hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper functions
const formatDateTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const getTransactionTypeStyles = (type: string): string => {
  switch (type) {
    case 'Purchase':
      return 'bg-green-100 text-green-800';
    case 'Sale':
      return 'bg-blue-100 text-blue-800';
    case 'Coupon Payment':
      return 'bg-purple-100 text-purple-800';
    case 'Maturity':
      return 'bg-yellow-100 text-yellow-800';
    case 'Issuance':
      return 'bg-[#0033A0] bg-opacity-10 text-[#0033A0]';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Completed':
      return 'bg-green-500';
    case 'Pending':
      return 'bg-yellow-500';
    case 'Failed':
      return 'bg-red-500';
    case 'Processing':
      return 'bg-blue-500';
    default:
      return 'bg-gray-500';
  }
};

export default TransactionHistory;