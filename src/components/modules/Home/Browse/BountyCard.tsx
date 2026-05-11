"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ITaskAndBounty, TaskStatus } from "@/types/bounty.types";
import { Clock, DollarSign } from "lucide-react";
import Link from "next/link";

// ── Helpers ──────────────────────────────────────────────────────────────────

function getDaysLeft(deadline: string): number {
  return Math.ceil(
    (new Date(deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
}

function formatBudget(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

// ── Status Config ────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<TaskStatus, string> = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  COMPLETED: "bg-blue-50 text-blue-700 border-blue-200",
  CANCELLED: "bg-slate-100 text-slate-500 border-slate-200",
  DISPUTED: "bg-red-50 text-red-700 border-red-200",
};

// ── Component ────────────────────────────────────────────────────────────────

const BountyCard = ({ task }: { task: ITaskAndBounty }) => {
  const daysLeft = getDaysLeft(task.deadline);
  const isExpired = daysLeft <= 0;
  const primaryCategory = task.categories[0] ?? "Uncategorized";

  return (
    <Link href={`/browse/${task._id}`} className="block h-full group">
      <Card className="flex flex-col h-full hover:shadow-md transition-all duration-200 bg-white rounded-xl border border-border/60 hover:border-primary/30">
        <CardContent className="p-5 flex flex-col h-full">
          {/* Top Row: Category + Status | Budget */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs capitalize font-medium text-muted-foreground border-border/50 bg-muted/50">
                {primaryCategory}
              </Badge>
              <Badge variant="outline" className={`text-[10px] font-semibold border ${STATUS_STYLES[task.status]}`}>
                {task.status.charAt(0) + task.status.slice(1).toLowerCase()}
              </Badge>
            </div>
            <div className="flex items-center gap-0.5 text-primary font-bold text-lg">
              <DollarSign className="w-4 h-4" />
              {formatBudget(task.budget)}
            </div>
          </div>

          {/* Title & Description */}
          <h3 className="font-semibold text-base text-foreground mb-1.5 line-clamp-2 group-hover:text-primary transition-colors">
            {task.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
            {task.description}
          </p>

          {/* Tags */}
          {task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {task.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs bg-muted/60 text-muted-foreground px-2 py-0.5 rounded-full">
                  #{tag}
                </span>
              ))}
              {task.tags.length > 3 && (
                <span className="text-xs text-muted-foreground">+{task.tags.length - 3}</span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs text-muted-foreground mt-auto">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase">
                {task.user.name.charAt(0)}
              </span>
              <span>{task.user.name}</span>
            </div>
            <div className={`flex items-center gap-1 ${isExpired && task.status === "ACTIVE" ? "text-red-500 font-medium" : ""}`}>
              <Clock className="w-3.5 h-3.5" />
              {isExpired ? "Expired" : `${daysLeft}d left`}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BountyCard;
