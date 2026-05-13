import { ListFilter, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { IWalletTransaction, TransactionStatus, TransactionType } from "@/types/wallet.types";
import { PaginationMeta } from "@/types/api.types";
import { WalletTransactionsSkeleton } from "@/components/skeleton/WalletTransactionSkeleton";

interface WalletTransactionsProps {
  transactions: IWalletTransaction[];
  meta?: PaginationMeta | null;
  isLoading?: boolean;
}


function StatusBadge({ status }: { status: string }) {
  const normalized = status.toUpperCase();

  const map: Record<string, { label: string; className: string }> = {
    [TransactionStatus.completed]: {
      label: "Completed",
      className: "border-primary/40 bg-primary/10 text-primary hover:bg-primary/20",
    },
    [TransactionStatus.pending]: {
      label: "Pending",
      className: "border-secondary/40 bg-secondary/10 text-secondary hover:bg-secondary/20",
    },
    [TransactionStatus.failed]: {
      label: "Failed",
      className: "border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20",
    },
  };

  const config = map[normalized] ?? {
    label: status,
    className: "border-border bg-muted text-muted-foreground",
  };

  return (
    <Badge variant="outline" className={cn("text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full", config.className)}>
      {config.label}
    </Badge>
  );
}

export function WalletTransactions({ transactions, isLoading = false }: WalletTransactionsProps) {
  if (isLoading) {
    return <WalletTransactionsSkeleton />;
  }

  return (
    <Card className="bg-card border-border backdrop-blur-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border flex justify-between items-center bg-muted/50">
        <h3 className="text-xl font-black text-foreground font-sans tracking-tight">
          Transaction History
        </h3>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
          <ListFilter size={14} />
          Filter
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider px-8 py-5">Date</TableHead>
              <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider px-8 py-5">Description</TableHead>
              <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider px-8 py-5">Amount</TableHead>
              <TableHead className="text-muted-foreground text-xs font-semibold uppercase tracking-wider px-8 py-5">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-border">
            {transactions.map((tx, index) => {
              const isCredit = tx.type === TransactionType.credit;
              const amountDisplay = `${isCredit ? "+" : "-"}$${Math.abs(tx.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

              return (
                <TableRow key={index} className="border-border hover:bg-muted/50 transition-colors group">
                  <TableCell className="px-8 py-6 text-muted-foreground text-sm">
                    {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </TableCell>
                  <TableCell className="px-8 py-6 font-semibold text-foreground text-sm">
                    {tx.task?.title ?? tx.description ?? "—"}
                  </TableCell>
                  <TableCell className={cn("px-8 py-6 font-bold text-sm", isCredit ? "text-primary" : "text-foreground")}>
                    {amountDisplay}
                  </TableCell>
                  <TableCell className="px-8 py-6">
                    <StatusBadge status={tx.status} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="p-6 bg-muted/50 border-t border-border flex justify-center">
        <Button variant="ghost" className="text-primary font-bold hover:text-primary/80 hover:bg-transparent flex items-center gap-2 text-sm">
          View All Transactions
          <ArrowRight size={14} />
        </Button>
      </div>
    </Card>
  );
}
