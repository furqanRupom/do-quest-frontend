
import { z } from "zod";

// Profile अपडेट validation
export const updateProfileValidationSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be at most 50 characters long"),

  username: z
    .string()
    .min(5, "Username must be at least 5 characters long")
    .max(15, "Username must be at most 15 characters long")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

  email: z
    .email("Must be valid email"),

  socialLinks: z
    .array(
      z.string())
    .max(5, "You can add up to 5 social links") // optional limit (you can change)
    .optional(),

  location: z
    .string()
    .max(100, "Location must be at most 100 characters")
    .optional(),

  company: z
    .string()
    .max(100, "Company must be at most 100 characters")
    .optional()
});


// Account security (change password)
export const accountSecurityValidationSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Current password must be at least 8 characters long"),

    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must contain uppercase, lowercase, number, and special character"
      ),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

export const updateUserValidationSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be at most 50 characters long"),

  username: z
    .string()
    .min(5, "Username must be at least 5 characters long")
    .max(15, "Username must be at most 15 characters long")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

  email: z
    .email("Must be valid email"),

  socialLinks: z
    .array(
      z.string())
    .max(5, "You can add up to 5 social links") // optional limit (you can change)
    .optional(),

  location: z
    .string()
    .max(100, "Location must be at most 100 characters")
    .optional(),

  company: z
    .string()
    .max(100, "Company must be at most 100 characters")
    .optional(),
  isDeleted: z.boolean().optional(),
  needPasswordChange: z.boolean().optional()
});
// Types
export type IUpdateProfilePayload = z.infer<typeof updateProfileValidationSchema>;
export type IUpdateUserPayload = z.infer<typeof updateUserValidationSchema>;
export type IAccountSecurityPayload = z.infer<typeof accountSecurityValidationSchema>;
