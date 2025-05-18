export interface Transaction {
  id: string;
  timestamp: string;
  bondId: string;
  bondName: string;
  type: string; // Purchase, Sale, Coupon Payment, Maturity, Issuance
  amount: number;
  counterparty: string;
  status: string; // Completed, Pending, Processing, Failed
  blockchainTxHash: string;
}