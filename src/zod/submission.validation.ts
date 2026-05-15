import { z } from "zod";

export const submissionSchema = z.object({
  message: z
    .string()
    .min(1, "Message is required")
    .max(1000, "Message is too long"),

  attachments: z
    .array(z.string().min(1))
    .default([]),
});

export type ISubmissionPayload = z.infer<typeof submissionSchema>;
