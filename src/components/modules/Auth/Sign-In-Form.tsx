"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { ILoginPayload, loginValidationZodSchema } from "@/zod/auth.validation";
import { loginAction } from "@/app/(authGroup)/sign-in/_action";
import { useForm } from "@tanstack/react-form";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { toast } from "sonner";

interface SignInFormProps {
  redirectPath?: string;
}

const SignInForm = ({ redirectPath }: SignInFormProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: ILoginPayload) => loginAction(payload, redirectPath),
    onSuccess: (result: any) => {
      if (result?.success) {
        toast.success("Signed in successfully! Welcome back.");
      } else {
        toast.error(result?.message || "Invalid credentials. Please try again.");
      }
    },
    onError: (error: any) => {

   if (error?.digest?.startsWith("NEXT_REDIRECT")) {
        toast.success("Signed in successfully!");
        return;
      }
      toast.error(error?.message || "Something went wrong. Please try again.");
    },
  });

  const form = useForm({
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },

    onSubmit: async ({ value }) => {
      try {
        await mutateAsync(value);
      } catch (error: any) {
        // Error is already handled by onError in useMutation
        console.error("Sign in failed:", error);
      }
    },
  });

  return (
    <section>
      <form
        method="POST"
        action="#"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <form.Field name="usernameOrEmail" validators={{ onChange: loginValidationZodSchema.shape.usernameOrEmail }}>
          {(field) => (
            <AppField
              field={field}
              label="Username or Email"
              type="text"
              placeholder="Enter username or email"
            />
          )}
        </form.Field>

        <form.Field name="password" validators={{ onChange: loginValidationZodSchema.shape.password }}>
          {(field) => (
            <AppField
              field={field}
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              append={
                <Button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-transparent"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" aria-hidden="true" />
                  ) : (
                    <Eye className="size-4" aria-hidden="true" />
                  )}
                </Button>
              }
            />
          )}
        </form.Field>

        <div className="text-right mt-2">
          <Link
            href="/forgot-password"
            className="text-sm text-primary hover:underline underline-offset-4"
          >
            Forgot password?
          </Link>
        </div>

        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
          {([canSubmit, isSubmitting]) => (
            <AppSubmitButton
              className="cursor-pointer w-full"
              isPending={isSubmitting || isPending}
              pendingLabel="Signing In..."
              disabled={!canSubmit}
            >
              Sign In
            </AppSubmitButton>
          )}
        </form.Subscribe>
      </form>

      <p className="text-center text-sm text-muted-foreground py-3">
        Don't have an account?{" "}
        <Link href="/sign-up" className="font-medium text-primary hover:underline">
          Sign Up
        </Link>
      </p>
    </section>
  );
};

export default SignInForm;
