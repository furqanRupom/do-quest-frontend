"use client"
import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Plus, ArrowRight } from "lucide-react";


const Service: React.FunctionComponent = () => {
    return (
        <section className="py-16 ">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Built for Everyone
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Whether posting work or finding opportunities, we've got you covered.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* For Bounty Posters */}
                    <Card className="text-center hover:shadow-lg transition-shadow p-6">
                        <CardHeader>
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                    <Plus className="h-8 w-8 text-blue-600" />
                                </div>
                            </div>
                            <CardTitle className="text-2xl mb-4">For Bounty Posters</CardTitle>
                            <CardDescription className="text-lg">
                                Need something built? Post your project and get high-quality submissions from skilled professionals worldwide.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="space-y-3 text-left">
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                    <span>Set your budget and timeline</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                    <span>Receive multiple solutions</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                    <span>Pay only when satisfied</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                    <span>Access global talent pool</span>
                                </li>
                            </ul>
                            <Button className="w-full mt-6" size="lg">
                                Post a Bounty
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>

                    {/* For Bounty Hunters */}
                    <Card className="text-center hover:shadow-lg transition-shadow p-6">
                        <CardHeader>
                            <div className="flex justify-center mb-6">
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                    <Search className="h-8 w-8 text-green-600" />
                                </div>
                            </div>
                            <CardTitle className="text-2xl mb-4">For Bounty Hunters</CardTitle>
                            <CardDescription className="text-lg">
                                Ready to showcase your skills? Browse exciting projects and earn money doing what you love.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="space-y-3 text-left">
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                    <span>Choose projects you love</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                    <span>Work on your own schedule</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                    <span>Build your portfolio</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                    <span>Get paid securely</span>
                                </li>
                            </ul>
                            <Button className="w-full mt-6" size="lg" variant="outline">
                                Browse Bounties
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
};

export default Service;