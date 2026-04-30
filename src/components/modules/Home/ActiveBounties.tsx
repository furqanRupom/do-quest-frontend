// components/trending-bounties.tsx
"use client"

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Box, Plus } from 'lucide-react';

const TrendingBounties: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Trending Bounties</h2>
            <p className="text-muted-foreground text-lg">
              The most sought-after missions in the ecosystem right now.
            </p>
          </div>
          <Button variant="ghost" className="text-primary hover:text-primary/80 group">
            View All
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
        
        {/* Empty State */}
        <div className="bg-card/40 backdrop-blur-sm border-2 border-dashed border-border rounded-2xl p-12 md:p-24 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-8 border border-border">
            <Box className="w-12 h-12 text-muted-foreground" />
          </div>
          
          <h3 className="text-2xl font-semibold mb-4">
            No active bounties in your region
          </h3>
          
          <p className="text-muted-foreground text-lg max-w-md mb-10 leading-relaxed">
            We're currently scaling our quest nodes. Be the first to ignite the marketplace 
            by posting a new opportunity for the community.
          </p>
          
          <Button size="lg" className="glow-button">
            <Plus className="w-4 h-4 mr-2" />
            Post Bounty
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrendingBounties;
