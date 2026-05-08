import ProfileCard from "@/components/modules/Home/Profile/Profile"
import { getUserInfo } from "@/services/auth.service"
import { Metadata } from "next"

export const metadata:Metadata = {
  "title":"Profile - Do.Quest",
  "description":"User Profile page"
}

const profilePage = async () => {
  const user = await getUserInfo()
  return <ProfileCard profile={user}/>

}
export default profilePage
