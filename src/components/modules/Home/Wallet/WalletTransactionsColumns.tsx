import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { 
  IWalletTransaction, 
  TransactionStatus, 
  TransactionType 
} from "@/types/wallet.types"
import { DataTableFilterConfig } from "@/components/shared/table/DataTableFilters"


// ── Columns ────────────────────────────────────────────────────────────────

export const walletTransactionColumns: ColumnDef<IWalletTransaction>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as string
      return date 
        ? new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
        : "—"
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const taskTitle = row.original.task?.title
      const desc = row.getValue("description") as string
      return <span className="font-medium">{taskTitle ?? desc ?? "—"}</span>
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const type = row.original.type
      const amount = row.getValue("amount") as number
      const isCredit = type === TransactionType.credit
      
      // Note: Divide by 100 if your backend stores amounts in cents
      const display = `${isCredit ? "+" : "-"}$${Math.abs(amount / 100).toLocaleString("en-US", { minimumFractionDigits: 2 })}`

      return (
        <span className={cn("font-bold", isCredit ? "text-emerald-500" : "text-foreground")}>
          {display}
        </span>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const normalized = status?.toUpperCase()

      const map: Record<string, { label: string; className: string }> = {
        [TransactionStatus.completed]: {
          label: "Completed",
          className: "border-primary/40 bg-primary/10 text-primary hover:bg-primary/20",
        },
        [TransactionStatus.pending]: {
          label: "Pending",
          className: "border-amber-400/40 bg-amber-400/10 text-amber-500 hover:bg-amber-400/20",
        },
        [TransactionStatus.failed]: {
          label: "Failed",
          className: "border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20",
        },
      }

      const config = map[normalized] ?? {
        label: status,
        className: "border-border bg-muted text-muted-foreground",
      }

      return (
        <Badge 
          variant="outline" 
          className={cn("text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full", config.className)}
        >
          {config.label}
        </Badge>
      )
    },
  },
]
