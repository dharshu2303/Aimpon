import { motion } from "framer-motion";
import { Suspense, lazy } from "react";
import NavDock from "./NavDock";
import aimponLogo from "@/assets/logo.png";

const TechScene = lazy(() => import("./TechScene"));

interface HeroSectionProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export default function HeroSection({ activeSection, onNavigate }: HeroSectionProps) {
  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 70% 50%, rgba(0,100,200,0.12), transparent), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(0,60,120,0.08), transparent)",
        }}
      />

      {/* Top bar: Logo + NavDock */}
      <div className="relative z-20 flex items-center justify-between px-6 pt-6 md:px-12">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3"
        >
          <img src={aimponLogo} alt="Aimpon Technologies Logo" className="h-20 w-auto object-contain" style={{ filter: "drop-shadow(0 0 12px rgba(0,180,255,0.4))" }} />
        </motion.div>

        {/* Nav Dock — centered */}
        <div className="hidden md:block">
          <NavDock activeSection={activeSection} onNavigate={onNavigate} />
        </div>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="btn-primary hidden md:block text-xs"
          onClick={() => {
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Get Started
        </motion.button>
      </div>

      {/* Mobile NavDock */}
      <div className="md:hidden flex justify-center pt-4 px-4 relative z-20">
        <NavDock activeSection={activeSection} onNavigate={onNavigate} />
      </div>

      {/* Main hero content */}
      <div className="flex-1 flex items-center relative z-10">
        <div className="w-full grid md:grid-cols-2 gap-8 px-6 md:px-12 py-12 items-center">
          {/* Left: Text content */}
          <div className="flex flex-col gap-6 md:order-1 order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="tagline-chip">Innovate · Ideate · Inspire</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-black leading-none tracking-tight"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                letterSpacing: "-0.04em",
                background: "linear-gradient(135deg, #ffffff 40%, hsl(199,89%,68%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Engineering
              <br />
              <span className="photon-text">the Next</span>
              <br />
              Dimension.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-base leading-relaxed max-w-lg"
              style={{ color: "hsl(215,20%,65%)" }}
            >
              We don't just build software; we architect digital ecosystems. From Hostel Management to
              Full-Stack scale, Aimpon Technologies turns ideation into infrastructure. Every pixel crafted
              with precision, every system engineered for tomorrow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4"
            >
              <button
                className="btn-primary"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explore Services
              </button>
              <button
                className="btn-ghost"
                onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn More
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="flex gap-8 pt-4"
            >
              {[
                { value: "50+", label: "Projects Delivered" },
                { value: "30+", label: "Happy Clients" },
                { value: "5+", label: "Years Experience" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold photon-text">{stat.value}</div>
                  <div className="text-xs mt-0.5" style={{ color: "hsl(215,20%,55%)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: 3D Scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="h-[400px] md:h-[550px] md:order-2 order-1 relative"
          >
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center">
                  <div
                    className="w-24 h-24 rounded-full animate-pulse-glow"
                    style={{ background: "rgba(0,180,255,0.1)" }}
                  />
                </div>
              }
            >
              <TechScene />
            </Suspense>

            {/* Floating label */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 glass-card px-4 py-2 flex items-center gap-2"
            >
              <div
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "hsl(199,89%,68%)" }}
              />
              <span className="text-xs font-mono" style={{ color: "hsl(199,89%,68%)" }}>
                SYSTEM ONLINE
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] tracking-widest uppercase" style={{ color: "hsl(215,20%,45%)" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-0.5 h-8 rounded-full"
          style={{ background: "linear-gradient(to bottom, hsl(199,89%,48%), transparent)" }}
        />
      </motion.div>
    </section>
  );
}
