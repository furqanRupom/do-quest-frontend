import { Role } from "@/enums/role.enum";

export type UserRole = Role.Admin | Role.User;

export const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password", "/verify-email"];

export const isAuthRoute = (pathname: string) => {
    return authRoutes.some((router: string) => router === pathname);
}

export type RouteConfig = {
    exact: string[],
    pattern: RegExp[]
}

export const commonProtectedRoutes: RouteConfig = {
    exact: ["/my-profile", "/change-password"],
    pattern: []
}



export const adminProtectedRoutes: RouteConfig = {
    pattern: [/^\/admin\/dashboard/], // Matches any path that starts with /admin/dashboard
    exact: []
}



export const patientProtectedRoutes: RouteConfig = {
    pattern: [/^\/dashboard/],
    exact: []
};


export const isRouteMatches = (pathname: string, routes: RouteConfig) => {
    if (routes.exact.includes(pathname)) {
        return true;
    }
    return routes.pattern.some((pattern: RegExp) => pattern.test(pathname));
}

export const getRouteOwner = (pathname: string): Role | "common" | null => {




    if (isRouteMatches(pathname, adminProtectedRoutes)) {
        return Role.Admin;
    }

    if (isRouteMatches(pathname, patientProtectedRoutes)) {
        return Role.User;
    }

    if (isRouteMatches(pathname, commonProtectedRoutes)) {
        return "common";
    }

    return null; // public route
}

export const getDefaultDashboardRoute = (role: UserRole) => {
    if (role === Role.Admin) {
        return "/admin/dashboard";
    }

    if (role === Role.User) {
        return "/dashboard";
    }

    return "/";
}

export const isValidRedirectForRole = (redirectPath: string, role: UserRole) => {


    const sanitizedRedirectPath = redirectPath.split("?")[0] || redirectPath;
    const routeOwner = getRouteOwner(sanitizedRedirectPath);

    if (routeOwner === null || routeOwner === "common") {
        return true;
    }

    if (routeOwner === role) {
        return true;
    }

    return false;
}