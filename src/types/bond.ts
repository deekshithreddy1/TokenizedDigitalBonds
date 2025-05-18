export interface Bond {
  id: string;
  name: string;
  issuer: string;
  type: string; // Corporate, Government, Municipal, Treasury
  couponRate: number;
  currentYield: number;
  issueDate: string;
  maturityDate: string;
  parValue: number;
  available: boolean;
  lastTraded: string;
  description: string;
  rating: string;
  tokenSupply: number;
  tokensAvailable: number;
}