import LogoIcon from "@/components/logo/LogoIcon"

import { Card } from "@/components/ui/card"
import { FieldDescription, FieldLegend, FieldSet } from "@/components/ui/field"
import ResetPassword from "@/components/modules/Auth/ResetPassword"


const resetPasswordPage = () => {
    return <section className="max-w-7xl mx-auto min-h-svh flex flex-col items-center justify-center">
        <div className="py-5">
            <div className=' font-bold text-3xl inline-flex items-center '>
                <LogoIcon />
                <h3 className='pt-3'>Do<span className='text-primary'>.</span><span>Quest</span></h3>
            </div>
        </div>
        <Card className="max-w-lg w-full p-7">
            <FieldSet>
                <FieldLegend className="mx-auto font-bold"><h3 className=" text-2xl ">Reset Password?</h3></FieldLegend>
                <FieldDescription className="text-center">Change your password below.</FieldDescription>
                <ResetPassword />
            </FieldSet>
        </Card>
    </section>
}
export default resetPasswordPage