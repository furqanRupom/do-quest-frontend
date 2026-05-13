import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function WalletTransactionsSkeleton() {
  return (
    <Card className="bg-card border-border backdrop-blur-xl overflow-hidden">
      <div className="p-6 border-b border-border flex justify-between items-center bg-muted/50">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-8 w-20" />
      </div>
      <div className="p-8 space-y-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        ))}
      </div>
      <div className="p-6 bg-muted/50 border-t border-border flex justify-center">
        <Skeleton className="h-6 w-48" />
      </div>
    </Card>
  );
}
