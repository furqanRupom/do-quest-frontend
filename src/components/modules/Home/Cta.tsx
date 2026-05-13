import React from 'react';
import { Button } from "@/components/ui/button";
import { Star, Rocket, ArrowRight } from "lucide-react";

const Cta = () => {
    return (
        <section className="py-20 relative bg-background overflow-hidden">
            {/* Background Gradient Glows */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(circle_at_center,var(--primary),transparent_70%)]" />
                <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(circle_at_center,var(--secondary),transparent_70%)]" />
            </div>

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                {/* Glassmorphic Card */}
                <div className="bg-card border border-border backdrop-blur-xl rounded-3xl p-12 md:p-16 text-center shadow-2xl relative overflow-hidden">
                    
                    {/* Inner subtle highlight */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

                    <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-5">
                        Ready to{" "}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Claim Your Bounty
                        </span>
                        ?
                    </h2>
                    
                    <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of creators earning from their skills. Start your journey today and turn your expertise into rewards.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {/* Primary Action Button with Glow */}
                        <Button 
                            size="lg" 
                            className="bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold hover:shadow-[0_0_30px_rgba(0,245,255,0.3)] transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 text-base py-6 px-8"
                        >
                            <Rocket className="h-5 w-5" />
                            Get Started
                        </Button>

                        {/* Secondary Outline Button */}
                        <Button 
                            size="lg" 
                            variant="outline" 
                            className="border-border text-foreground hover:bg-accent/10 font-bold flex items-center gap-2 text-base py-6 px-8"
                        >
                            Learn More 
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Stats Section */}
                    <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Star className="h-4 w-4 text-primary fill-primary" />
                            <span className="font-bold text-foreground">4.9/5</span> Rating
                        </div>
                        <div>
                            <span className="font-bold text-foreground">10,000+</span> Happy Hunters
                        </div>
                        <div>
                            <span className="font-bold text-foreground">$500K+</span> Paid Out
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cta;
