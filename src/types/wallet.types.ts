
export enum TransactionType {
  credit = 'CREDIT',
  debit = 'DEBIT',
}

export enum TransactionCategory {
  earning = 'EARNING',           
  withdrawal = 'WITHDRAWAL',     
  refund = 'REFUND',             
  escrow_hold = 'ESCROW_HELD',   
  escrow_release = 'ESCROW_RELEASE', 
}

export enum TransactionStatus {
  pending = 'PENDING',
  completed = 'COMPLETED',
  failed = 'FAILED',
}


export enum SubmissionStatus {
    pending = 'PENDING',
    approved = 'APPROVED',
    rejected = 'REJECTED',
    revision_requested = 'REVISIONN_REQUESTED'
}

export interface IWallet {
  availableBalance:number;
  pendingBalance:number;
  totalEarnings:number;
}
export interface IWalletTransaction {
  task : {
    title:string;
    budget:number;
  };
  submission: {
    message:string;
    status:SubmissionStatus;
  };
  type:TransactionType;
  amount:number;
  category:TransactionCategory;
  stripeTransferId:string;
  status:string;
  description:TransactionStatus;
}

export interface IWithdrawWallet {
  transferId:string;
  wallet: IWallet;
}
