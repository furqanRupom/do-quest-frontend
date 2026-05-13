"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ITaskAndBounty, TaskStatus } from "@/types/bounty.types";
import { Clock, Bookmark, DollarSign } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ── Helpers ──────────────────────────────────────────────────────────────────

function getDaysLeft(deadline: string): number {
  return Math.ceil((new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
}

function formatBudget(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

// ── Status & Accent Config ───────────────────────────────────────────────────

const STATUS_CONFIG: Record<TaskStatus, { label: string; color: string; barColor: string }> = {
  PENDING: { label: "New Arrival", color: "bg-secondary/10 text-secondary border-secondary/30", barColor: "bg-secondary" },
  ACTIVE: { label: "Open", color: "bg-lime-500/10 text-lime-400 border-lime-500/30", barColor: "bg-lime-500" },
  COMPLETED: { label: "Completed", color: "bg-primary/10 text-primary border-primary/30", barColor: "bg-primary" },
  CANCELLED: { label: "Cancelled", color: "bg-muted text-muted-foreground border-border", barColor: "bg-muted-foreground" },
  DISPUTED: { label: "Disputed", color: "bg-destructive/10 text-destructive border-destructive/30", barColor: "bg-destructive" },
};

// ── Component ────────────────────────────────────────────────────────────────

const BountyCard = ({ task }: { task: ITaskAndBounty }) => {
  const daysLeft = getDaysLeft(task.deadline);
  const isExpired = daysLeft <= 0;
  const isExpiringSoon = !isExpired && daysLeft <= 2;
  const primaryCategory = task.categories[0] ?? "Uncategorized";
  const config = STATUS_CONFIG[task.status] || STATUS_CONFIG.ACTIVE;

  return (
    <Link href={`/browse/${task._id}`} className="block h-full group">
      <Card className={cn(
        "flex flex-col h-full relative overflow-hidden transition-all duration-300",
        "bg-card/40 backdrop-blur-xl border border-border/30",
        "hover:bg-card/60 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,245,255,0.2)]"
      )}>
        {/* Left Accent Bar */}
        <div className={cn("absolute left-0 top-0 bottom-0 w-1", config.barColor)} />

        <CardContent className="p-6 flex flex-col h-full">
          {/* Top Row: Status Badge & Bookmark */}
          <div className="flex justify-between items-start mb-6">
            <div className={cn("px-3 py-1 text-[10px] font-bold uppercase tracking-widest border", config.color)}>
              {config.label}
            </div>
            <Bookmark className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors cursor-pointer" />
          </div>

          {/* Title & Description */}
          <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 tracking-tight">
            {task.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-8 line-clamp-2">
            {task.description}
          </p>

          {/* Footer Section */}
          <div className="mt-auto space-y-4">
            {/* Reward & Time */}
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Bounty Reward</p>
                <p className="text-2xl font-bold text-primary tracking-tight">{formatBudget(task.budget)}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Time Left</p>
                <p className={cn(
                  "text-sm font-bold",
                  isExpired ? "text-destructive" : isExpiringSoon ? "text-amber-400" : "text-foreground"
                )}>
                  {isExpired ? "Expired" : `${daysLeft}d left`}
                </p>
              </div>
            </div>

            {/* Tech Tags */}
            {task.tags.length > 0 && (
              <div className="flex gap-2 pt-4 border-t border-border/30">
                {task.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-muted/50 border border-border/50 text-[10px] font-bold uppercase tracking-tighter text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BountyCard;
