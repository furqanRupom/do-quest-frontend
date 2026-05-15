"use client"

import { ShieldCheck, Info, ExternalLink, Landmark, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { stripeDashboard, stripeOnBoarding } from "@/services/stripe.service";
import { Profile } from "@/types/profile.types";
import { WalletPayoutsSkeleton } from "@/components/skeleton/WalletPayoutsSkeleton";

interface WalletPayoutsProps {
  profile: Profile;
  isLoading?: boolean;
}


export function WalletPayouts({ profile, isLoading = false }: WalletPayoutsProps) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => stripeOnBoarding(),
    onSuccess: (data) => {
      if (data?.data?.url) {
        window.location.href = data?.data.url;
      }
    },
  });

  const { mutateAsync: stripeMutateAsync, isPending: stripeIsPending } = useMutation({
    mutationFn: () => stripeDashboard(),
    onSuccess: (data) => {
      if (data?.data?.url) {
        window.location.href = data?.data.url;
      }
    },
  });

  const handleSetup = async () => {
    try {
      await mutateAsync();
    } catch (error) {
      console.error("Failed to start Stripe onboarding", error);
    }
  };

  const handleStripeDashboard = async () => {
    try {
      await stripeMutateAsync();
    } catch (error) {
      console.error("Failed to start stripe dashboard", error);
    }
  };

  if (isLoading) {
    return <WalletPayoutsSkeleton />;
  }

  const isPayoutsEnabled = profile?.payoutsEnabled === true;

  return (
    <div className="mb-16">
      <Card className="bg-card border-border backdrop-blur-xl">
        <CardContent className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <Landmark size={24} className="text-primary" />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-black text-foreground font-sans tracking-tight">
                Payouts
              </h2>
              <p className="text-muted-foreground mt-1">
                {isPayoutsEnabled
                  ? "Your Stripe account is connected and ready to receive payouts."
                  : "Connect your bank account via Stripe to receive bounty payouts."}
              </p>
            </div>
          </div>

          {isPayoutsEnabled ? (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
              <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-500">
                <ShieldCheck size={20} />
                <span className="font-semibold">Payouts Active</span>
              </div>

              <Button 
                size="lg" 
                className="cursor-pointer font-bold shadow-lg shadow-primary/20 flex items-center gap-2"
                onClick={handleStripeDashboard}
                disabled={stripeIsPending}
              >
                {stripeIsPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <ExternalLink size={16} />}
                Go to Stripe Dashboard
              </Button>
            </div>
          ) : (
            <div className="space-y-5">
              <Alert className="bg-primary/10 border border-primary/30 text-primary">
                <Info size={14} className="text-primary" />
                <AlertDescription className="font-semibold">
                  Stripe Setup Required
                </AlertDescription>
              </Alert>

              <p className="text-muted-foreground leading-relaxed">
                Your payouts are securely processed by Stripe. Complete a quick onboarding to start receiving money directly to your bank account.
              </p>

              <Button 
                size="lg" 
                className="font-bold shadow-lg shadow-primary/20 w-full sm:w-auto flex items-center gap-2 cursor-pointer"
                onClick={handleSetup}
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ExternalLink size={16} />
                )}
                Complete Stripe Setup
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
