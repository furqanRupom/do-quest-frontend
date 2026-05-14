import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea" // <-- ADDED
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { AnyFieldApi } from "@tanstack/react-form"
import React from "react"

const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error && typeof error.message === "string") {
    return error.message;
  }
  return String(error);
};

type AppFieldProps = {
  field: AnyFieldApi;
  label: string;
  type?: "text" | "email" | "password" | "number" | "date" | "time" | "textarea";
  placeholder?: string;
  append?: React.ReactNode;
  prepend?: React.ReactNode;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  disabled?: boolean;
  rows?: number; // <-- ADDED
};

const AppField = ({
  field,
  label,
  type = "text",
  placeholder,
  append,
  prepend,
  className,
  inputClassName,
  labelClassName,
  disabled = false,
  rows = 4, // <-- ADDED with a default fallback
}: AppFieldProps) => {
  const firstError =
    field.state.meta.isTouched && field.state.meta.errors.length > 0
      ? getErrorMessage(field.state.meta.errors[0])
      : null;

  const hasError = firstError !== null;

  return (
    <div className={cn("space-y-2", className)}>
      <Label
        htmlFor={field.name}
        className={cn(
          "text-sm font-medium",
          labelClassName,
          hasError && "text-destructive"
        )}
      >
        {label}
      </Label>

      <div className="relative">
        {prepend && type !== "textarea" && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
            {prepend}
          </div>
        )}

        {/* Conditional rendering for Textarea vs Input */}
        {type === "textarea" ? (
          <Textarea
            id={field.name}
            name={field.name}
            value={field.state.value}
            placeholder={placeholder}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            disabled={disabled}
            rows={rows}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${field.name}-error` : undefined}
            className={cn(
              "py-3 text-base",
              inputClassName,
              hasError && "border-destructive focus-visible:ring-destructive/20"
            )}
          />
        ) : (
          <Input
            id={field.name}
            name={field.name}
            type={type}
            value={field.state.value}
            placeholder={placeholder}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${field.name}-error` : undefined}
            className={cn(
              "py-3 h-11 text-base",
              prepend && "pl-10",
              append && "pr-10",
              inputClassName,
              hasError && "border-destructive focus-visible:ring-destructive/20"
            )}
          />
        )}

        {append && type !== "textarea" && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer z-10">
            {append}
          </div>
        )}
      </div>

      {hasError && (
        <p
          id={`${field.name}-error`}
          role="alert"
          className="text-xs text-destructive mt-1"
        >
          {firstError}
        </p>
      )}
    </div>
  );
};

export default AppField;
