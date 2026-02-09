"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";  

export default function SignInForm() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <section>

            <form className="space-y-6">
                <FieldGroup>
                    <Field>

                        <FieldLabel htmlFor="emailOrUsername">Email or Username</FieldLabel>
                        <Input
                            id="emailOrUsername"
                            type="text"
                            placeholder="Enter your email or username"
                            autoComplete="email"
                            required
                        />
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
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="pr-10"
                                autoComplete="current-password"
                                required
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
                    </Field>
                </FieldGroup>

                <Button
                    type="submit"
                    className="w-full cursor-pointer h-11 text-base"
                >
                    Sign In
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