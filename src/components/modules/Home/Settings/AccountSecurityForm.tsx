"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff } from "lucide-react";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  accountSecurityValidationSchema,
  IAccountSecurityPayload,
} from "@/zod/settings.validation";
import { accountSecurity } from "@/services/settings.service";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const AccountSecurityForm = () => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IAccountSecurityPayload) =>
      accountSecurity(payload),
  });

  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },

    onSubmit: async ({ value }) => {
      setServerError(null);

      try {
        const result = (await mutateAsync(value)) as any;

        if (!result.success) {
          setServerError(result.message || null);
          return;
        }

        toast.success("Password updated successfully");
      } catch (error: any) {
        setServerError(error.message);
      }
    },
  });

  return (
    <section className="space-y-6 px-6 py-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 gap-4">

          <form.Field
            name="currentPassword"
            validators={{
              onChange: accountSecurityValidationSchema.shape.currentPassword,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Current Password"
                type={showCurrent ? "text" : "password"}
                placeholder="••••••••••"
                append={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowCurrent((v) => !v)}
                    className="hover:bg-transparent"
                  >
                    {showCurrent ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </Button>
                }
              />
            )}
          </form.Field>

          <form.Field
            name="newPassword"
            validators={{
              onChange: accountSecurityValidationSchema.shape.newPassword,
            }}
          >
            {(field) => (
              <AppField
                field={field}
                label="New Password"
                type={showNew ? "text" : "password"}
                placeholder="••••••••••"
                append={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowNew((v) => !v)}
                    className="hover:bg-transparent"
                  >
                    {showNew ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </Button>
                }
              />
            )}
          </form.Field>

        </div>

        {serverError && (
          <Alert variant="destructive">
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}

        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
          {([canSubmit, isSubmitting]) => (
            <AppSubmitButton
              isPending={isSubmitting || isPending}
              disabled={!canSubmit}
            >
              Update Password
            </AppSubmitButton>
          )}
        </form.Subscribe>
      </form>
    </section>
  );
};

export default AccountSecurityForm;
