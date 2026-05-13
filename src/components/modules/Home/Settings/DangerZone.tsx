"use client"
import { userLogout } from "@/services/auth.service";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LogOut, Trash } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { deleteMyAccount } from "@/services/settings.service";
import { toast } from "sonner";

const DangerZone = () => {
  const [loggingOut, setLoggingOut] = React.useState<boolean>(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoggingOut(true);
    await userLogout();
    router.push("/sign-in");
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteMyAccount,
    onSuccess: () => {
      toast.success("Account deleted successfully");
      router.push("/sign-in");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete account");
    },
  });

  return (
    <section className="space-y-6">
      {/* Sign Out Card */}
      <Card className="flex flex-row justify-between items-center p-6 bg-card border-border backdrop-blur-xl">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Sign Out</h3>
          <p className="text-sm text-muted-foreground">
            Sign out of your account on this device
          </p>
        </div>
        <div>
          <Button
            onClick={handleLogout}
            disabled={loggingOut}
            variant="outline"
            className="cursor-pointer flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            {loggingOut ? "Signing out…" : "Sign Out"}
          </Button>
        </div>
      </Card>

      {/* Delete Account Card */}
      <Card className="bg-destructive/5 border border-destructive/30 backdrop-blur-xl flex flex-row justify-between items-center p-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Delete Account</h3>
          <p className="text-sm text-muted-foreground">
            Permanently delete your account and all associated data.
          </p>
        </div>
        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="cursor-pointer flex items-center gap-2" variant="destructive">
                <Trash className="h-4 w-4" /> Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-card border-border backdrop-blur-xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-foreground">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground">
                  This action cannot be undone. Your account and all associated
                  data will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer bg-muted hover:bg-muted/80 text-foreground border-border">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => mutateAsync()}
                  disabled={isPending}
                  className="bg-destructive cursor-pointer text-destructive-foreground hover:bg-destructive/90 flex items-center gap-2"
                >
                  {isPending ? "Deleting…" : "Yes, delete my account"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Card>
    </section>
  );
};

export default DangerZone;
