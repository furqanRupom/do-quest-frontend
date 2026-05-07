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
    <section className="space-y-8">
      <Card className="flex flex-row border-none ring-2 ring-gray-200 justify-between items-center p-4">
        <div>
          <h3 className="text-lg font-semibold">Sign Out</h3>
          <p className="text-sm text-muted-foreground">
            Sign out of your account on this device
          </p>
        </div>
        <div>
          <Button
            onClick={handleLogout}
            disabled={loggingOut}
            className="cursor-pointer hover:bg-gray-50 bg-gray-50/10"
            variant="outline"
          >
            <LogOut />
            {loggingOut ? "Signing out…" : "Sign Out"}
          </Button>
        </div>
      </Card>

      <Card className="bg-red-300/10 border-none ring-2 ring-red-100 flex flex-row justify-between items-center p-4">
        <div>
          <h3 className="text-lg font-semibold">Delete Account</h3>
          <p className="text-sm text-muted-foreground">
            Permanently delete your account and all associated data.
          </p>
        </div>
        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="cursor-pointer" variant="destructive">
                <Trash /> Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. Your account and all associated
                  data will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer bg-gray-50 hover:bg-gray-100/50">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => mutateAsync()}
                  disabled={isPending}
                  className="bg-red-500 cursor-pointer text-destructive-foreground hover:bg-red-500/90"
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
