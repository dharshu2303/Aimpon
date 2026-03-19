import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

const carouselItems = [
  {
    title: "Our Vision",
    desc: "To become the go-to digital partner for businesses seeking innovation, efficiency, and scalable technology solutions across every industry.",
    icon: "🚀",
  },
  {
    title: "Our Mission",
    desc: "We architect digital ecosystems that transform ideas into powerful, scalable platforms — from concept to deployment, Aimpon is with you every step.",
    icon: "⚡",
  },
  {
    title: "Our Approach",
    desc: "Combining bleeding-edge technology with human-centered design, we deliver products that not only perform but inspire. Clean code, bold UX, zero compromise.",
    icon: "🎯",
  },
  {
    title: "Our Promise",
    desc: "Every solution we build is future-proof, performance-optimized, and tailored to your unique business DNA. We don't just deliver — we exceed.",
    icon: "💎",
  },
];

const highlights = [
  "Full-Stack Development",
  "Mobile Applications",
  "Digital Marketing",
  "UI/UX Design",
  "Cloud Architecture",
  "24/7 Support",
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + carouselItems.length) % carouselItems.length);
  const next = () => setCurrent((c) => (c + 1) % carouselItems.length);

  return (
    <section id="about" ref={ref} className="relative py-24 px-6 md:px-12 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,100,200,0.1), transparent)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="tagline-chip">Who We Are</span>
          <h2 className="section-title mt-4">About Aimpon</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            <p className="text-base leading-relaxed" style={{ color: "hsl(215,20%,70%)" }}>
              Aimpon Technologies is a full-spectrum digital agency born from the passion to build technology
              that matters. We are a team of developers, designers, and digital strategists who believe that
              great software is the foundation of every great business.
            </p>
            <p className="text-base leading-relaxed" style={{ color: "hsl(215,20%,60%)" }}>
              From crafting stunning landing pages to engineering robust full-stack platforms, we bring
              technical depth and creative thinking to every project. Our strength lies not just in what we
              build — but in understanding why it needs to exist.
            </p>

            {/* Highlights grid */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              {highlights.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.07, duration: 0.4 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle size={14} style={{ color: "hsl(199,89%,48%)", flexShrink: 0 }} />
                  <span className="text-sm" style={{ color: "hsl(215,20%,70%)" }}>
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="btn-primary w-fit mt-2"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Work With Us
            </motion.button>
          </motion.div>

          {/* Right: Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Main card */}
            <div
              className="relative rounded-3xl p-8 min-h-[280px] flex flex-col justify-between overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.03)",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.08), 0 20px 40px rgba(0,0,0,0.4), 0 0 40px rgba(0,100,200,0.1)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Background number watermark */}
              <div
                className="absolute top-4 right-6 font-black text-[120px] leading-none pointer-events-none select-none"
                style={{
                  color: "rgba(0,180,255,0.04)",
                  fontFamily: "monospace",
                }}
              >
                {String(current + 1).padStart(2, "0")}
              </div>

              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-4 relative z-10"
              >
                <span className="text-4xl">{carouselItems[current].icon}</span>
                <h3 className="text-2xl font-bold tracking-tight" style={{ color: "hsl(210,40%,95%)" }}>
                  {carouselItems[current].title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "hsl(215,20%,65%)" }}>
                  {carouselItems[current].desc}
                </p>
              </motion.div>

              {/* Progress dots */}
              <div className="flex items-center justify-between relative z-10 mt-6">
                <div className="flex gap-2">
                  {carouselItems.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className="transition-all duration-300 rounded-full"
                      style={{
                        width: i === current ? "24px" : "6px",
                        height: "6px",
                        background:
                          i === current ? "hsl(199,89%,48%)" : "rgba(255,255,255,0.2)",
                      }}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                    style={{
                      background: "rgba(0,180,255,0.1)",
                      border: "1px solid rgba(0,180,255,0.2)",
                      color: "hsl(199,89%,68%)",
                    }}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={next}
                    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                    style={{
                      background: "rgba(0,180,255,0.15)",
                      border: "1px solid rgba(0,180,255,0.3)",
                      color: "hsl(199,89%,68%)",
                    }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Decorative card behind */}
            <div
              className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl -z-10"
              style={{
                background: "rgba(0,100,200,0.05)",
                border: "1px solid rgba(0,180,255,0.05)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
