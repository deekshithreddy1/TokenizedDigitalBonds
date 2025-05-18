export interface DAMLParty {
  id: string;
  displayName: string;
  isLocal: boolean;
}

export interface DAMLTemplate {
  packageId: string;
  moduleName: string;
  entityName: string;
}

export interface DAMLContractId {
  template: DAMLTemplate;
  contractId: string;
}

export interface DAMLContract<T> {
  templateId: DAMLTemplate;
  contractId: string;
  payload: T;
  signatories: DAMLParty[];
  observers: DAMLParty[];
  agreementText?: string;
}

export interface DAMLCommand {
  templateId: DAMLTemplate;
  commandType: 'create' | 'exercise' | 'archive';
  arguments: any;
}

export interface DAMLCreateCommand<T> extends DAMLCommand {
  commandType: 'create';
  arguments: T;
}

export interface DAMLExerciseCommand extends DAMLCommand {
  commandType: 'exercise';
  contractId: string;
  choice: string;
  arguments: any;
}

export interface DAMLTransaction {
  transactionId: string;
  commandId: string;
  workflowId?: string;
  effectiveAt: string;
  events: DAMLEvent[];
}

export type DAMLEvent = DAMLCreatedEvent | DAMLArchivedEvent | DAMLExercisedEvent;

export interface DAMLCreatedEvent<T = any> {
  eventType: 'created';
  contractId: string;
  templateId: DAMLTemplate;
  payload: T;
  signatories: DAMLParty[];
  observers: DAMLParty[];
  witnessParties: DAMLParty[];
}

export interface DAMLArchivedEvent {
  eventType: 'archived';
  contractId: string;
  templateId: DAMLTemplate;
  witnessParties: DAMLParty[];
}

export interface DAMLExercisedEvent {
  eventType: 'exercised';
  contractId: string;
  templateId: DAMLTemplate;
  choice: string;
  choiceArgument: any;
  actingParties: DAMLParty[];
  childEvents: DAMLEvent[];
  witnessParties: DAMLParty[];
}

export interface BondIssuanceContract {
  issuer: string;
  bondId: string;
  name: string;
  description: string;
  parValue: number;
  couponRate: number;
  issueDate: string;
  maturityDate: string;
  tokenSupply: number;
  dayCountConvention: string;
  paymentFrequency: string;
}

export interface BondTokenContract {
  bondId: string;
  owner: string;
  amount: number;
  tokenId: string;
  issuedAt: string;
}

export interface KYCApprovalContract {
  userId: string;
  approver: string;
  level: string;
  approvedAt: string;
  expiresAt: string;
  details: {
    fullName: string;
    documentType: string;
    verificationMethod: string;
  };
}