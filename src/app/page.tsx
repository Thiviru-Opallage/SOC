import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import AboutSection from "@/components/sections/AboutSection";
import Footer from "@/components/Footer";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import TeamSection from "@/components/sections/TeamSection";
import WhyUsSection from "@/components/sections/WhyUsSection";

export default function Home() {
  return (
    <main className="relative bg-[#EFE9E1]">
      <Navbar />
      
      <section id="home">
        <HeroSection />
      </section>
      
      <section id="services">
        <ServicesSection />
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <TeamSection />
      <WhyUsSection />
      <section id="contact">
        <ContactSection />
      </section>
      <FAQSection />
      <Footer />
    </main>
  );
}