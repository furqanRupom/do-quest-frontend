"use client"

import { Profile } from "@/types/profile.types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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
  Circle
} from "lucide-react"

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
    if (url.includes("twitter") || url.includes("x.com")) return "Twitter"
    if (url.includes("linkedin")) return "LinkedIn"
    if (url.includes("instagram")) return "Instagram"
    if (url.includes("youtube")) return "YouTube"
    return "Website"
  }

  return (
    // Page background: transparent
    <div className="min-h-screen bg-transparent py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

        {/* Left Column - Profile Card */}
        <div className="lg:col-span-2 bg-white rounded-3xl border shadow-sm p-8 lg:p-10 flex flex-col items-center text-center space-y-8">
          <Avatar className="h-36 w-36 lg:h-40 lg:w-40 ring-1 ring-gray-100 shrink-0">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${profile.name}`} />
            <AvatarFallback className="text-4xl lg:text-5xl bg-gray-100 text-gray-500">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-4 w-full">
            <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight text-gray-900 truncate">
              {profile.name}
            </h1>
            
            <p className="text-lg text-gray-400 font-mono">@{profile.username}</p>

            <div className="flex flex-wrap justify-center gap-2 pt-1">
              <Badge variant="secondary" className="font-normal text-sm bg-gray-100 text-gray-700 hover:bg-gray-100 px-3 py-1">
                {profile.role}
              </Badge>
              {profile.needPasswordChange && (
                <Badge variant="outline" className="font-normal text-sm border-red-200 text-red-600 bg-red-50 px-3 py-1">
                  <Circle className="w-1.5 h-1.5 fill-red-500 mr-1.5" />
                  Update password
                </Badge>
              )}
            </div>
          </div>

          <div className="w-full border-t pt-8 space-y-5">
            <div className="flex items-center gap-4 text-gray-600">
              <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
              <span className="text-base truncate">{profile.email}</span>
            </div>
            
            {profile.location && (
              <div className="flex items-center gap-4 text-gray-600">
                <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <span className="text-base">{profile.location}</span>
              </div>
            )}
            
            {profile.company && (
              <div className="flex items-center gap-4 text-gray-600">
                <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-gray-400" />
                </div>
                <span className="text-base">{profile.company}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Details & Connections */}
        <div className="lg:col-span-3 flex flex-col gap-8">
          
          {/* Connected Accounts Card */}
          {profile.socialLinks && profile.socialLinks.length > 0 && (
            <div className="bg-white rounded-3xl border shadow-sm p-8 space-y-5">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest px-1">
                Connected accounts
              </h3>
              <div className="divide-y divide-gray-100 rounded-2xl border border-gray-100 overflow-hidden">
                {profile.socialLinks.map((link, index) => {
                  const Icon = getSocialIcon(link)
                  const platform = getSocialPlatform(link)

                  return (
                    <a
                      key={index}
                      href={link.startsWith("http") ? link : `https://${link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-5 px-6 py-5 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gray-50 group-hover:bg-white flex items-center justify-center shrink-0 transition-colors">
                        <Icon className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-medium text-gray-800">{platform}</p>
                        <p className="text-sm text-gray-400 truncate mt-0.5">
                          {link.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                        </p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-transparent group-hover:text-gray-400 transition-colors" />
                    </a>
                  )
                })}
              </div>
            </div>
          )}

          {/* Account Details Card */}
          <div className="bg-white rounded-3xl border shadow-sm p-8 space-y-6">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest px-1">
              Account details
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  label: "Member since",
                  value: formatDate(profile.createdAt),
                  icon: Calendar
                },
                {
                  label: "Last updated",
                  value: formatDate(profile.updatedAt),
                  icon: Calendar
                },
                {
                  label: "Role",
                  value: profile.role,
                  icon: Shield
                },
                {
                  label: "Password",
                  value: profile.needPasswordChange ? "Update needed" : "Current",
                  icon: Key,
                  muted: profile.needPasswordChange
                }
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-gray-50 rounded-2xl p-6 lg:p-7 space-y-3"
                >
                  <div className="flex items-center gap-2 text-gray-400">
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <p className={`text-lg lg:text-xl font-medium capitalize leading-snug ${item.muted ? "text-red-600" : "text-gray-800"}`}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProfileCard
