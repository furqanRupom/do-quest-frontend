// app/settings/payouts/page.tsx

import { PayoutsActivated } from "@/components/modules/Home/Settings/Payouts/PayoutsActivated";

interface PayoutsPageProps {
  // In Next.js 15+, searchParams is a Promise
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const PayoutsPage = async ({ searchParams }: PayoutsPageProps) => {
  // 1. Await the searchParams promise first
  const params = await searchParams;

  // 2. Now safely access the properties from the resolved object
  const success = typeof params.success === "string" ? params.success : null;
  const refresh = typeof params.refresh === "string" ? params.refresh : null;

  return (
    <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto w-full min-h-screen bg-background">
      <div className="mb-12 relative z-10">
        <h1 className="text-4xl font-black text-foreground text-center tracking-tight font-sans mb-2">
          Payout Status
        </h1>
        <p className="text-muted-foreground text-center">
          Manage your Stripe connection and payout status.
        </p>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <PayoutsActivated success={success} refresh={refresh} />
      </div>
    </main>
  );
};

export default PayoutsPage;
