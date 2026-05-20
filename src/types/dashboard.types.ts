export interface NavItem {
    title: string,
    href: string,
    icon: string
}

export interface NavSection {
    title?: string,
    items: NavItem[]
}

export interface PieChartData {
    status: string,
    count: number
}

export interface BarChartData {
    month: Date | string,
    count: number
}

export interface ICountTotals {
    users: number;
    submissions:number;
    tasks:number;
}


export interface IUserMetaResponse {
  worker: {
    _id: string | null;
    totalSubmissions: number;
    approved: number;
    rejected: number;
    pending: number;
  };

  owner: {
    _id: string | null;
    totalTasks: number;
    activeTasks: number;
    completedTasks: number;
    totalBudget: number;
  };

  wallet: {
    _id: string | null;
    totalEarnings: number;
    totalSpent: number;
    totalWithdrawn: number;
  };
}


export interface ITimeSeriesCount {
  date: string;
  count: number;
}

export interface ITimeSeriesAmount {
  date: string;
  amount: number;
}
export type ISubmissionGraphResponse = ITimeSeriesCount[];
export type IEarningsGraphResponse = ITimeSeriesAmount[];
export type ISpendingGraphResponse = ITimeSeriesAmount[];

export interface ISubmissionStatusResponse {
  _id: 'PENDING' | 'APPROVED' | 'REJECTED' | 'REVISION_REQUESTED' | 'EXPIRED';
  count: number;
}

export type ISubmissionStatusGraphResponse = ISubmissionStatusResponse[];

export interface ICategoryStatsResponse {
  category: string;
  count: number;
}

export type ICategoryStatsGraphResponse = ICategoryStatsResponse[];

export type ITaskGraphResponse = ITimeSeriesCount[];


export interface IFinanceOverviewResponse {
  earnings: ITimeSeriesAmount[];
  spending: ITimeSeriesAmount[];
}
