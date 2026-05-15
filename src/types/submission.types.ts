export enum  SubmissionStatus {
     pending = 'PENDING',
    approved = 'APPROVED',
    rejected = 'REJECTED',
    revision_requested = 'REVISIONN_REQUESTED'

}
export interface ISubmission {
  _id:string
  task: string;
  user: string;

  message: string;
  attachments: string[];

  status: SubmissionStatus;

  revisionNote?: string;
  rejectionReason?: string;
  stripeTransferId?: string;
  createdAt:string;
  updatedAt:string
}

export interface ISubmitBounty {
  
  message: string;
  attachments: string[];

}
