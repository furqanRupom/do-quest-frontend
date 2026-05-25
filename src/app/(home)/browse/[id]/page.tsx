import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { getBountyDetailsAction } from "./_action";
import { ITaskAndBounty } from "@/types/bounty.types";
import BountyDetails from "@/components/modules/Home/Browse/BountyDetails";

export const metadata: Metadata = {
  title: "Bounty Details - Do.Quest",
  description: "View bounty details and requirements",
};

interface Props {
  params: Promise<{ id: string }>;
}

const BountyDetailsPage = async ({ params }: Props) => {
  const { id } = await params;

  let bounty: ITaskAndBounty | null = null;
  let errorMessage = "";

  try {
    const result = await getBountyDetailsAction(id);

    if (result?.success === true && "data" in result && result.data) {
      bounty = result.data;
    } else {
      errorMessage = result?.message || "Failed to load bounty details";
    }
  } catch (error: any) {
    errorMessage = error?.message || "Something went wrong while fetching the bounty";
    console.error("Bounty fetch error:", error);
  }
  if (!bounty) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-8">
        <Button asChild variant="outline" className="mb-6">
          <Link href="/browse">← Back to Bounties</Link>
        </Button>
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-destructive">
          {errorMessage || "Bounty not found"}
        </div>
      </section>
    );
  }

  // Directly pass the bounty data. No mapping needed!
  return <BountyDetails bounty={bounty} backHref="/browse" />;
};

export default BountyDetailsPage;
