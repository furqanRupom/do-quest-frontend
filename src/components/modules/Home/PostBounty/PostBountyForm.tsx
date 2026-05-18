"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "@tanstack/react-form"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Rocket,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import AppField from "@/components/shared/form/AppField"
import AppSubmitButton from "@/components/shared/form/AppSubmitButton"
import ChipInput from "@/components/shared/form/ChipInput"
import { createNewBountyAction } from "@/app/(home)/post-bounty/_action"
import {
  bountyTaskFormSchema,
  ICreateBountyTaskPayload,
} from "@/zod/bounty.validation"
import { toast } from "sonner"
import { useArrayField } from "@/hooks/useArrayFields"
import BountyPaymentForm from "./BountyPaymentForm" // <-- Import Stripe Component

const STEPS = [
  { number: 1, label: "Details" },
  { number: 2, label: "Review & Pay" },
]

const PostBountyForm = () => {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [clientSecret, setClientSecret] = useState<string | null>(null) // <-- Hold Stripe secret

  // Managed outside tanstack-form (array-based inputs)
  const [requirements, setRequirements] = useState<string[]>([])
  const [requirementInput, setRequirementInput] = useState("")
  
  const [categories, setCategories] = useState<string[]>([])
  const [categoryInput, setCategoryInput] = useState("")
  
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: ICreateBountyTaskPayload) =>
      createNewBountyAction(payload),
  })

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      budget: "",
      deadline: "",
      maxSubmissions: "1",
    },
    onSubmit: async ({ value }) => {
      try {
        const payload: ICreateBountyTaskPayload = {
          title: value.title,
          description: value.description,
          budget: Number(value.budget),
          deadline: value.deadline,
          maxSubmissions: Number(value.maxSubmissions),
          categories: categories,
          tags: tags.length > 0 ? tags : [],
          successRequirements: requirements,
          attachments: "",
        }

        const result = (await mutateAsync(payload)) as any
        console.log("RESULT ----------",result)
        // ✅ Task created in DB. Save secret and show Stripe form

        if (result?.data?.clientSecret) {
          setClientSecret(result?.data.clientSecret)
        } else {
          toast.error("Failed to initialize payment", {
            description: result?.message || "Something went wrong. Please try again.",
          })
        }
      } catch (error: any) {
        toast.error("Submission failed", {
          description: error.message || "An unexpected error occurred.",
        })
      }
    },
  })

  /* ── Strict Validation for Final Submit ── */
  const isFormValid = (): boolean => {
    const v = form.state.values
    return (
      v.title.trim().length >= 3 &&
      v.description.trim().length >= 10 &&
      requirements.length > 0 &&
      categories.length > 0 &&
      !!v.budget &&
      Number(v.budget) > 0 &&
      !!v.deadline &&
      new Date(v.deadline) > new Date() &&
      Number(v.maxSubmissions) >= 1
    )
  }

  const formatDeadline = (dateStr: string) => {
    if (!dateStr) return "—"
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return dateStr
    }
  }

  return (
    <section className="min-h-screen w-full flex flex-col items-center px-4 py-20 md:py-28">
      <div className="w-full max-w-7xl mx-auto px-2 space-y-10">
        
        {/* ── Progress Indicator ── */}
        <div className="flex items-center justify-between relative max-w-xs mx-auto">
          <div className="absolute top-5 left-0 w-full h-0.5 bg-muted" />
          <div
            className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-500"
            style={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
          />

          {STEPS.map((s) => (
            <div
              key={s.number}
              className="relative z-10 flex flex-col items-center gap-2"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  step >= s.number
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step > s.number ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  s.number
                )}
              </div>
              <span
                className={`text-xs font-semibold tracking-wide uppercase ${
                  step >= s.number ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <form
          noValidate
          onKeyDown={(e) => {
            if (e.key === "Enter" && step !== 2) e.preventDefault()
          }}
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="space-y-8"
        >
          {/* ──────── Step 1: All Form Details ──────── */}
          {step === 1 && (
            <div className="space-y-8 pt-4">
              <div>
                <h2 className="text-4xl font-bold tracking-tight">Create Quest</h2>
                <p className="text-muted-foreground mt-2 text-lg">
                  Define the mission, set the rewards, and attract the best
                  talent.
                </p>
              </div>

              {/* Basic Info Section */}
              <div className="space-y-6">
                <form.Field name="title" validators={{ onChange: bountyTaskFormSchema.shape.title }}>
                  {(field) => (
                    <AppField field={field} label="Bounty Title" type="text" placeholder="e.g., Optimize Solidity Smart Contract" />
                  )}
                </form.Field>

                <form.Field name="description" validators={{ onChange: bountyTaskFormSchema.shape.description }}>
                  {(field) => (
                    <AppField field={field} label="Mission Description" type="textarea" rows={8} placeholder="Outline the requirements, technical specs, and deliverables..." />
                  )}
                </form.Field>
              </div>

              <Separator />

              {/* Specs & Rewards Section */}
              <div className="space-y-6">
                <ChipInput
                  label="Success Requirements"
                  items={requirements}
                  setItems={setRequirements}
                  inputVal={requirementInput}
                  setInputVal={setRequirementInput}
                  placeholder="Add a specific requirement..."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <form.Field name="budget" validators={{ onChange: bountyTaskFormSchema.shape.budget }}>
                    {(field) => (
                      <AppField field={field} label="Total Budget ($ - USD)" type="number" placeholder="0.00" prepend={<span className="text-muted-foreground text-sm font-bold">$</span>} />
                    )}
                  </form.Field>

                  <form.Field name="deadline" validators={{ onChange: bountyTaskFormSchema.shape.deadline }}>
                    {(field) => (
                      <AppField field={field} label="Deadline" type="date" />
                    )}
                  </form.Field>
                </div>

                <form.Field name="maxSubmissions" validators={{ onChange: bountyTaskFormSchema.shape.maxSubmissions }}>
                  {(field) => (
                    <AppField field={field} label="Max Submissions" type="number" placeholder="1" />
                  )}
                </form.Field>

                <ChipInput
                  label="Categories"
                  items={categories}
                  setItems={setCategories}
                  inputVal={categoryInput}
                  setInputVal={setCategoryInput}
                  placeholder="e.g. Smart Contracts, UI/UX"
                />

                <ChipInput
                  label="Technical Tags"
                  items={tags}
                  setItems={setTags}
                  inputVal={tagInput}
                  setInputVal={setTagInput}
                  placeholder="e.g. react, nodejs, zero-knowledge"
                />
              </div>
            </div>
          )}

          {/* ──────── Step 2: Review & Pay ──────── */}
          {step === 2 && (
            <div className="space-y-8 pt-4">
              <div>
                <h2 className="text-4xl font-bold tracking-tight">Final Review</h2>
                <p className="text-muted-foreground mt-2 text-lg">
                  Verify your quest details and authorize the escrow payment to make it live.
                </p>
              </div>

              {/* 2-Column Grid Layout for Larger Viewport Filling */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Column: Details */}
                <div className="lg:col-span-8 space-y-6">
                  <Card className="overflow-hidden">
                    <CardHeader className="bg-muted/50 border-b p-6 flex flex-row justify-between items-center">
                      <div>
                        <CardTitle className="text-xl">Quest Identity</CardTitle>
                        <CardDescription>General Information</CardDescription>
                      </div>
                      <Button type="button" variant="ghost" size="sm" className="text-primary gap-1" onClick={() => setStep(1)}>
                        <ArrowLeft className="h-4 w-4" /> Edit
                      </Button>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Bounty Title</p>
                        <p className="text-xl font-semibold mt-1">{form.state.values.title || "—"}</p>
                      </div>
                      <Separator />
                      <div>
                        <p className="text-sm text-muted-foreground">Description</p>
                        <p className="text-sm whitespace-pre-wrap mt-1 min-h-[40px]">{form.state.values.description || "—"}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {categories.map((cat) => (
                          <Badge key={cat} variant="default">{cat}</Badge>
                        ))}
                        {tags.map((tag) => (
                          <Badge key={tag} variant="default">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden">
                    <CardHeader className="bg-muted/50 border-b p-6 flex flex-row justify-between items-center">
                      <div>
                        <CardTitle className="text-xl">Acceptance Criteria</CardTitle>
                        <CardDescription>Validation Rules</CardDescription>
                      </div>
                      <Button type="button" variant="ghost" size="sm" className="text-primary gap-1" onClick={() => setStep(1)}>
                        <ArrowLeft className="h-4 w-4" /> Edit
                      </Button>
                    </CardHeader>
                    <CardContent className="p-6">
                      {requirements.length > 0 ? (
                        <ul className="space-y-3">
                          {requirements.map((req, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle2 className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                              <span className="text-sm">{req}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-muted-foreground">No requirements added.</p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column: Budget & Actions */}
                <div className="lg:col-span-4 space-y-6">
                  <Card className="overflow-hidden bg-gradient-to-br from-muted/80 to-background">
                    <CardHeader className="border-b p-6 flex flex-row justify-between items-center">
                      <CardTitle className="text-xl">Budget</CardTitle>
                      <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-primary" onClick={() => setStep(1)}>
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <p className="text-4xl font-bold text-primary tracking-tight">
                          ${form.state.values.budget || "0"}
                        </p>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest mt-2">
                          Total Bounty Value
                        </p>
                      </div>
                      <Separator />
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Deadline</span>
                          <span className="font-medium">{formatDeadline(form.state.values.deadline)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Max Submissions</span>
                          <span className="font-medium">{form.state.values.maxSubmissions}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-3">
                    {/* ✅ Conditional Render: Show Stripe Form if Secret exists, else show Submit button */}
                    {clientSecret ? (
                      <BountyPaymentForm 
                        clientSecret={clientSecret} 
                        onSuccessAction={() => {
                          toast.success("Bounty submitted successfully! 🚀", {
                            description: "Funds authorized. Your quest is now live.",
                          })
                          router.push('/my-bounties')
                        }} 
                      />
                    ) : (
                      <form.Subscribe selector={(s) => [s.isSubmitting] as const}>
                        {([isSubmitting]) => (
                          <AppSubmitButton
                            className="w-full h-14 text-base cursor-pointer"
                            isPending={isSubmitting || isPending}
                            pendingLabel="Saving Draft..."
                            disabled={!isFormValid()}
                          >
                            <Rocket className="h-5 w-5 mr-2" /> Continue to Payment
                          </AppSubmitButton>
                        )}
                      </form.Subscribe>
                    )}

                    <p className="text-center text-xs text-muted-foreground mt-4 px-2">
                      By submitting, you agree to lock the reward amount in the DoQuest escrow contract.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Navigation ── */}
          {step === 1 && (
            <div className="flex justify-end items-center pt-8 border-t">
              <Button type="button" size="lg" className="cursor-pointer" onClick={() => setStep(2)}>
                Review Quest <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="flex justify-start items-center pt-8 border-t">
              <Button type="button" className="cursor-pointer" variant="ghost" size="lg" onClick={() => { setStep(1); setClientSecret(null); }}>
                <ArrowLeft className="h-5 w-5 mr-2" /> Back to Editing
              </Button>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

export default PostBountyForm
