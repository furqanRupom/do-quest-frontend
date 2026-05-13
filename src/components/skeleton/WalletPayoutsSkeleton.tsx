import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function WalletPayoutsSkeleton() {
  return (
    <div className="mb-16">
      <Card className="bg-card border-border backdrop-blur-xl">
        <CardContent className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <Skeleton className="w-12 h-12 rounded-full flex-shrink-0 mt-1" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
          <div className="pt-4 border-t border-border space-y-4">
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
