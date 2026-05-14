import PostBountyForm from "@/components/modules/Home/PostBounty/PostBountyForm";
import { Metadata } from "next";

export const metadata:Metadata = {
  title:"Post Bounty - Do.Quest",
  description:"Post Bounty Page"
}
const postBountyPage = () => {
  return <section className=" min-h-screen"><PostBountyForm /></section>
}
export default postBountyPage;
