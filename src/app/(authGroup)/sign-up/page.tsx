import LogoIcon from "@/components/logo/LogoIcon";
import SignUpForm from "@/components/modules/Auth/Sign-Up-Form";
interface SignUpParams {
  searchParams: Promise<{ redirect?: string }>;
}

const signUpPage = async ({ searchParams }: SignUpParams) => {
  const params = await searchParams;
  const redirectPath = params.redirect;

  return (
    <section className="min-h-svh flex flex-col md:flex-row">

      {/* =========================================
          LEFT SIDE - Grid System Visual 
          ========================================= */}
      <div className="hidden md:flex lg:w-1/2 relative bg-background overflow-hidden flex-col items-center justify-center p-12">

        {/* Cyberpunk Grid System Background */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Gradient Orbs for Glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 dark:bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/15 dark:bg-secondary/10 rounded-full blur-[120px]"></div>

        {/* Content (No Text Title, just Icon & Typography) */}
        <div className="relative z-10 max-w-sm text-center space-y-8">
          <div className="flex justify-center">
            <div className="p-6 bg-card/60 backdrop-blur-xl border border-border/30 rounded-2xl shadow-[0_0_40px_rgba(99,102,241,0.1)]">
              <LogoIcon width={80} height={80} />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-black text-foreground leading-none tracking-tighter">
              Join the{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                meritocracy
              </span>
            </h1>
            <p className="text-lg text-muted-foreground  leading-relaxed">

              Forge your path in the frontier of digital achievement. Earn high-value rewards by applying
              your elite skills to real-world quests.
            </p>
          </div>

        </div>

        <div className="absolute bottom-10 left-10 text-xs text-muted-foreground uppercase tracking-widest">
          © 2024 DoQuest. The Frontier of Digital Meritocracy.
        </div>
      </div>

      {/* =========================================
          RIGHT SIDE - Form Area 
          ========================================= */}
      <div className="flex-1 relative bg-slate-50 dark:bg-background overflow-hidden flex items-center justify-center p-8 md:p-12 lg:p-16">

        {/* Subtle Grid on right side too, very faint */}
        <div className="absolute inset-0 opacity-[0.07] dark:opacity-[0.05] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="relative z-10 w-full max-w-md">

          {/* Mobile Logo */}
          <div className="md:hidden flex justify-center mb-10">
            <div className="font-bold text-3xl inline-flex items-center gap-2">
              <LogoIcon width={32} height={32} />
              <h3 className="pt-1 text-foreground tracking-tighter">
                Do<span className="text-primary">.</span>Quest
              </h3>
            </div>
          </div>

          {/* Glassmorphic Form Card with Accent Bar */}
          <div className="relative dark:bg-card/80 backdrop-blur-xl border border-border/40 dark:border-border/30 p-8 md:p-4 rounded-xl shadow-xl dark:shadow-2xl overflow-hidden">


            <div className="mb-8 pl-2">
              <h2 className="text-3xl font-bold text-foreground tracking-tight">
                Sign Up
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                Forge your digital identity and start your first quest today.
              </p>
            </div>

            <SignUpForm redirectPath={redirectPath} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default signUpPage;
