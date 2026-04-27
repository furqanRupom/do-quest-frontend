"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { needChangePasswordSchema, INeedCHangePasswordPayload } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form"
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { needChangePasswordAction } from "@/app/(authGroup)/change-password/_action";

interface NeedPasswordChangeProps {
    redirectPath?: string
    email: string
}

const NeedChangePasswordForm = ({ redirectPath, email }: NeedPasswordChangeProps) => {
    const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
    const [showNewPassword,setShowNewPassword] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string | null>(null)

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: INeedCHangePasswordPayload) => needChangePasswordAction(payload, { redirectPath, email })
    })


    const form = useForm({
        defaultValues: {
            currentPassword: "",
            newPassword: ""
        },

        onSubmit: async ({ value }) => {
            setServerError(null)

            try {
                const result = await mutateAsync(value) as any

                if (!result.success) {
                    setServerError(result.message || null)
                }

            } catch (error: any) {
                console.log(`Password change failed : ${error.message}`)
                setServerError(`Password change failed : ${error.message}`)
            }
        }

    })
    return (
        <section>

            <form
                method="POST"
                action="#"
                noValidate
                onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                }}
                className="space-y-6">


                <form.Field
                    name="currentPassword"
                    validators={{ onChange: needChangePasswordSchema.shape.currentPassword }}
                >
                    {(field) => (
                        <AppField
                            field={field}
                            label="Current Password"
                            type={showCurrentPassword ? "text" : "password"}
                            // type="text"
                            placeholder="Enter current password"
                            aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                            className="cursor-pointer"
                            append={
                                <Button
                                    type="button"
                                    onClick={() => setShowCurrentPassword((value) => !value)}
                                    variant="ghost"
                                    size="icon"
                                    className=" hover:bg-transparent"
                                >
                                    {showCurrentPassword ? (
                                        <EyeOff className="size-4" aria-hidden="true" />
                                    ) : (
                                        <Eye className="size-4" aria-hidden="true" />
                                    )}
                                </Button>
                            }
                        />
                    )}
                </form.Field>

                <form.Field
                    name="newPassword"
                    validators={{ onChange: needChangePasswordSchema.shape.newPassword }}
                >
                    {(field) => (
                        <AppField
                            field={field}
                            label="New Password"
                            type={showNewPassword ? "text" : "password"}
                            // type="text"
                            placeholder="Enter new password"
                            aria-label={showNewPassword ? "Hide password" : "Show password"}
                            className="cursor-pointer"
                            append={
                                <Button
                                    type="button"
                                    onClick={() => setShowNewPassword((value) => !value)}
                                    variant="ghost"
                                    size="icon"
                                    className=" hover:bg-transparent"
                                >
                                    {showNewPassword ? (
                                        <EyeOff className="size-4" aria-hidden="true" />
                                    ) : (
                                        <Eye className="size-4" aria-hidden="true" />
                                    )}
                                </Button>
                            }
                        />
                    )}
                </form.Field>

                {serverError && (
                    <Alert variant={"destructive"}>
                        <AlertDescription>{serverError}</AlertDescription>
                    </Alert>
                )}

                <form.Subscribe
                    selector={(s) => [s.canSubmit, s.isSubmitting] as const}
                >
                    {([canSubmit, isSubmitting]) => (
                        <AppSubmitButton className="cursor-pointer" isPending={isSubmitting || isPending} pendingLabel="Pasword changing...." disabled={!canSubmit}>
                            Change Password
                        </AppSubmitButton>
                    )}
                </form.Subscribe>
            </form>

        </section >
    );
}
export default NeedChangePasswordForm
