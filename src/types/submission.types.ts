import { TaskStatus } from "./bounty.types";

export enum  SubmissionStatus {
     pending = 'PENDING',
    approved = 'APPROVED',
    rejected = 'REJECTED',
    revision_requested = 'REVISIONN_REQUESTED'

}
export interface ISubmission {
  _id:string
  task: {
    _id:string;
    title:string;
    budget:number;
    status:TaskStatus,
    deadline:string
  };
  user: {
    name:string;
    username:string;
    email:string
  };

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

export interface IApprovedSubmission {
  submission : ISubmission,
  transferId: {id: string, amount:number}
}
