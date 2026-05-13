"use client"
import { ShieldCheck, Info, ExternalLink, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function WalletPayouts() {
  return (
    <div className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Info Card */}
      <Card className="bg-card border-border backdrop-blur-xl">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck size={20} className="text-primary" />
            <h2 className="text-2xl font-black text-foreground font-sans tracking-tight">Payouts</h2>
          </div>

          <div className="space-y-4">
            <Alert className="bg-primary/10 border border-primary/30 text-primary">
              <Info size={14} className="text-primary" />
              <AlertDescription className="text-primary font-semibold text-sm ml-1">
                Stripe Setup Required
              </AlertDescription>
            </Alert>

            <p className="text-muted-foreground leading-relaxed text-sm">
              Your payouts are securely processed by Stripe. You can use the self-serve Stripe
              Express dashboard to handle all payment-related settings, bank accounts, tax forms and
              detailed transaction records.
            </p>

            <div className="pt-2">
              <a
                href="#"
                className="text-primary flex items-center gap-2 font-bold text-sm hover:underline hover:text-primary/80 transition-colors"
              >
                Open Stripe Dashboard
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visual Card */}
      <div className="rounded-xl overflow-hidden bg-card border-border backdrop-blur-xl min-h-[300px] flex items-center justify-center relative">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,oklch(var(--primary)/0.3),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,oklch(var(--secondary)/0.3),transparent_60%)]" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-4">
            <Lock size={32} className="text-primary" fill="currentColor" />
          </div>
          <h4 className="text-xl font-black text-foreground font-sans">Enterprise Security</h4>
          <p className="text-muted-foreground max-w-sm mt-2 text-sm">
            End-to-end encryption for all global bounty distributions.
          </p>
        </div>
      </div>
    </div>
  );
}
