import { UserRole } from "@/lib/authUtils";

export interface UserInfo {
    sub: string
    name: string,
    username:string
    email: string,
    role: UserRole
}

export interface IUser {
    _id : string
    name :string
    username:string
    email:string
    role:UserRole
    isDeleted:boolean
    needPasswordChange:boolean
    location:string
    company:string
    createdAt:string
    updatedAt:string
}
