import { UserRole } from "@/lib/authUtils";

export interface UserInfo {
    sub: string
    name: string,
    username:string
    email: string,
    role: UserRole
}