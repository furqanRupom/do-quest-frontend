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
