import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProductsSection from "@/components/ProductsSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import GlitterFooter from "@/components/GlitterFooter";

const sections = ["home", "about", "services", "products", "team", "contact"];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3;

      // Check home
      if (scrollY < window.innerHeight / 2) {
        setActiveSection("home");
        return;
      }

      for (const id of sections.slice(1)) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollY >= top && scrollY < bottom) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen">
      <HeroSection activeSection={activeSection} onNavigate={setActiveSection} />
      <AboutSection />
      <ServicesSection />
      <ProductsSection />
      <TeamSection />
      <ContactSection />
      <GlitterFooter />
    </div>
  );
}
