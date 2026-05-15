import SubmitBountyForm from '@/components/modules/Home/Submissions/SubmitBountyForm';
import { getBountyDetailsAction } from '../../browse/[id]/_action';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: "Submit Bounty - Do.Quest",
  description: "Submit Bounty page"
};

interface SubmitBountyProps {
  params: Promise<{ id: string }>;
}

const submitBountyPage = async ({ params }: SubmitBountyProps) => {
  const { id } = await params;
  
  let bounty = null;
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
          <Link href="/bounties">← Back to Bounties</Link>
        </Button>
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-destructive">
          {errorMessage || "Bounty not found"}
        </div>
      </section>
    );
  }

  return <SubmitBountyForm id={id} bounty={bounty} />;
};

export default submitBountyPage;
