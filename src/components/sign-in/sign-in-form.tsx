"use client";
import { useActionState, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { loginUser } from "@/services/auth/loginUser";

export default function SignInForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [state, formAction, isPending] = useActionState(loginUser, null)
    
    const getFieldError = (fieldName: string) => {
        if (!state?.errors) return null;

        const fieldError = state.errors.find(
            (error: any) => error.field === fieldName
        );

        return fieldError ? fieldError.message : null;
    };



    return (
        <section>

            <form action={formAction} className="space-y-6">
                <FieldGroup>
                    <Field>

                        <FieldLabel htmlFor="usernameOrEmail">Email or Username</FieldLabel>
                        <Input
                            id="usernameOrEmail"
                            name="usernameOrEmail"
                            type="text"
                            placeholder="user@example.com or user12345"
                            autoComplete="email"
                        />
                        {
                            getFieldError("usernameOrEmail") && (
                                <FieldDescription className="text-destructive">
                                    {getFieldError("usernameOrEmail")}
                                </FieldDescription>
                            )
                        }
                    </Field>


                    <Field>
                        <div className="flex items-center justify-between">
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Link
                                href="/forgot-password"
                                className="text-sm font-medium hover:underline"
                            >
                                Forgot your password?
                            </Link>
                        </div>

                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="pr-10"
                                autoComplete="current-password"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                        {
                            getFieldError("password") && (
                                <FieldDescription className="text-destructive">
                                    {getFieldError("password")}
                                </FieldDescription>
                            )
                        }
                    </Field>

                </FieldGroup>

                <Button
                    type="submit"
                    className="w-full cursor-pointer h-11 text-base"
                >
                    {isPending ? "Signing In..." : "Sign In"}
                </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground py-3">
                Don't have an account?{" "}
                <Link href="/sign-up" className="font-medium text-primary hover:underline">
                    Sign Up
                </Link>
            </p>
        </section>
    );
}