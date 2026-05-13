import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function WalletStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="relative overflow-hidden bg-card border-border backdrop-blur-xl">
          <div className="absolute top-0 left-0 w-[3px] h-full bg-muted" />
          <CardContent className="p-8 space-y-4">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-36" />
            <Skeleton className="h-3 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
