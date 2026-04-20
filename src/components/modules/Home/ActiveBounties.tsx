"use client"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ActiveBounties() {
    return (
        <div>
            <section className="py-16 border-b bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Trending Bounties
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            Check out these opportunities - you might be the perfect fit!
                        </p>
                    </div>

                    {/* Empty State */}
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <div className="mb-6">
                                <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                                    <Plus className="w-12 h-12 text-gray-400" />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                No active bounties
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-8">
                                Be the first to post a bounty and start getting high-quality submissions.
                            </p>


                    <div className="flex justify-center items-center gap-3">
                         <Button
                            size="lg"
                            className=" cursor-pointer px-5 py-2 text-md font-bold shadow-lg shadow-primary/20 scale-95 active:scale-90 transition-all duration-300 hover:brightness-110 gap-1.5 "
                        >
                            <Plus className="w-5 h-5" />
                            <span className=''>Post Bounty</span>
                        </Button>
                    </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
