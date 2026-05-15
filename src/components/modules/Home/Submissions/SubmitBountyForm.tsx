
"use client";

import { submitBountyAction } from "@/app/(home)/submissions/[id]/_action";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CheckCircle2, Circle, Plus, Trash2, Diamond, Rocket, LinkIcon } from "lucide-react";
import { ITaskAndBounty } from "@/types/bounty.types";
import { useRouter } from "next/navigation";

interface SubmitBountyFormProps {
  id: string;
  bounty: ITaskAndBounty;
}

const SubmitBountyForm = ({ id, bounty }: SubmitBountyFormProps) => {
  const router = useRouter()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: any) => submitBountyAction(id, payload),
  });

  const form = useForm({
    defaultValues: {
      message: "",
      attachments: [""] as string[], // Start with one empty input
    },
    onSubmit: async ({ value }) => {
      const filteredAttachments = value.attachments
        .filter((link) => link?.trim() !== "")
        .map((link) => link.trim());

      const res = await mutateAsync({
        message: value.message.trim(),
        attachments: filteredAttachments,
      });

      if (!res?.success) {
        toast.error(res?.message || "Submission failed");
        return;
      }
      toast.success("Quest submitted successfully!");
      router.push('/submissions')
    },
  });

  return (
    <main className="flex-grow max-w-7xl mx-auto px-4 md:px-8 py-20 min-h-screen w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2 tracking-tight">
          Submit Quest
        </h1>
        <p className="text-muted-foreground">
          Finalize your work and claim your bounty reward.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Bounty Summary Card */}
          <div className="relative overflow-hidden rounded-xl border bg-card/40 backdrop-blur-lg border-white/10 p-6">
            <div className="absolute left-0 top-0 h-full w-1 bg-primary" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                Target Bounty
              </span>
              <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-semibold">
                <Diamond className="h-3.5 w-3.5" />
                <span>{bounty.budget ? `${bounty.budget} USDC` : "Bounty"}</span>
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">{bounty.title}</h2>
            <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
              {bounty.description}
            </p>
          </div>

          {/* Submission Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="relative overflow-hidden rounded-xl border bg-card/40 backdrop-blur-lg border-white/10 p-6 space-y-6"
          >
            {/* Submission Message */}
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                Submission Message
              </Label>
              <form.Field name="message">
                {(field) => (
                  <Textarea
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Provide a detailed description of your technical approach, implementation details, key features..."
                    rows={10}
                    className="resize-none bg-input/50 border-white/10"
                  />
                )}
              </form.Field>
            </div>

            {/* ==================== ATTACHMENTS SECTION ==================== */}
            <form.Field name="attachments">
              {(field) => {
                const attachments = field.state.value || [""];

                const addLink = () => {
                  field.setValue([...attachments, ""]);
                  setTimeout(() => {
                    const inputs = document.querySelectorAll('input[name^="attachments"]');
                    (inputs[inputs.length - 1] as HTMLInputElement)?.focus();
                  }, 10);
                };

                const removeLink = (index: number) => {
                  if (attachments.length === 1) {
                    field.setValue([""]); // Keep at least one input
                    return;
                  }
                  const updated = attachments.filter((_, i) => i !== index);
                  field.setValue(updated);
                };

                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
                        Technical Attachments & Proof
                      </Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-white/10 hover:bg-white/5 cursor-pointer"
                        onClick={addLink}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Another Link
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {attachments.map((_, i) => (
                        <form.Field key={i} name={`attachments[${i}]`}>
                          {(subField) => (
                            <div className="group flex items-center gap-3 bg-input/30 border border-white/10 rounded-xl p-2 focus-within:border-primary/50 hover:border-white/20 transition-all">
                              <div className="pl-2">
                                <LinkIcon className="h-5 w-5 text-primary shrink-0" />
                              </div>

                              <Input
                                value={subField.state.value}
                                onBlur={subField.handleBlur}
                                onChange={(e) => subField.handleChange(e.target.value)}
                                placeholder="https://github.com/username/repo or live demo link"
                                className="flex-1 bg-transparent border-0 focus-visible:ring-0 text-base placeholder:text-muted-foreground/60"
                              />

                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="cursor-pointer text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                                onClick={() => removeLink(i)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </form.Field>
                      ))}
                    </div>

                    <p className="text-xs text-muted-foreground/70 pl-1">
                      Add GitHub repos, deployment links, screenshots, or any proof of work.
                    </p>
                  </div>
                );
              }}
            </form.Field>

            {/* Submit Button */}
            <div className="flex justify-end pt-4 border-t border-white/10">
              <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
                {([canSubmit, isSubmitting]) => (
                  <AppSubmitButton
                    isPending={isSubmitting || isPending}
                    disabled={!canSubmit}
                    className="bg-primary text-primary-foreground shadow-[0_0_15px_rgba(0,245,255,0.4)] hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
                  >
                    Submit Quest
                    <Rocket className="h-4 w-4" />
                  </AppSubmitButton>
                )}
              </form.Subscribe>
            </div>
          </form>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-xl border bg-card/40 backdrop-blur-lg border-white/10 p-6">
            <h3 className="text-xl font-semibold mb-4">Submission Rules</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-sm">Verified Identity</p>
                  <p className="text-xs text-muted-foreground">Your wallet must be linked to a verified developer profile.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-sm">Open Source Code</p>
                  <p className="text-xs text-muted-foreground">All submissions must include a link to a public GitHub repository.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground/50">
                <Circle className="h-5 w-5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-sm">Technical Review</p>
                  <p className="text-xs">Expect a 48-hour window for manual validation by the DAO.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SubmitBountyForm;
