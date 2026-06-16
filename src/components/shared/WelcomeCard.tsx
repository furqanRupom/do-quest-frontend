"use client"
import { userDashboardMetaData } from "@/services/dashboard.service"
import { ApiResponse } from "@/types/api.types"
import { IUserMetaResponse } from "@/types/dashboard.types"
import { useQuery } from "@tanstack/react-query"
import { Target, FileCheck, DollarSign, Play } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface WelcomeCardProps {
  name: string
}

export default function WelcomeCard({ name }: WelcomeCardProps) {
  const { data: metaRes } = useQuery({
    queryKey: ["user-dashboard-meta"],
    queryFn: userDashboardMetaData,
    refetchOnWindowFocus: "always",
  })

  const meta = metaRes as ApiResponse<IUserMetaResponse>
  const bounties = meta?.data?.owner?.totalTasks ?? 0
  const submissions = meta?.data?.worker?.totalSubmissions ?? 0
  const earnings = meta?.data?.wallet?.totalEarnings ?? 0

  const stats = [
    {
      label: "Active bounties",
      value: bounties,
      icon: <Target size={20} />,
      iconCn: "bg-primary/10 text-primary",
      valueCn: "text-primary",
    },
    {
      label: "Submissions",
      value: submissions,
      icon: <FileCheck size={20} />,
      iconCn: "bg-blue-500/10 text-blue-500",
      valueCn: "text-blue-500",
    },
    {
      label: "Total earnings",
      value: `$${earnings.toLocaleString()}`,
      icon: <DollarSign size={20} />,
      iconCn: "bg-green-500/10 text-green-500",
      valueCn: "text-green-500",
    },
  ]

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-8 overflow-hidden rounded-2xl bg-card border border-border px-10 py-10 ">
      {/* Soft glow accent */}
      <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-primary/5" />

      {/* Left — greeting */}
      <div className="relative min-w-0">

        <h2 className="text-3xl font-semibold text-foreground leading-snug mb-2.5">
          Hello, <span className="text-primary">{name}</span> 
          <br />
          Welcome back.
        </h2>

        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-6">
          Check out your current analysis — track your bounties, monitor
          submissions, and review earnings all in one place.
        </p>

        <Link
          href="/browse"
          className="inline-flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
        >
          <Play size={13} />
          Explore bounties
        </Link>
      </div>

      {/* Right — stats */}
      <div className="relative flex  gap-3 ">
        {stats.map(({ label, value, icon, iconCn, valueCn }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-2xl border border-border bg-muted/50 px-5 py-4"
          >
            <div className={cn("flex size-11 items-center justify-center rounded-xl shrink-0", iconCn)}>
              {icon}
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">
                {label}
              </p>
              <p className={cn("text-xl font-semibold", valueCn)}>{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
