"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { IRegisterPayload, registerValidationZodSchema } from "@/zod/auth.validation";
import { registerAction } from "@/app/(authGroup)/sign-up/_action";

interface SignUpFormProps {
  redirectPath?: string;
}

const SignUpForm = ({ redirectPath }: SignUpFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IRegisterPayload) => registerAction(payload, redirectPath),
  });

  const form = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const result = await mutateAsync(value) as any;
        if (!result.success) {
          setServerError(result.message || null);
        }
      } catch (error: any) {
        console.log(`Sign up failed: ${error.message}`);
        setServerError(`Sign up failed: ${error.message}`);
      }
    },
  });

  return (
    <section>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        {/* Name + Username in one row (two columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <form.Field
            name="name"
            validators={{ onChange: registerValidationZodSchema.shape.name }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
              />
            )}
          </form.Field>

          <form.Field
            name="username"
            validators={{ onChange: registerValidationZodSchema.shape.username }}
          >
            {(field) => (
              <AppField
                field={field}
                label="Username"
                type="text"
                placeholder="Choose a username"
              />
            )}
          </form.Field>
        </div>

        {/* Email */}
        <form.Field
          name="email"
          validators={{ onChange: registerValidationZodSchema.shape.email }}
        >
          {(field) => (
            <AppField
              field={field}
              label="Email"
              type="email"
              placeholder="Enter your email"
            />
          )}
        </form.Field>

        {/* Password */}
        <form.Field
          name="password"
          validators={{ onChange: registerValidationZodSchema.shape.password }}
        >
          {(field) => (
            <AppField
              field={field}
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              append={
                <Button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-transparent"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </Button>
              }
            />
          )}
        </form.Field>

        {/* Confirm Password */}
        <form.Field
          name="confirmPassword"
          validators={{ onChange: registerValidationZodSchema.shape.confirmPassword }}
        >
          {(field) => (
            <AppField
              field={field}
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              append={
                <Button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-transparent"
                >
                  {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </Button>
              }
            />
          )}
        </form.Field>

        {/* Server Error */}
        {serverError && (
          <Alert variant="destructive">
            <AlertDescription>{serverError}</AlertDescription>
          </Alert>
        )}

        {/* Submit Button */}
        <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting] as const}>
          {([canSubmit, isSubmitting]) => (
            <AppSubmitButton
              className="w-full cursor-pointer"
              isPending={isSubmitting || isPending}
              pendingLabel="Creating Account..."
              disabled={!canSubmit}
            >
              Create Account
            </AppSubmitButton>
          )}
        </form.Subscribe>
      </form>

      <p className="text-center text-sm text-muted-foreground py-4">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-medium text-primary hover:underline">
          Sign In
        </Link>
      </p>
    </section>
  );
};

export default SignUpForm;
