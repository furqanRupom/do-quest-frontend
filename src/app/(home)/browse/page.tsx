import BrowseBounties from "@/components/modules/Browse/BrowseBounties";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Do.Quest | Browse",
    description: "Do quests browse page",
};

const browsepage = () => {
    return <><BrowseBounties /></>
}

export default browsepage