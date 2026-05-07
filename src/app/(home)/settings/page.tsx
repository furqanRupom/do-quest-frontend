import Settings from "@/components/modules/Home/Settings/Settings";
import { getUserInfo } from "@/services/auth.service";
import { Metadata } from "next";

export const metadata:Metadata = {
  title:"Settings - Do.Quest",
  description:"User Settings Page"
}

const settingsPage =  async() => {
  const userProfile = await getUserInfo()
  return <><Settings profile={userProfile} /></>
}

export default settingsPage
