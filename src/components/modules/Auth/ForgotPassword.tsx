"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {  IForgotPasswordPayload, forgotPasswordSchema } from "@/zod/auth.validation";
import { useForm } from "@tanstack/react-form"
import AppField from "@/components/shared/form/AppField";
import AppSubmitButton from "@/components/shared/form/AppSubmitButton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { forgotPasswordAction } from "@/app/(authGroup)/forgot-password/_action";



const ForgotPasswordForm = () => {
    const [serverError, setServerError] = useState<string | null>(null)

    const { mutateAsync, isPending } = useMutation({
        mutationFn: (payload: IForgotPasswordPayload) => forgotPasswordAction(payload)
    })


    const form = useForm({
        defaultValues: {
            email:""
        },

        onSubmit: async ({ value }) => {
            setServerError(null)

            try {
                const result = await mutateAsync(value) as any

                if (!result.success) {
                    setServerError(result.message || null)
                }

            } catch (error: any) {
                console.log(`Forgot password failed : ${error.message}`)
                setServerError(`Forgot password failed : ${error.message}`)
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
                    name="email"
                    validators={{ onChange: forgotPasswordSchema.shape.email }}
                >
                    {(field) => (
                        <AppField
                            field={field}
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            className="cursor-pointer"
                          
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
                        <AppSubmitButton className="cursor-pointer" isPending={isSubmitting || isPending} pendingLabel="Reset Link sending...." disabled={!canSubmit}>
                           Send Reset Link
                        </AppSubmitButton>
                    )}
                </form.Subscribe>
            </form>

        </section >
    );
}
export default ForgotPasswordForm
