
// Task/Bounty
export interface ITaskAndBounty {
  _id: string;
  user: string;
  title: string;
  description: string;
  successRequirements: string[];
  attachments: string;
  budget: number;
  deadline: string; // ISO 8601 date string
  maxSubmissions: number;
  status: TaskStatus;
  paymentStatus: PaymentStatus;
  categories: string[];
  tags: string[];
  paymentFlowStatus: PaymentFlowStatus;
  isDeleted: boolean;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  paymentIntentId: string;
}

export interface INewTaskAndBounty {
  title: string;
  description: string;
  successRequirements: string[];
  attachments: string;
  budget: number;
  deadline: string; // ISO 8601 date string
  maxSubmissions: number;
  categories: string[];
  tags: string[]
}

export interface IChangeTaskAndBountyStatus {
  taskStatus:TaskStatus
}

// Enum Types
type TaskStatus = 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

type PaymentStatus = 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

type PaymentFlowStatus = 'PENDING' | 'AUTHORIZED' | 'CAPTURED' | 'CANCELLED' | 'NO_PAYMENT' | 'FAILED';



