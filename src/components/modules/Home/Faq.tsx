// components/faq.tsx
"use client"

import * as React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "What is a bounty?",
      answer: "A bounty is a specific task or project posted by an organization or individual with a predefined reward. It allows developers and creators to earn compensation by completing verifiable goals."
    },
    {
      question: "How do I get started?",
      answer: "Simply connect your wallet, create a profile highlighting your skills, and start browsing available quests. Once you find a match, click 'Apply' or 'Start Quest' to begin."
    },
    {
      question: "What types of projects are available?",
      answer: "We host everything from smart contract audits and UI/UX design challenges to technical writing and community management quests."
    },
    {
      question: "How are payments processed?",
      answer: "Payments are held in secure escrow smart contracts and released automatically once the bounty submitter approves the work, ensuring trust for both parties."
    },
    {
      question: "Can I post my own bounty?",
      answer: "Absolutely. Use the 'Post Bounty' dashboard to define your requirements, set a budget, and attract top-tier global talent to your project."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about the DoQuest ecosystem.
          </p>
        </div>
        
        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card/40 backdrop-blur-sm border border-border rounded-xl px-6 overflow-hidden"
            >
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
