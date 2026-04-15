import LogoIcon from "@/components/logo/LogoIcon"
import ForgotPassword from "@/components/modules/Auth/ForgotPassword"

const fortgotPasswordPage = () => {
    <section className="max-w-7xl mx-auto min-h-svh flex flex-col items-center justify-center">
        <div className="py-5">
            <div className=' font-bold text-3xl inline-flex items-center '>
            <LogoIcon />
                <h3 className='pt-3'>Do<span className='text-primary'>.</span><span>Quest</span></h3>
            </div>
        </div>
        <ForgotPassword />
    </section>
}
export default fortgotPasswordPage