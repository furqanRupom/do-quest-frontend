"use client"

import { Profile } from "@/types/profile.types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Mail,
  MapPin,
  Building2,
  Globe,
  Calendar,
  Shield,
  Key,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  ArrowUpRight,
  Circle,
  Pencil,
  Link2,
  Plus,
  CheckCircle,
  AlertCircle,
  Settings,
  Lock,
} from "lucide-react"
import Link from "next/link"

interface ProfileCardProps {
  profile: Profile
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  if (!profile) return null

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    })
  }

  const getSocialIcon = (link: string) => {
    const url = link.toLowerCase()
    if (url.includes("github")) return Github
    if (url.includes("twitter") || url.includes("x.com")) return Twitter
    if (url.includes("linkedin")) return Linkedin
    if (url.includes("instagram")) return Instagram
    if (url.includes("youtube")) return Youtube
    return Globe
  }

  const getSocialPlatform = (link: string) => {
    const url = link.toLowerCase()
    if (url.includes("github")) return "GitHub"
    if (url.includes("twitter") || url.includes("x.com")) return "Twitter / X"
    if (url.includes("linkedin")) return "LinkedIn"
    if (url.includes("instagram")) return "Instagram"
    if (url.includes("youtube")) return "YouTube"
    return "Website"
  }

  // Glass Panel Wrapper
  const GlassPanel = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-card/80 backdrop-blur-xl border border-border/30 rounded-xl p-6 shadow-lg ${className}`}>
      {children}
    </div>
  )

  return (
    <div className="min-h-screen bg-transparent py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* =========================================
            LEFT COLUMN - Identity & Account Details
            ========================================= */}
        <section className="lg:col-span-8 space-y-6">
          
          {/* Identity Card */}
          <div className="relative overflow-hidden bg-card/80 backdrop-blur-xl border border-border/30 rounded-xl p-8 shadow-lg">
            {/* Left Accent Bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
            
            <div className="flex flex-col md:flex-row items-center gap-8 pl-4">
              {/* Avatar Section */}
              <div className="relative group shrink-0">
                <Avatar className="h-40 w-40 rounded-xl ring-2 ring-primary/30 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.name}`} />
                  <AvatarFallback className="text-5xl bg-muted text-muted-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Info Section */}
              <div className="flex-grow text-center md:text-left">
                <div className="mb-4">
                  <Badge variant="outline" className="font-bold text-primary bg-primary/10 border-primary/20 px-3 py-1 text-xs uppercase tracking-widest">
                    {profile.role}
                  </Badge>
                </div>
                <h2 className="text-3xl font-bold text-foreground tracking-tight mb-1">{profile.name}</h2>
                <p className="text-lg text-muted-foreground font-mono mb-6">@{profile.username}</p>

                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 px-4 py-2 rounded-lg border border-border/50 text-sm">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>{profile.email}</span>
                  </div>
                  {profile.location && (
                    <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 px-4 py-2 rounded-lg border border-border/50 text-sm">
                      <MapPin className="h-4 w-4 text-secondary" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  {profile.company && (
                    <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 px-4 py-2 rounded-lg border border-border/50 text-sm">
                      <Building2 className="h-4 w-4 text-secondary" />
                      <span>{profile.company}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Account Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Account Metadata */}
            <GlassPanel>
              <div className="flex items-center gap-3 border-b border-border/50 pb-4 mb-4">
                <Settings className="h-5 w-5 text-secondary" />
                <h3 className="text-lg font-bold text-foreground">Account Metadata</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Joined At</span>
                  <span className="text-sm font-medium text-foreground">{formatDate(profile.createdAt)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Last Updated</span>
                  <span className="text-sm font-medium text-foreground">{formatDate(profile.updatedAt)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Platform Role</span>
                  <div className="flex items-center gap-2 text-primary">
                    <Shield className="h-4 w-4" />
                    <span className="text-sm font-bold">{profile.role}</span>
                  </div>
                </div>
              </div>
            </GlassPanel>

            {/* Security & Payouts */}
            <GlassPanel>
              <div className="flex items-center gap-3 border-b border-border/50 pb-4 mb-4">
                <Lock className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Security & Payouts</h3>
              </div>
              <div className="space-y-4">
                {/* Stripe Payouts Status */}
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Stripe Connect</span>
                  {profile.payoutsEnabled ? (
                    <span className="flex items-center gap-1.5 text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tighter">
                      <CheckCircle className="h-3 w-3" />
                      Enabled
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-destructive bg-destructive/10 border border-destructive/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tighter">
                      <AlertCircle className="h-3 w-3" />
                      Setup Required
                    </span>
                  )}
                </div>

                {/* Security/Password Status */}
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Security Status</span>
                  {profile.needPasswordChange ? (
                    <span className="flex items-center gap-1.5 text-destructive bg-destructive/10 border border-destructive/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tighter">
                      <AlertCircle className="h-3 w-3" />
                      Update Needed
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-tighter">
                      <CheckCircle className="h-3 w-3" />
                      Secured
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">2FA Status</span>
                  <span className="text-sm font-medium text-foreground">Active</span>
                </div>
              </div>
            </GlassPanel>
          </div>
        </section>

        {/* =========================================
            RIGHT COLUMN - Connections & Stats
            ========================================= */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Connected Accounts */}
          <div className="relative overflow-hidden bg-card/80 backdrop-blur-xl border border-border/30 rounded-xl p-6 shadow-lg">
            {/* Top Gradient Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />
            
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-foreground">Connections</h3>
              <Link2 className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="space-y-3">
              {profile.socialLinks && profile.socialLinks.length > 0 ? (
                profile.socialLinks.map((link, index) => {
                  const Icon = getSocialIcon(link)
                  const platform = getSocialPlatform(link)

                  return (
                    <a
                      key={index}
                      href={link.startsWith("http") ? link : `https://${link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-lg border border-border/30 bg-card/60 hover:bg-card hover:border-primary/40 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                          <Icon className="h-5 w-5 text-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">{platform}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[120px]">
                            {link.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                          </p>
                        </div>
                      </div>
                      <CheckCircle className="h-5 w-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )
                })
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No accounts linked.</p>
              )}

              {/* Connect New Button */}
              <Link className="cursor-pointer" href="/settings">
              <Button 
                variant="outline"
                className="w-full mt-4 flex items-center justify-center gap-2 py-6 rounded-lg border-2 border-dashed border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all font-bold uppercase tracking-widest text-xs"
              >
                <Plus className="h-4 w-4" />
                Link New Platform
              </Button>
            </Link>
            </div>
          </div>

          {/* Ecosystem Influence / Stats */}
          <div className="bg-gradient-to-br from-card/80 to-primary/5 backdrop-blur-xl border border-primary/10 rounded-xl p-6 shadow-lg">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
              Ecosystem Influence
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-background/20 rounded-lg border border-border/20">
                <p className="text-2xl font-black text-primary font-sans tracking-tight">124</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Quests Won</p>
              </div>
              <div className="p-4 bg-background/20 rounded-lg border border-border/20">
                <p className="text-2xl font-black text-secondary font-sans tracking-tight">98%</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Reliability</p>
              </div>
            </div>
          </div>

        </aside>
      </div>
    </div>
  )
}

export default ProfileCard
