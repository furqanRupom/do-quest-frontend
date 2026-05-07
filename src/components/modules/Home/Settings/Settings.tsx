"use client";

import { Card } from "@/components/ui/card";
import UserSettingsForm from "./UserSettingsForm";
import { Profile } from "@/types/profile.types";
import AccountSecurityForm from "./AccountSecurityForm";
import DangerZone from "./DangerZone";

interface SettingsProps {
  profile: Profile | null;
}

const Settings = ({ profile }: SettingsProps) => {
  return (
    <section className="max-w-7xl px-5 mx-auto">
      <h1 className="text-2xl font-semibold pt-5">Settings</h1>

      <div className="my-12 space-y-6">

        <Card className="border-none p-2 ">
          <div className="px-6 pt-2">
            <h2 className="text-lg font-semibold">Profile Settings</h2>
            <p className="text-sm text-muted-foreground">
              Manage your personal information and public profile details.
            </p>
          </div>

          <UserSettingsForm profile={profile} />
        </Card>

        <Card className="border-none p-2">
          <div className="space-y-1 px-6 pt-2">
            <h2 className="text-lg font-semibold">Security</h2>
            <p className="text-sm text-muted-foreground">
              Update your password and keep your account secure.
            </p>
          </div>

          <AccountSecurityForm />
        </Card>

        <Card className="border-none p-6">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-red-500">
              Danger Zone
            </h2>
            <p className="text-sm text-muted-foreground">
              These actions cannot be undone.
            </p>
          </div>
          <DangerZone />
        </Card>

      </div>
    </section>
  );
};

export default Settings;
