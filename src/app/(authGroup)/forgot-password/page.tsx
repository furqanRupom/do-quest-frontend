import LogoIcon from "@/components/logo/LogoIcon"
import ForgotPassword from "@/components/modules/Auth/ForgotPassword"

import { Card } from "@/components/ui/card"
import { FieldDescription, FieldLegend, FieldSet } from "@/components/ui/field"


const forgotPasswordPage = () => {
  return <section className="max-w-7xl mx-auto min-h-svh flex flex-col items-center justify-center">
    <div className="py-5">
      <div className="font-bold text-3xl inline-flex items-center gap-2">
        <LogoIcon width={32} height={32} />
        <h3 className="pt-1 text-foreground tracking-tighter">
          Do<span className="text-primary">.</span>Quest
        </h3>
      </div>
    </div>
    <Card className="max-w-lg w-full p-7">
      <FieldSet>
        <FieldLegend className="mx-auto font-bold"><h3 className=" text-2xl ">Forgot Password?</h3></FieldLegend>
        <FieldDescription className="text-center">Enter your email address and we'll send you a link to reset your password.</FieldDescription>
        <ForgotPassword />
      </FieldSet>
    </Card>
  </section>
}
export default forgotPasswordPage
