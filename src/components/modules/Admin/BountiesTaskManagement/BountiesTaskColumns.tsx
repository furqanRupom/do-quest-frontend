import DateCell from "@/components/shared/cell/DateCell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ITaskAndBounty } from "@/types/bounty.types"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

const getStatusVariant = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "default"
    case "COMPLETED":
      return "secondary"
    case "CANCELLED":
      return "destructive"
    default:
      return "outline"
  }
}

export const bountiesTaskColumns: ColumnDef<ITaskAndBounty>[] = [
  {
    id: "title",
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <span className="font-medium line-clamp-1">
        {row.original.title}
      </span>
    ),
  },

  {
    id: "budget",
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => (
      <span className="text-sm font-medium">
        ${row.original.budget}
      </span>
    ),
  },

  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={getStatusVariant(row.original.status)}>
        {row.original.status}
      </Badge>
    ),
  },

  {
    id: "paymentFlowStatus",
    accessorKey: "paymentFlowStatus",
    header: "Payment",
    cell: ({ row }) => (
      <Badge variant="secondary">
        {row.original.paymentFlowStatus}
      </Badge>
    ),
  },

  {
    id: "deadline",
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ row }) => {
      if (!row.original.deadline) {
        return <span className="text-muted-foreground">N/A</span>
      }

      return (
        <DateCell
          date={row.original.deadline}
          formatString="MMM dd, yyyy"
        />
      )
    },
  },

  {
    id: "maxSubmissions",
    accessorKey: "maxSubmissions",
    header: "Max Submissions",
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.maxSubmissions}
      </span>
    ),
  },

  {
    id: "categories",
    accessorKey: "categories",
    header: "Categories",
    enableSorting: false,
    cell: ({ row }) => {
      const categories = row.original.categories ?? []

      return (
        <div className="flex flex-wrap gap-1">
          {categories.slice(0, 2).map((cat, i) => (
            <Badge key={i} variant="outline">
              {cat}
            </Badge>
          ))}
          {categories.length > 2 && (
            <Badge variant="outline">+{categories.length - 2}</Badge>
          )}
        </div>
      )
    },
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
{
  id: "manageSubmissions",
  header: "Submissions",
  cell: ({ row }) => {
    const id = row.original._id || row.original._id
    return (
      <Link href={`/my-bounties/${id}/submissions`}>
        <Button variant="outline" size="sm">
          View
        </Button>
      </Link>
    )
  },
},

]
