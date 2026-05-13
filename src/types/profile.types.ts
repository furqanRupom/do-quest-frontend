export interface Profile {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  socialLinks: string[];
  needPasswordChange: boolean;
  company?:string;
  location?:string;
  payoutsEnabeld?:boolean;
  createdAt: string;
  updatedAt: string;
}
