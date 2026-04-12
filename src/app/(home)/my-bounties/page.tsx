import MyBounties from "@/components/modules/MyBounties/MyBounties";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Do.Quest | My Bounties",
    description: "Do my bounties page",
};
const myBountiesPage = () => {
    return <><MyBounties /></>
}
export default myBountiesPage