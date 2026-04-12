import Wallet from "@/components/modules/Wallet/Wallet";
import { Metadata } from "next";

export const metadata: Metadata = {
    title:"Do.Quest | Wallet",
    description:"Do quests wallet page"
};
const walletpage = () => {
    return <><Wallet /></>
}
export default walletpage