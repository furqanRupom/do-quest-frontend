import { z } from "zod"

/* ---------------- ENUMS ---------------- */
export const taskStatusEnum = z.enum([
  "PENDING",
  "ACTIVE",
  "COMPLETED",
  "CANCELLED",
  'DISPUTED'
])

export const paymentStatusEnum = z.enum([
  "ACTIVE",
  "COMPLETED",
  "CANCELLED",
  "REFUNDED",
  "RELEASED"
])

export const paymentFlowStatusEnum = z.enum([
  "PENDING",
  "AUTHORIZED",
  "CAPTURED",
  "CANCELLED",
  "NO_PAYMENT",
  "FAILED",
  "REFUNDED"
])

/* ---------------- CREATE ---------------- */

export const createBountyTaskSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(120, "Title too long"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),

  successRequirements: z
    .array(z.string().min(1, "Requirement cannot be empty"))
    .min(1, "At least one requirement is required"),

  attachments: z
    .string()
    .optional()
    .or(z.literal("")),

  budget: z
    .number( "Budget must be a number" )
    .positive("Budget must be greater than 0"),

  deadline: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date",
    })
    .refine((val) => new Date(val) > new Date(), {
      message: "Deadline must be in the future",
    }),

  maxSubmissions: z
    .number( "Must be a number" )
    .int("Must be an integer")
    .min(1, "At least 1 submission required"),

  categories: z
    .array(z.string().min(1))
    .min(1, "Select at least one category"),

  tags: z
    .array(z.string().min(1))
    .optional()
    .default([]),
})

/* ---------------- UPDATE ---------------- */

export const updateBountyTaskSchema = createBountyTaskSchema.partial()


export const bountyTaskFormSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),

  budget: z
    .string()
    .min(1, "Budget required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Must be a number",
    }),

  deadline: z
    .string()
    .min(1, "Deadline required")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date",
    }),

  maxSubmissions: z
    .string()
    .min(1, "Required")
    .refine((val) => Number(val) > 0, {
      message: "Must be greater than 0",
    }),

  categories: z
    .string()
    .min(1, "At least one category required"),

  tags: z.string().optional(),

  successRequirements: z
    .string()
    .min(1, "At least one requirement required"),
})

/* ---------------- TYPES ---------------- */

export type ICreateBountyTaskPayload = z.infer<typeof createBountyTaskSchema>
export type IUpdateBountyTaskPayload = z.infer<typeof updateBountyTaskSchema>
export type IBountyTaskFormValues = z.infer<typeof bountyTaskFormSchema>
