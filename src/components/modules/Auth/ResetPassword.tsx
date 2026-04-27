"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { needChangePasswordSchema, INeedCHangePasswordPayload, IResetPasswordPayload, resetPasswordSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form"
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { needChangePasswordAction } from "@/app/(authGroup)/change-password/_action";
import { resetPasswordAction } from "@/app/(authGroup)/reset-password/_action";

interface ResetPasswordProps {
    redirectPath?: string
    token: string
}

const ResetPasswordForm = ({ redirectPath, token }: ResetPasswordProps) => {
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string | null>(null)

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: IResetPasswordPayload) => resetPasswordAction(payload, token)
    })


    const form = useForm({
        defaultValues: {
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
                console.log(`Password reset failed : ${error.message}`)
                setServerError(`Password reset failed : ${error.message}`)
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
                    name="newPassword"
                    validators={{ onChange: resetPasswordSchema.shape.newPassword }}
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
                        <AppSubmitButton className="cursor-pointer" isPending={isSubmitting || isPending} pendingLabel="Pasword reseting...." disabled={!canSubmit}>
                            Reset Password
                        </AppSubmitButton>
                    )}
                </form.Subscribe>
            </form>

        </section >
    );
}
export default ResetPasswordForm
