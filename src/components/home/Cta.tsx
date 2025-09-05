import React from 'react';
import { Button } from "@/components/ui/button";
import { Star,  } from "lucide-react";
const Cta = () => {
    return (
        <div>
            <section className="py-16 bg-primary">
                <div className="max-w-4xl mx-auto px-4 text-center ">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Join thousands of creators and earn from your skills. Start your journey today!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary">
                            Sign Up Now
                        </Button>
                        <Button size="lg" variant="secondary">
                            Learn More
                        </Button>
                    </div>
                    <div className="mt-8 flex justify-center items-center gap-8 text-sm opacity-80">
                        <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 fill-current" />
                            4.9/5 Rating
                        </div>
                        <div>10,000+ Happy Users</div>
                        <div>$500K+ Paid Out</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Cta;