export interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
    user: {
        needPasswordChange: boolean;
        email: string;
        name: string;
        role: string;
        image: string;
        status: string;
        isDeleted: boolean;
    }
}

export interface IRegisterResponse {
    needPasswordChange: boolean;
    email: string;
    name: string;
    username: string;
    role: string;
    image: string;
    status: string;
    isDeleted: boolean;
}