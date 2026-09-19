import React from 'react';
import { Button } from "@/components/ui/button";
import { Star, Rocket, ArrowRight } from "lucide-react";

const Cta = () => {
    return (
        <section className="py-24 relative bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                {/* Clean Card using Theme Variables */}
                <div className="bg-card border border-border rounded-3xl p-10 md:p-16 text-center shadow-xl relative overflow-hidden">

                    {/* Solid Primary Accent Top Bar */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-primary rounded-b" />

                    <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-6">
                        Ready to Elevate Your{" "}
                        <span className="text-primary">
                            Development Workflow
                        </span>
                        ?
                    </h2>

                    <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                        Join top developers building high-performance applications. Start your journey today and accelerate your projects with modern tools.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        {/* Primary Action Button */}
                        <Button
                            size="lg"
                            className="bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all duration-200 flex items-center gap-2 text-base py-6 px-8 rounded-xl"
                        >
                            <Rocket className="h-5 w-5" />
                            Get Started
                        </Button>

                        {/* Secondary Outline Button */}
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground font-bold flex items-center gap-2 text-base py-6 px-8 rounded-xl transition-all duration-200"
                        >
                            Explore Features
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Stats Section */}
                    <div className="mt-14 pt-8 border-t border-border flex flex-col sm:flex-row justify-center items-center gap-8 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-primary fill-primary" />
                            <span className="font-bold text-foreground">4.9/5</span> Rating
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-foreground">10,000+</span> Active Developers
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-foreground">99.9%</span> Uptime SLA
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Cta;
