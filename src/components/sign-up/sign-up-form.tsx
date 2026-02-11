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

export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <section>
            <form className="space-y-6">
                <FieldGroup>
                    {/* Name */}
                    <Field>
                        <FieldLabel htmlFor="name">Full Name</FieldLabel>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
                            autoComplete="name"
                            required
                        />
                    </Field>

                    {/* Username */}
                    <Field>
                        <FieldLabel htmlFor="username">Username</FieldLabel>
                        <Input
                            id="username"
                            type="text"
                            placeholder="Choose a username"
                            autoComplete="username"
                            required
                        />
                    </Field>

                    {/* Email */}
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            required
                        />
                    </Field>

                    {/* Password */}
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                className="pr-10"
                                autoComplete="new-password"
                                required
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </Field>

                    {/* Confirm Password */}
                    <Field>
                        <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                className="pr-10"
                                autoComplete="new-password"
                                required
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </Field>
                </FieldGroup>

                <Button type="submit" className="w-full h-11 text-base cursor-pointer">
                    Sign Up
                </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground py-3">
                Already have an account?{" "}
                <Link href="/sign-in" className="font-medium text-primary hover:underline">
                    Sign In
                </Link>
            </p>
        </section>
    );
}
