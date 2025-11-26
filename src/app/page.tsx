import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Event from "@/components/Event";
import Speakers from "@/components/Speakers";
import FAQs from "@/components/FAQs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import About from "@/components/About";
import LiveStats from "@/components/LiveStats";
import EventSchedule from "@/components/EventSchedule";
import ApplicationSection from "@/components/ApplicationSection";
import TestimonialSlider from "@/components/TestimonialSlider";
import PartnersSection from "@/components/PartnersSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Event />
      <About/>
      <LiveStats />
      <EventSchedule/>
      <Speakers />
      <TestimonialSlider/>
      <PartnersSection/>
      <FAQs />
      <ApplicationSection />
      <Footer />
    </div>
  );
}
