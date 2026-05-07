"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  IUpdateProfilePayload,
  updateProfileValidationSchema,
} from "@/zod/settings.validation";
import { updateUserSettings } from "@/services/settings.service";
import { Profile } from "@/types/profile.types";
import { toast } from "sonner";

interface UserSettingsFormProps {
  profile: Profile | null;
}

const UserSettingsForm = ({ profile }: UserSettingsFormProps) => {
  const [serverError, setServerError] = useState<string | null>(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: IUpdateProfilePayload) =>
      updateUserSettings(payload),
  });

  if (!profile) {
    return <p className="text-center text-muted-foreground">Loading...</p>;
  }

  const social = profile.socialLinks || [];

  const getLink = (prefix: string) =>
    social.find((l) => l.startsWith(prefix)) ?? "";

  const websiteLink =
    social.find(
      (l) =>
        !l.startsWith("https://github.com/") &&
        !l.startsWith("https://linkedin.com/in/") &&
        !l.startsWith("https://x.com/")
    ) ?? "";

  const form = useForm({
    defaultValues: {
      name: profile.name,
      username: profile.username,
      email: profile.email,
      location: profile.location || "",
      company: profile.company || "",

      website: websiteLink,
      github: getLink("https://github.com/").replace("https://github.com/", ""),
      linkedin: getLink("https://linkedin.com/in/").replace("https://linkedin.com/in/", ""),
      x: getLink("https://x.com/").replace("https://x.com/", ""),
    },

    onSubmit: async ({ value }) => {
      setServerError(null);

      try {
        const socialLinks: string[] = [];

        if (value.website) socialLinks.push(value.website);
        if (value.github) socialLinks.push(`https://github.com/${value.github}`);
        if (value.linkedin) socialLinks.push(`https://linkedin.com/in/${value.linkedin}`);
        if (value.x) socialLinks.push(`https://x.com/${value.x}`);

        const payload: IUpdateProfilePayload = {
          name: value.name,
          username: value.username,
          email: value.email,
          location: value.location || "",
          company: value.company || "",
          socialLinks,
        };

        const result = (await mutateAsync(payload)) as any;

        if (!result.success) {
          setServerError(result.message || null);
          return;
        }

        toast.success("User settings updated successfully");
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
        <div className="grid grid-cols-2 gap-4">
          <form.Field
            name="name"
            validators={{
              onChange: updateProfileValidationSchema.shape.name,
            }}
          >
            {(field) => <AppField field={field} label="Display Name" />}
          </form.Field>

          <form.Field
            name="username"
            validators={{
              onChange: updateProfileValidationSchema.shape.username,
            }}
          >
            {(field) => <AppField field={field} label="Username" />}
          </form.Field>

          <form.Field
            name="location"
            validators={{
              onChange: ({ value }) =>
                value.length > 100
                  ? "Location must be at most 100 characters"
                  : undefined,
            }}
          >
            {(field) => <AppField field={field}
              placeholder="e.g,   TopCat" label="Location" />}
          </form.Field>

          <form.Field
            name="company"
            validators={{
              onChange: ({ value }) =>
                value.length > 100
                  ? "Company must be at most 100 characters"
                  : undefined,
            }}
          >
            {(field) => <AppField field={field}
              placeholder="e.g,  California" label="Company" />}
          </form.Field>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Social Links</h3>

          <div className="grid grid-cols-2 gap-4">
            <form.Field name="website">
              {(field) => (
                <AppField
                  field={field}
                  label="Website"
                  placeholder="https://your-site.com"
                />
              )}
            </form.Field>

            <form.Field name="github">
              {(field) => (
                <AppField field={field} label="GitHub" placeholder="username" />
              )}
            </form.Field>

            <form.Field name="linkedin">
              {(field) => (
                <AppField field={field} label="LinkedIn" placeholder="username" />
              )}
            </form.Field>

            <form.Field name="x">
              {(field) => (
                <AppField field={field} label="X (Twitter)" placeholder="username" />
              )}
            </form.Field>
          </div>
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
              Update Settings
            </AppSubmitButton>
          )}
        </form.Subscribe>
      </form>
    </section>
  );
};

export default UserSettingsForm;
