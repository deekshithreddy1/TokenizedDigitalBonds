import { Transaction } from '../types/transaction';

// Generate realistic mock transaction data for bond tokens
export const mockTransactions: Transaction[] = [
  {
    id: 'txn_3e8d9f2a5c7b1e',
    timestamp: '2025-01-25T10:15:32Z',
    bondId: '3',
    bondName: 'Microsoft Corp 2030',
    type: 'Purchase',
    amount: 250000,
    counterparty: 'Vanguard Group',
    status: 'Completed',
    blockchainTxHash: '0xe723f9e6a717a5b724eec318bef81e6894411fc33597b75d41b41b33c167ab48'
  },
  {
    id: 'txn_7a2b9c4d3e8f5g',
    timestamp: '2025-01-24T15:42:18Z',
    bondId: '1',
    bondName: 'GS Corporate Bond 2032',
    type: 'Coupon Payment',
    amount: 23750,
    counterparty: 'Goldman Sachs Group',
    status: 'Completed',
    blockchainTxHash: '0xd82fd71eab4ffe821901522f6bd8da972f3d5bc9c19ce373f72df5166e6c6843'
  },
  {
    id: 'txn_5f4e3d2c1b9a8h',
    timestamp: '2025-01-23T09:22:45Z',
    bondId: '2',
    bondName: 'US Treasury 10-Year Note',
    type: 'Sale',
    amount: 100000,
    counterparty: 'Bank of America',
    status: 'Completed',
    blockchainTxHash: '0x927b3411fd0f85392b414548e15d6dda7f4a82a08e80d069c02745fbd6e2a53a'
  },
  {
    id: 'txn_2b3c4d5e6f7g8i',
    timestamp: '2025-01-22T14:05:33Z',
    bondId: '6',
    bondName: 'German Govt. Bond 2032',
    type: 'Purchase',
    amount: 500000,
    counterparty: 'Deutsche Bank',
    status: 'Completed',
    blockchainTxHash: '0x78b912a34cd5678befc9012de3f4a56b7c8d90e12a34fd56e7890b12c34d567e'
  },
  {
    id: 'txn_9i8h7g6f5e4d3j',
    timestamp: '2025-01-21T11:30:12Z',
    bondId: '7',
    bondName: 'Apple Inc. 2031',
    type: 'Purchase',
    amount: 200000,
    counterparty: 'Fidelity Investments',
    status: 'Completed',
    blockchainTxHash: '0xe5d4c3b2a19876543210fedcba9876543210fedc0123456789abcdef01234567'
  },
  {
    id: 'txn_4j5k6l7m8n9o0p',
    timestamp: '2025-01-20T16:18:22Z',
    bondId: '8',
    bondName: 'California Muni Bond 2029',
    type: 'Issuance',
    amount: 750000,
    counterparty: 'State of California',
    status: 'Completed',
    blockchainTxHash: '0x123abc456def789010fedcba98765432100123456789abcdef0123456789abcd'
  },
  {
    id: 'txn_1a2b3c4d5e6f7q',
    timestamp: '2025-01-19T09:45:55Z',
    bondId: '4',
    bondName: 'NYC Municipal 2028',
    type: 'Coupon Payment',
    amount: 9625,
    counterparty: 'New York City',
    status: 'Processing',
    blockchainTxHash: '0xbd7e6f5d4c3b2a1098765432109876543210abcdef0123456789abcdef012345'
  },
  {
    id: 'txn_8q9r0s1t2u3v4w',
    timestamp: '2025-01-18T13:22:47Z',
    bondId: '1',
    bondName: 'GS Corporate Bond 2032',
    type: 'Sale',
    amount: 150000,
    counterparty: 'BlackRock',
    status: 'Completed',
    blockchainTxHash: '0x210fedcba9876543210fedcba9876543210fedcba9876543210fedcba987654'
  },
  {
    id: 'txn_5w6x7y8z9a0b1r',
    timestamp: '2025-01-17T10:05:18Z',
    bondId: '5',
    bondName: 'JPMorgan Chase 2035',
    type: 'Purchase',
    amount: 500000,
    counterparty: 'State Street Global Advisors',
    status: 'Pending',
    blockchainTxHash: '0x987654321abcdef0123456789abcdef01234567890abcdef0123456789abcdef'
  },
  {
    id: 'txn_2c3d4e5f6g7h8s',
    timestamp: '2025-01-16T15:42:30Z',
    bondId: '3',
    bondName: 'Microsoft Corp 2030',
    type: 'Coupon Payment',
    amount: 15937.5,
    counterparty: 'Microsoft Corporation',
    status: 'Completed',
    blockchainTxHash: '0xabcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789'
  }
];