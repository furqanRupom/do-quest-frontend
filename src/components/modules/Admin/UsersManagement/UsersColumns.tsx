import DateCell from "@/components/shared/cell/DateCell"
import { Badge } from "@/components/ui/badge"
import { IUser } from "@/types/user.types"
import { ColumnDef } from "@tanstack/react-table"

export const UsersColumns: ColumnDef<IUser>[] = [
    {
        id: "name",
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <span className="font-medium line-clamp-1">
                {row.original.name}
            </span>
        ),
    },
    {
        id: "username",
        accessorKey: "username",
        header: "Username",
        cell: ({ row }) => (
            <span className="text-sm text-muted-foreground">
                @{row.original.username}
            </span>
        ),
    },
    {
        id: "email",
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <span className="text-sm text-muted-foreground">
                {row.original.email}
            </span>
        ),
    },
    {
        id: "role",
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
            <Badge variant="outline" className="capitalize">
                {row.original.role}
            </Badge>
        ),
    },
    {
        id: "location",
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => (
            <span className="text-sm text-muted-foreground">
                {row.original.location || "—"}
            </span>
        ),
    },
    {
        id: "company",
        accessorKey: "company",
        header: "Company",
        cell: ({ row }) => (
            <span className="text-sm text-muted-foreground">
                {row.original.company || "—"}
            </span>
        ),
    },
    {
        id: "isDeleted",
        accessorKey: "isDeleted",
        header: "Account Status",
        cell: ({ row }) => (
            <Badge variant={row.original.isDeleted ? "destructive" : "default"}>
                {row.original.isDeleted ? "Deleted" : "Active"}
            </Badge>
        ),
    },
    {
        id: "needPasswordChange",
        accessorKey: "needPasswordChange",
        header: "Password Change",
        cell: ({ row }) => (
            <Badge variant={row.original.needPasswordChange ? "secondary" : "outline"}>
                {row.original.needPasswordChange ? "Required" : "Not Required"}
            </Badge>
        ),
    },
    {
        id: "createdAt",
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => {
            if (!row.original.createdAt) {
                return <span className="text-muted-foreground">N/A</span>
            }
            return (
                <DateCell
                    date={row.original.createdAt}
                    formatString="MMM dd, yyyy"
                />
            )
        },
    },
]