import ActiveBounties from "@/components/modules/Home/ActiveBounties";
import Cta from "@/components/modules/Home/Cta";
import Faq from "@/components/modules/Home/Faq";
import Hero from "@/components/modules/Home/Hero";
import Service from "@/components/modules/Home/Service";


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
