import ActiveBounties from "@/components/home/ActiveBounties";
import Cta from "@/components/home/Cta";
import Faq from "@/components/home/Faq";
import Hero from "@/components/home/Hero";
import Service from "@/components/home/Service";
import Image from "next/image";

export default function Home() {
  return (
    <div>
     <Hero />
     {/* We will Add active bounties */}
     <ActiveBounties />
     {/* We will add  services card two*/}
     <Service />
     {/* We will add Faq accordian from shadcn */}
     <Faq />
     {/* we will add CTA */}
     <Cta />
    </div>
  );
}
