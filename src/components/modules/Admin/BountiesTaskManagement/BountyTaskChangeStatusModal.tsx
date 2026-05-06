"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ITaskAndBounty } from "@/types/bounty.types";
import { changeTaskBountyStatusAction } from "@/app/(dashboard)/admin/dashboard/bounties-management/_action";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: ITaskAndBounty | null;
}

const STATUS_OPTIONS = [
  { value: "PENDING", label: "Pending", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  { value: "ACTIVE", label: "Active", color: "bg-green-500/10 text-green-600 border-green-500/20" },
  { value: "COMPLETED", label: "Completed", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  { value: "CANCELLED", label: "Cancelled", color: "bg-red-500/10 text-red-600 border-red-500/20" },
] as const;

export default function ChangeBountyStatusModal({
  open,
  onOpenChange,
  task,
}: Props) {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: any }) =>
      changeTaskBountyStatusAction(id, { taskStatus: status }),
  });

  const currentStatus = task?.status;

  const handleChange = async (status: string) => {
    if (!task) return;

    const res = await mutateAsync({
      id: task._id,
      status,
    });

    if (!res.success) {
      toast.error(res.message || "Failed to update status");
      return;
    }

    toast.success("Status updated successfully");
    onOpenChange(false);

    await queryClient.invalidateQueries({ queryKey: ["tasks"] });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Task Status</DialogTitle>
          <DialogDescription>
            Update the workflow status of this task/bounty
          </DialogDescription>
        </DialogHeader>

        {/* Current status */}
        <div className="flex items-center justify-between rounded-md border p-3">
          <span className="text-sm text-muted-foreground">Current Status</span>
          <Badge variant="secondary">{currentStatus}</Badge>
        </div>

        {/* Status grid */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {STATUS_OPTIONS.map((status) => {
            const isActive = currentStatus === status.value;

            return (
              <Button
                key={status.value}
                variant="outline"
                disabled={isPending}
                onClick={() => handleChange(status.value)}
                className={`
                  justify-start gap-2 border transition
                  ${isActive ? "border-primary bg-primary/5" : ""}
                  hover:scale-[1.01]
                `}
              >
                <span className={`h-2 w-2 rounded-full ${status.color}`} />
                {status.label}

                {isActive && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    current
                  </span>
                )}
              </Button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4">
          <DialogClose asChild>
            <Button variant="ghost">Close</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
