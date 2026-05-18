"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  FileText,
  ListChecks,
  CheckCircle2,
  Upload,
  Clock,
  DollarSign,
  Network,
  Shield,
  Cpu,
  BookOpen,
  FileCode2,
  Coins,
  type LucideIcon,
} from "lucide-react";
import type { ITaskAndBounty } from "@/types/bounty.types";

/* ================================================================
   Helper Mapping for Icons based on Tag/Category string
   ================================================================ */
const ICON_MAP: Record<string, LucideIcon> = {
  solidity: FileCode2,
  rust: Cpu,
  web3: Network,
  security: Shield,
  documentation: BookOpen,
  smartcontracts: FileCode2,
  token: Coins,
  payments: DollarSign,
};

function getTagIcon(key: string): LucideIcon {
  const lowerKey = key.toLowerCase().replace(/[\s-]/g, "");
  return ICON_MAP[lowerKey] || CheckCircle2;
}

/* ================================================================
   Utility Functions
   ================================================================ */
function getTimeRemaining(deadline: string): string {
  const diff = new Date(deadline).getTime() - Date.now();
  if (diff <= 0) return "Expired";
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h`;
  return "< 1h";
}

function formatViews(count?: number): string {
  if (!count) return "0";
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count);
}

/* ================================================================
   Component Props
   ================================================================ */
interface BountyDetailsProps {
  bounty: ITaskAndBounty;
  backHref?: string;
}

/* ================================================================
   Component
   ================================================================ */
export default function BountyDetails({
  bounty,
  backHref = "/browse",
}: BountyDetailsProps) {
  const isOpen = bounty.status === "PENDING" || bounty.status === "ACTIVE";

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground ">
      <main className="mx-auto w-full max-w-7xl flex-grow px-6 pb-20 pt-20">
        {/* Back */}
        <Link
          href="/browse"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Bounties
        </Link>

        {/* ── Hero ── */}
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            {isOpen && (
              <Badge
                variant="outline"
                className="border-primary/30 bg-primary/10 px-3 py-1 font-['Space_Grotesk'] text-[11px] font-semibold uppercase tracking-widest text-primary"
              >
                Active Bounty
              </Badge>
            )}
            <span className="text-muted-foreground/50">•</span>
            <span className="font-['Space_Grotesk'] text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              {bounty.categories?.[0] || "Protocol Infrastructure"}
            </span>
          </div>

          <h1 className="font-['Space_Grotesk'] mb-6 max-w-4xl text-2xl font-bold leading-[1.1] tracking-tight md:text-3xl lg:text-5xl">
            {bounty.title}
          </h1>

          <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-primary" />
              <div>
                <p className="font-['Space_Grotesk'] text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Reward Pool
                </p>
                <p className="font-['Space_Grotesk'] text-2xl font-semibold">
                  {bounty.budget.toLocaleString()} $
                </p>
              </div>
            </div>

            <div className="h-10 w-px bg-border" />

            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-destructive" />
              <div>
                <p className="font-['Space_Grotesk'] text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Time Remaining
                </p>
                <p className="font-['Space_Grotesk'] text-2xl font-semibold">
                  {getTimeRemaining(bounty.deadline)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* ── Left Column ── */}
          <div className="space-y-8 lg:col-span-8">
            {/* Overview */}
            <Card className="relative overflow-hidden border shadow-sm backdrop-blur-md bg-card/80">
              <div className="absolute left-0 top-0 h-full w-1 bg-primary" />
              <CardHeader>
                <CardTitle className="font-['Space_Grotesk'] flex items-center gap-3 text-2xl font-semibold">
                  <FileText className="h-7 w-7 text-primary" />
                  Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                {bounty.description.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </CardContent>
            </Card>

            {/* Success Requirements */}
            {bounty.successRequirements?.length > 0 && (
              <Card className="border shadow-sm backdrop-blur-md bg-card/80">
                <CardHeader>
                  <CardTitle className="font-['Space_Grotesk'] flex items-center gap-3 text-2xl font-semibold">
                    <ListChecks className="h-7 w-7 text-primary" />
                    Success Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {bounty.successRequirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                        <p className="text-[15px] leading-relaxed text-muted-foreground">
                          {req}
                        </p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Attachments */}
            {bounty.attachments && (
              <Card className="border shadow-sm backdrop-blur-md bg-card/80">
                <CardHeader>
                  <CardTitle className="font-['Space_Grotesk'] flex items-center gap-3 text-2xl font-semibold">
                    <Upload className="h-7 w-7 text-primary" />
                    Attachments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href={bounty.attachments}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary transition-colors hover:text-primary/80 hover:underline"
                  >
                    <FileText className="h-4 w-4" />
                    View Attachment
                  </a>
                </CardContent>
              </Card>
            )}
          </div>

          {/* ── Right Column / Sidebar ── */}
          <aside className="lg:col-span-4">
            <Card className="sticky top-32 border border-primary/20 shadow-sm backdrop-blur-xl bg-card/90">
              <CardContent className="space-y-8 p-8">
                {/* Status & Payment Status */}
                <div className="flex items-center justify-between border-b pb-6">
                  <div>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Status
                    </p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${isOpen ? "animate-pulse bg-primary" : "bg-muted-foreground"
                          }`}
                      />
                      <span className="font-bold">{isOpen ? "Open" : bounty.status}</span>
                    </div>
                  </div>
                </div>

                {/* Skills / Tags */}
                {bounty.tags?.length > 0 && (
                  <div>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Skills Required
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {bounty.tags.map((tag, i) => {
                        const Icon = getTagIcon(tag);
                        return (
                          <Badge key={i} variant="outline" className="gap-1.5 border-primary/30 bg-primary/5 text-primary">
                            <Icon className="h-3 w-3" />
                            {tag}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Categories */}
                {bounty.categories?.length > 0 && (
                  <div>
                    <p className="mb-3 font-['Space_Grotesk'] text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      Categories
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {bounty.categories.map((cat, i) => (
                        <Badge key={i} variant="default">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div className="space-y-4 rounded-md border bg-muted/50 p-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Max Submissions</span>
                    <span className="font-bold">{bounty.maxSubmissions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Payment Flow</span>
                    <span className="font-bold text-secondary">{bounty.paymentFlowStatus}</span>
                  </div>
                  {bounty.user && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Quest Master</span>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={bounty.user.username} alt={bounty.user.name} />
                          <AvatarFallback className="bg-primary/20 text-[10px] text-primary">
                            {bounty.user.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-bold text-primary">{bounty.user.name}</span>
                      </div>
                    </div>
                  )}
                </div>
                {
                  isOpen ?

                    <Link href={`/submissions/${bounty._id}`}>

                      {/* Submit Button */}
                      <Button
                        disabled={!isOpen}
                        className="h-14 w-full cursor-pointer bg-primary text-lg font-black uppercase tracking-tighter text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.3)] transition-all hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] active:scale-[0.98] disabled:opacity-70"
                      >
                        Submit Bounty
                      </Button>
                    </Link>

                    :
                    <Button
                      disabled={!isOpen}
                      className="h-14 w-full cursor-pointer bg-primary text-lg font-black uppercase tracking-tighter text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.3)] transition-all hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] active:scale-[0.98] disabled:opacity-70"
                    >
                      Bounty Closed
                    </Button>

                }

              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

    </div>
  );
}
