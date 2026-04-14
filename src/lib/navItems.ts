import { NavSection } from "@/types/dashboard.types";
import { getDefaultDashboardRoute, UserRole } from "./authUtils";
import { Role } from "@/enums/role.enum";



export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);
    return [
        {
            // title : "Dashboard",
            items: [
                {
                    title: "Home",
                    href: "/",
                    icon: "Home"
                },
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard"

                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                },
            ]
        },
        {
            title: "Settings",
            items: [
                {
                    title: "Change Password",
                    href: "change-password",
                    icon: "Settings"
                }
            ]
        }
    ]
}



export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "Admins",
                href: "/admin/dashboard/admins-management",
                icon: "Shield",
            },
            {
                title: "Users",
                href: "/admin/dashboard/users-management",
                icon: "Users",
            }
        ],
    },
    {
        title: "Bounties and tasks Management",
        items: [
            {
                title: "Bounties",
                href: "/admin/dashboard/bounties-management",
                icon: "Calendar",
            },

        ],
    },
];

export const userNavItems: NavSection[] = [
    {
        title: "Bounties and Tasks",
        items: [
            {
                title: "My Bounties",
                href: "/dashboard/my-bounties",
                icon: "ClipboardList",
            },
        ],
    },

];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case Role.Admin:
            return [...commonNavItems, ...adminNavItems];

        case Role.User:
            return [...commonNavItems, ...userNavItems];

    }


}