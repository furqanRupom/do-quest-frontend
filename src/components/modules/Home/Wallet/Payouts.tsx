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
      if (data?.data?.url) window.location.href = data.data.url;
    },
  });

  const { mutateAsync: stripeMutateAsync, isPending: stripeIsPending } = useMutation({
    mutationFn: () => stripeDashboard(),
    onSuccess: (data) => {
      if (data?.data?.url) window.location.href = data.data.url;
    },
  });

  const handleSetup = async () => {
    try { await mutateAsync(); } catch (error) { console.error(error); }
  };

  const handleStripeDashboard = async () => {
    try { await stripeMutateAsync(); } catch (error) { console.error(error); }
  };

  if (isLoading) return <WalletPayoutsSkeleton />;

  const isPayoutsEnabled = profile?.payoutsEnabled === true;

  return (
    <div className="mb-8">   {/* Reduced margin */}
      <Card className="bg-card border-border backdrop-blur-xl h-full">
        <CardContent className="p-2">   {/* Reduced from p-8 */}
          <div className="flex items-start gap-4 mb-5">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <Landmark size={22} className="text-primary" />   {/* Smaller icon */}
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground tracking-tight">   {/* Smaller heading */}
                Payouts
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                {isPayoutsEnabled
                  ? "Your Stripe account is connected and ready."
                  : "Connect your bank account via Stripe"}
              </p>
            </div>
          </div>

          {isPayoutsEnabled ? (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-border">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500">
                <ShieldCheck size={18} />
                <span className="font-semibold">Payouts Active</span>
              </div>

              <Button 
                size="default" 
                className="font-bold shadow-lg cursor-pointer shadow-primary/20 flex items-center gap-2"
                onClick={handleStripeDashboard}
                disabled={stripeIsPending}
              >
                {stripeIsPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <ExternalLink size={16} />}
                Stripe Dashboard
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Alert className="bg-primary/10 border border-primary/30 text-primary">
                <Info size={14} className="text-primary" />
                <AlertDescription className="font-semibold text-sm">
                  Stripe Setup Required
                </AlertDescription>
              </Alert>

              <p className="text-muted-foreground text-sm leading-relaxed">
                Complete a quick setup to receive bounty payouts directly to your bank.
              </p>

              <Button 
                size="default"
                className="font-bold cursor-pointer shadow-lg shadow-primary/20 w-full sm:w-auto flex items-center gap-2"
                onClick={handleSetup}
                disabled={isPending}
              >
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <ExternalLink size={16} />}
                Complete Stripe Setup
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
