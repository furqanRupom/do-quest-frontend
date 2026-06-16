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
            ]
        },
    ]
}



export const adminNavItems: NavSection[] = [
    {
        // title: "User Management",
        items: [
            {
                title: "Users",
                href: "/admin/dashboard/users-management",
                icon: "Users",
            },
            
            {
                title: "Bounties",
                href: "/admin/dashboard/bounties-management",
                icon: "Calendar",
            },
        ],
    },
    // {
    //     // title: "Bounties and tasks Management",
    //     items: [
    //         {
    //             title: "Bounties",
    //             href: "/admin/dashboard/bounties-management",
    //             icon: "Calendar",
    //         },

    //     ],
    // },
];

export const userNavItems: NavSection[] = [

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
