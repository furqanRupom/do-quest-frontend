"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, Box, Plus } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { retriveBountiesAndTasks } from "@/services/bounty.service";
import { PaginationMeta } from "@/types/api.types";
import BountyCard from "./Browse/BountyCard";

const TrendingBounties: React.FC = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["browse-bounties", "trending"],
    queryFn: () => retriveBountiesAndTasks(""),
  });

  const tasks = data?.success ? data.data : [];
  const meta: PaginationMeta | undefined = data?.success ? data.meta : undefined;

  const isBusy = isLoading || isFetching;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Trending Bounties
            </h2>
            <p className="text-muted-foreground text-lg">
              The most sought-after missions in the ecosystem right now.
            </p>
          </div>

          <Link
            href="/browse"
            className="text-primary flex justify-center items-center hover:text-primary/80 group cursor-pointer"
          >
            View All
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Loading State */}
        {isBusy && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-xl bg-muted animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isBusy && tasks.length === 0 && (
          <div className="bg-card/40 backdrop-blur-sm border-2 border-dashed border-border rounded-2xl p-12 md:p-24 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-8 border border-border">
              <Box className="w-12 h-12 text-muted-foreground" />
            </div>

            <h3 className="text-2xl font-semibold mb-4">
              No active bounties in your region
            </h3>

            <p className="text-muted-foreground text-lg max-w-md mb-10 leading-relaxed">
              We're currently scaling our quest nodes. Be the first to ignite
              the marketplace by posting a new opportunity for the community.
            </p>
          <Link href="/post-bounty">
            <Button size="lg" className="glow-button cursor-pointer">
              <Plus className="w-4 h-4 mr-2" />
              Post Bounty
            </Button>
          </Link>
          </div>
        )}

        {/* Trending List */}
        {!isBusy && tasks.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.slice(0, 5).map((task) => (
              <BountyCard key={task._id} task={task} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingBounties;
