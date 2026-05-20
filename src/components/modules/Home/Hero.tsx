"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Rocket } from "lucide-react";
import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 pb-20 overflow-hidden bg-background">

      {/* Background grid (like HTML) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none
        bg-[linear-gradient(to_right,rgba(0,220,229,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,220,229,0.05)_1px,transparent_1px)]
        bg-[size:40px_40px]"
      />

      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />

      {/* Scanline effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-[scan_6s_linear_infinite]" />
      </div>

      {/* Badge */}
      <Badge
        variant="outline"
        className="mb-8 px-4 py-1 border-cyan-500/30 text-cyan-400 tracking-widest uppercase"
      >
        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse" />
        Genesis Protocol Active
      </Badge>

      {/* Heading */}
      <div className="text-center max-w-4xl space-y-6 relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
          The Frontier of{" "}
          <span className="bg-gradient-to-r from-primary via-primary to-primary bg-clip-text text-transparent">
            Digital Meritocracy
          </span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
          Join thousands of creators and earn from your skills. DoQuest bridges the gap between rugged engineering and modern bounty-driven development.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 mt-10 relative z-10">

        <Link href="/browse" >
          <Button size="lg" className="group bg-primary text-black hover:bg-primary/80 cursor-pointer">
            Browse Quests
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition" />
          </Button>

        </Link>
        <Link href="/post-bounty">
          <Button
            size="lg"
            variant="outline"
            className="border-white/10 bg-white/5 backdrop-blur hover:border-cyan-400 cursor-pointer"
          >
            Post a Quest
          </Button>
        </Link>
      </div>

      {/* Stats Grid (HTML identical structure) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-20 text-center relative z-10">

        <div>
          <p className="text-2xl font-bold">12.4K+</p>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Active Questers
          </p>
        </div>

        <div>
          <p className="text-2xl font-bold">$2.8M</p>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Bounties Paid
          </p>
        </div>

        <div>
          <p className="text-2xl font-bold">48h</p>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Avg. Completion
          </p>
        </div>

        <div>
          <p className="text-2xl font-bold">99.9%</p>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Uptime Metric
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 flex flex-col items-center opacity-40">
        <p className="text-xs tracking-[0.3em] uppercase">Scroll to Explore</p>
        <div className="w-px h-12 bg-gradient-to-b from-cyan-400 to-transparent mt-3" />
      </div>

    </section>
  );
};

export default Hero;
