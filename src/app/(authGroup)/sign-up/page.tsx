import LogoIcon from "@/components/logo/LogoIcon";
import SignUpForm from "@/components/modules/Auth/Sign-Up-Form";
import { Card } from "@/components/ui/card";
import { FieldDescription, FieldLegend, FieldSet } from "@/components/ui/field";

interface SignUpParams {
  searchParams: Promise<{ redirect?: string }>;
}

const signUpPage = async ({ searchParams }: SignUpParams) => {
  const params = await searchParams;
  const redirectPath = params.redirect;

  return (
    <section className="min-h-svh flex">
      {/* Left Side - Vector Dots Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-zinc-100 dark:bg-zinc-900 relative overflow-hidden flex-col items-center justify-center p-12">
        
        {/* Vector Dots Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#a1a1aa_1px,transparent_1px)] dark:bg-[radial-gradient(#52525b_1px,transparent_1px)] [background-size:28px_28px]" />

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-white/60 dark:from-zinc-900/80 dark:via-transparent dark:to-zinc-900/60" />

        {/* Content */}
        <div className="relative z-10 max-w-md text-center">
          <div className="flex justify-center mb-10">
            <div className="font-bold text-5xl inline-flex items-center">
              <LogoIcon className="text-primary" />
              <span className="pt-3 text-zinc-900 dark:text-white">
                Do<span className="text-primary">.</span>Quest
              </span>
            </div>
          </div>

                    
          <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
            Create your account and start your learning journey with exciting quests, 
            progress tracking, and skill development.
          </p>

          <div className="w-20 h-0.5 bg-primary/20 mx-auto mt-12 rounded" />

          <div className="mt-10 text-sm text-zinc-500 dark:text-zinc-500">
            Start learning smarter • Track your progress • Achieve more
          </div>
        </div>

        <div className="absolute bottom-10 left-10 text-xs text-zinc-500 dark:text-zinc-500">
          © 2026 DoQuest
        </div>
      </div>

      {/* Right Side - Form Area */}
      <div className="flex-1 flex items-center justify-center bg-white dark:bg-zinc-950 p-6">
        <div className="w-full max-w-lg">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="font-bold text-3xl inline-flex items-center">
              <LogoIcon />
              <h3 className="pt-3">
                Do<span className="text-primary">.</span>Quest
              </h3>
            </div>
          </div>

          <Card className="p-8 shadow-lg border border-zinc-200 dark:border-zinc-800">
            <FieldSet>
              <FieldLegend className="mx-auto font-bold text-center">
                <h3 className="text-3xl">Create Account</h3>
              </FieldLegend>
              <FieldDescription className="text-center text-muted-foreground mt-2 mb-8">
                Get started in less than 60 seconds
              </FieldDescription>

              <SignUpForm redirectPath={redirectPath} />
            </FieldSet>
          </Card>

        </div>
      </div>
    </section>
  );
};

export default signUpPage;
