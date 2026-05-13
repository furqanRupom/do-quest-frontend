"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { IStripeResponse } from "@/types/stripe.types"

export async function stripeOnBoarding() {
  try {
    return await httpClient.post<IStripeResponse>('/stripe/onboarding', {})
  }
  catch(error) {
    console.log("Error while stripe onboarding : ",error)
    console.error(error)
  }
}
export async function stripeDashboard() {
  try {
    return await httpClient.post<IStripeResponse>('/stripe/login-link', {})
  }
  catch(error) {
    console.log("Error while stripe onboarding : ",error)
    console.error(error)
  }
}
