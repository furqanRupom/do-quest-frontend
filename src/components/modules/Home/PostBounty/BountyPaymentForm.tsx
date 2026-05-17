"use client"

import { useState } from "react"
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// The internal form component that uses Stripe hooks
function PaymentForm({ onSuccessAction }: { onSuccessAction: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePayment = async () => {
    if (!stripe || !elements) return

    setIsProcessing(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/my-bounties?payment=success`, // Redirect after 3D Secure
      },
    })

    if (error) {
      toast.error("Payment failed", { description: error.message })
      setIsProcessing(false)
    } else {
      // For manual capture, this means the card was authorized.
      // The webhook will handle setting the task to ACTIVE.
      onSuccessAction()
    }
  }

  return (
    // ✅ Changed from <form> to <div> to avoid nesting form inside form
    <div className="space-y-4">
      <PaymentElement />
      <Button 
        type="button"
        onClick={handlePayment} 
        className="w-full h-14 text-base cursor-pointer" 
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? "Processing..." : "Authorize & Post Bounty"}
      </Button>
    </div>
  )
}

// The wrapper component that provides the Elements context
export default function BountyPaymentForm({ 
  clientSecret, 
  onSuccessAction 
}: { 
  clientSecret: string
  onSuccessAction: () => void 
}) {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm onSuccessAction={onSuccessAction} />
    </Elements>
  )
}
