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


export const rejectBountySubmissionSchema = z.object({
  rejectionReason:z.string()
})

export const revisionBountySubmissionSchema = z.object({
  revisionNote:z.string()
})
export type ISubmissionPayload = z.infer<typeof submissionSchema>;
export type IRejectionSubmissionPayload = z.infer<typeof rejectBountySubmissionSchema>
export type IRevisionSubmissionPayload = z.infer<typeof revisionBountySubmissionSchema>
