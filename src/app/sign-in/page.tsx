import LogoIcon from "@/components/logo/LogoIcon"
import SignInForm from "@/components/sign-in/sign-in-form"
import { Card } from "@/components/ui/card"
import { FieldDescription,  FieldLegend, FieldSet } from "@/components/ui/field"


const signInPage = () => {
    return <section className="max-w-7xl mx-auto min-h-svh flex flex-col items-center justify-center">
        <div className="py-5">
            <div className=' font-bold text-3xl inline-flex items-center '>
                <LogoIcon />
                <h3 className='pt-3'>Do<span className='text-primary'>.</span><span>Quest</span></h3>
            </div>
        </div>
      <Card className="max-w-lg w-full p-7">
            <FieldSet>
                <FieldLegend className="mx-auto font-bold"><h3 className=" text-2xl ">Welcome back!</h3></FieldLegend>
                <FieldDescription className="text-center">Sign in to your account to continue.</FieldDescription>
             <SignInForm />
            </FieldSet> 
      </Card>
    </section>
}
export default signInPage