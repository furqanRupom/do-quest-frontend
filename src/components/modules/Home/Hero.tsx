// components/hero.tsx
"use client"

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary/5 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="relative z-10">
          <Badge
            variant="outline"
            className="mb-6 px-3 py-1 border-primary/30 bg-primary/5 text-primary font-semibold tracking-wider uppercase text-xs"
          >
            <Sparkles className="w-3 h-3 mr-2" />
            New Frontier of Work
          </Badge>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-none tracking-tight">
            The Best Platform for{' '}
            <span className="text-transparent bg-clip-text bg-primary">
              Bounties
            </span>{' '}
            and Quests
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
            Discover high-stakes opportunities, contribute to cutting-edge protocols, and earn
            rewards in the digital meritocracy. Your skills are your currency.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">

            <Link href="/browse">
              <Button size="lg" className="group glow-button cursor-pointer">
                Browse Quests
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

            </Link>

            <Link href="/post-bounty">
            <Button
              size="lg"
              variant="outline"
              className="backdrop-blur-sm bg-background/40 border-primary/20 hover:border-primary/50 cursor-pointer"
            >
              Post New Bounty
            </Button>

            </Link>
          </div>
        </div>

        {/* Right Image Card */}
        <div className="relative z-10 hidden lg:block">
          <div className="bg-card/40 backdrop-blur-xl border border-border rounded-2xl p-2 shadow-2xl shadow-primary/10 rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl p-8 flex items-center justify-center h-[400px]">
              <div className="text-center">
                <Zap className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-2xl font-bold text-primary">Dashboard Preview</p>
                <p className="text-sm text-muted-foreground mt-2">Real-time bounty tracking</p>
              </div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-card/80 backdrop-blur-xl border border-border rounded-xl p-6 border-l-4 border-l-primary hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-bold">Latest Bounty</p>
                  <p className="text-primary text-sm font-semibold">$2,500 USDC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
