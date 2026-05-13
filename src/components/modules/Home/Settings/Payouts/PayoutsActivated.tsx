"use client";

import { CheckCircle, RefreshCw, ShieldCheck, Clock, HelpCircle, ArrowRight, LayoutDashboard, Wallet, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { stripeOnBoarding } from "@/services/stripe.service";
import Link from "next/link";

interface PayoutsActivatedProps {
  success?: string | null;
  refresh?: string | null;
}

export function PayoutsActivated({ success, refresh }: PayoutsActivatedProps) {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: () => stripeOnBoarding(),
    onSuccess: (data) => {
      if (data?.data?.url) {
        window.location.href = data?.data.url;
      }
    },
  });

  const handleRestartSetup = async () => {
    try {
      await mutateAsync();
    } catch (error) {
      console.error("Failed to restart Stripe onboarding", error);
    }
  };

  const isSuccess = success === "true";
  const isRefresh = refresh === "true";

  // If neither param is true, don't render this component
  if (!isSuccess && !isRefresh) return null;

  return (
    <div className="space-y-8">
      {/* SUCCESS STATE */}
      {isSuccess && (
        <Card className="relative overflow-hidden bg-card border-border backdrop-blur-xl">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
          <CardContent className="p-8 flex flex-col items-center text-center space-y-6 py-10">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(var(--primary),0.2)]">
              <CheckCircle className="text-primary w-12 h-12" />
            </div>
            <div className="space-y-3">
              <h1 className="text-3xl font-black text-foreground font-sans tracking-tight">
                Payout Account Connected
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Your developer identity has been verified and your Stripe merchant account is successfully synced. You&apos;re ready to receive merit-based rewards directly to your bank.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Button asChild size="lg" className="font-bold shadow-lg shadow-primary/20 cursor-pointer">
                <Link href="/dashboard">
                  <LayoutDashboard size={16} className="mr-2" />
                  Return to Dashboard
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-bold cursor-pointer">
                <Link href="/wallet">
                  <Wallet size={16} className="mr-2" />
                  View Wallet
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* REFRESH / ALERT STATE */}
      {isRefresh && (
        <Alert className="border-destructive/20 bg-destructive/5 flex items-start gap-4 p-6 rounded-xl">
          <div className="p-3 rounded bg-destructive/10 text-destructive flex-shrink-0">
            <RefreshCw size={20} />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="text-xl font-black text-foreground font-sans tracking-tight">
              Stripe Sync Required
            </h3>
            <AlertDescription className="text-muted-foreground text-sm leading-relaxed">
              Onboarding was interrupted. To ensure seamless payouts for your active quests, please finalize your Stripe setup.
            </AlertDescription>
            <Button 
              variant="link" 
              className="text-primary font-bold text-sm uppercase tracking-widest mt-2 flex items-center gap-1 p-0 h-auto hover:underline group cursor-pointer"
              onClick={handleRestartSetup}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-1" />
              ) : (
                "Restart Setup"
              )}
              {!isPending && (
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              )}
            </Button>
          </div>
        </Alert>
      )}

      {/* Technical Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border-border backdrop-blur-xl">
          <CardContent className="p-6 space-y-3">
            <ShieldCheck size={20} className="text-primary" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Encryption Standards
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              AES-256 bank-level encryption. Your financial data never touches our servers directly.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border backdrop-blur-xl">
          <CardContent className="p-6 space-y-3">
            <Clock size={20} className="text-secondary" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Payout Cycles
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Processed on a T+7 rolling basis. Automated settlement every Monday at 00:00 UTC.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border backdrop-blur-xl">
          <CardContent className="p-6 space-y-3">
            <HelpCircle size={20} className="text-primary/70" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Support Channel
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Priority developer support for payout inquiries. Average response time: &lt; 2 hours.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
