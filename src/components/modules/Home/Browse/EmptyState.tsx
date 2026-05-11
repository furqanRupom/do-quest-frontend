"use client";

import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
      <Search className="w-7 h-7 text-muted-foreground" />
    </div>
    <h3 className="font-semibold text-foreground mb-1">No bounties found</h3>
    <p className="text-sm text-muted-foreground mb-6">
      Try adjusting your filters or be the first to post one!
    </p>
    <Button className="gap-2" asChild>
      <Link href="/post-bounty">
        <Plus className="w-4 h-4" />
        Post a Bounty
      </Link>
    </Button>
  </div>
);

export default EmptyState;
