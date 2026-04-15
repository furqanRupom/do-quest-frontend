
"use client"
import * as React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Faq = () => {
    const faqs = [
        {
            question: "What is a bounty?",
            answer: "A bounty is a reward offered for completing a specific task or project. It can range from coding challenges to creative projects, with predetermined rewards for successful completion."
        },
        {
            question: "How do I get started?",
            answer: "Simply sign up for an account, browse available bounties that match your skills, and submit your work. Once approved, you'll receive your reward directly to your wallet."
        },
        {
            question: "What types of projects are available?",
            answer: "We offer a wide variety of projects including web development, mobile apps, design work, content writing, marketing tasks, and more. There's something for every skill level."
        },
        {
            question: "How are payments processed?",
            answer: "Payments are processed securely through our platform. Once your submission is approved by the bounty creator, funds are automatically transferred to your wallet within 24 hours."
        },
        {
            question: "Can I post my own bounty?",
            answer: "Absolutely! You can post bounties for any legitimate project or task. Set your requirements, deadline, and reward amount, then let our community of skilled professionals compete to deliver the best solution."
        }
    ];
    return (
        <div>
            <section className="py-16 ">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300">
                            Everything you need to know about bounties and quests
                        </p>
                    </div>

                    <Accordion  type="single"  collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem  key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

        </div>
    );
};

export default Faq;