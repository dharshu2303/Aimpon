import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  Smartphone,
  Globe,
  Code2,
  TrendingUp,
  Palette,
  ArrowRight,
  Zap,
  Star,
} from "lucide-react";

const services = [
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "Cross-platform mobile apps built with React Native and Flutter. Stunning UX, native performance.",
    color: "#00b4d8",
    accentColor: "#48cae4",
    number: "01",
    features: ["iOS & Android", "React Native", "Flutter", "App Store Deploy"],
    stat: "50+ Apps Built",
  },
  {
    icon: Globe,
    title: "Landing Pages",
    desc: "High-converting landing pages that turn visitors into customers. Pixel-perfect, blazing fast.",
    color: "#0096c7",
    accentColor: "#00b4d8",
    number: "02",
    features: ["Conversion Focused", "SEO Optimized", "Fast Load", "A/B Ready"],
    stat: "3x Avg Conversion",
  },
  {
    icon: Code2,
    title: "Full-Stack Development",
    desc: "End-to-end web applications with powerful backends, clean APIs, and stunning frontends.",
    color: "#00d4ff",
    accentColor: "#90e0ef",
    number: "03",
    features: ["React / Next.js", "Node.js", "Database Design", "Cloud Deploy"],
    stat: "100% Uptime SLA",
  },
  {
    icon: TrendingUp,
    title: "Social Media Marketing",
    desc: "Data-driven social strategies that amplify your brand, grow your audience, and drive results.",
    color: "#48cae4",
    accentColor: "#ade8f4",
    number: "04",
    features: ["Content Strategy", "Paid Ads", "Analytics", "Growth Hacking"],
    stat: "10x Reach Growth",
  },
  {
    icon: Palette,
    title: "Poster Designing",
    desc: "Captivating visual designs that tell your brand story. Eye-catching posters for digital and print.",
    color: "#90e0ef",
    accentColor: "#caf0f8",
    number: "05",
    features: ["Brand Identity", "Print Ready", "Digital Assets", "Quick Turnaround"],
    stat: "200+ Designs Done",
  },
];

interface ServiceCardProps {
  service: (typeof services)[0];
  index: number;
  isInView: boolean;
}

function ServiceCard({ service, index, isInView }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  const Icon = service.icon;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouse({ x, y });
    setTilt({
      x: ((e.clientY - rect.top) / rect.height - 0.5) * -20,
      y: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
    });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    // Spawn sparkles
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const newSparkles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setSparkles(newSparkles);
    setTimeout(() => setSparkles([]), 700);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setMouse({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative cursor-pointer group"
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${isHovered ? "10px" : "0px"})`,
        transition: isHovered
          ? "transform 0.08s linear"
          : "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
        zIndex: isHovered ? 10 : 1,
      }}
    >
      {/* Outer glow ring (3D depth layer) */}
      <div
        className="absolute -inset-px rounded-2xl transition-all duration-500"
        style={{
          background: isHovered
            ? `linear-gradient(135deg, ${service.color}80, transparent 50%, ${service.accentColor}40)`
            : "transparent",
          boxShadow: isHovered
            ? `0 0 30px ${service.color}50, 0 0 60px ${service.color}20, inset 0 0 30px ${service.color}10`
            : "none",
          borderRadius: "17px",
        }}
      />

      {/* Card body */}
      <div
        className="relative rounded-2xl p-6 h-full flex flex-col gap-4 overflow-hidden"
        style={{
          background: isHovered
            ? `linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)`
            : "rgba(255,255,255,0.03)",
          boxShadow: isHovered
            ? `0 25px 50px rgba(0,0,0,0.6), 0 0 0 1px ${service.color}50`
            : "0 0 0 1px rgba(255,255,255,0.08), 0 8px 24px rgba(0,0,0,0.4)",
          backdropFilter: "blur(16px)",
          transition: "background 0.3s, box-shadow 0.3s",
        }}
      >
        {/* Mouse-follow spotlight */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(280px circle at ${mouse.x}% ${mouse.y}%, ${service.color}20, transparent)`,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.4s",
          }}
        />

        {/* Shimmer scan line on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              key="shimmer"
              className="absolute left-0 right-0 h-px pointer-events-none"
              style={{ background: `linear-gradient(90deg, transparent, ${service.color}80, transparent)` }}
              initial={{ top: "-2%", opacity: 0 }}
              animate={{ top: "102%", opacity: [0, 1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "linear" }}
            />
          )}
        </AnimatePresence>

        {/* Sparkles */}
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            className="absolute w-1 h-1 rounded-full pointer-events-none"
            style={{ left: `${s.x}%`, top: `${s.y}%`, background: service.color }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 1.5, 0], opacity: [1, 1, 0], y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}

        {/* Number watermark */}
        <div
          className="absolute -top-3 -right-2 font-black text-[5rem] leading-none pointer-events-none select-none transition-all duration-500"
          style={{
            color: isHovered ? `${service.color}15` : `${service.color}06`,
            fontFamily: "monospace",
            transform: isHovered ? "translateZ(20px)" : "translateZ(0)",
          }}
        >
          {service.number}
        </div>

        {/* Content — z-indexed above overlays */}
        <div className="relative z-10 flex flex-col gap-4 h-full">
          {/* Icon with 3D float */}
          <motion.div
            animate={isHovered ? { y: -4, scale: 1.1 } : { y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-14 h-14 rounded-2xl flex items-center justify-center relative"
            style={{
              background: isHovered
                ? `linear-gradient(135deg, ${service.color}35, ${service.color}15)`
                : `${service.color}15`,
              boxShadow: isHovered
                ? `0 8px 24px ${service.color}50, 0 0 0 1px ${service.color}40, inset 0 1px 0 ${service.color}30`
                : `0 0 0 1px ${service.color}20`,
              transition: "background 0.3s, box-shadow 0.3s",
            }}
          >
            <Icon
              size={26}
              style={{
                color: service.color,
                filter: isHovered ? `drop-shadow(0 0 10px ${service.color}) drop-shadow(0 0 20px ${service.color}80)` : "none",
                transition: "filter 0.3s",
              }}
            />
            {/* Icon inner ring on hover */}
            {isHovered && (
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{ border: `1px solid ${service.color}50` }}
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: [0, 1, 0], scale: [1.2, 1, 1.3] }}
                transition={{ duration: 0.6, repeat: 2 }}
              />
            )}
          </motion.div>

          {/* Title */}
          <motion.h3
            animate={isHovered ? { x: 3 } : { x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-lg font-bold tracking-tight"
            style={{
              color: isHovered ? "#fff" : "hsl(210,40%,90%)",
              textShadow: isHovered ? `0 0 20px ${service.color}60` : "none",
              transition: "color 0.3s, text-shadow 0.3s",
            }}
          >
            {service.title}
          </motion.h3>

          <p
            className="text-sm leading-relaxed flex-1 transition-colors duration-300"
            style={{ color: isHovered ? "hsl(215,20%,72%)" : "hsl(215,20%,55%)" }}
          >
            {service.desc}
          </p>

          {/* Stat badge */}
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={isHovered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 6, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-1.5 w-fit px-3 py-1.5 rounded-xl"
            style={{
              background: `${service.color}20`,
              border: `1px solid ${service.color}40`,
            }}
          >
            <Zap size={11} style={{ color: service.color }} />
            <span className="text-[11px] font-semibold" style={{ color: service.color }}>
              {service.stat}
            </span>
          </motion.div>

          {/* Features */}
          <div className="flex flex-wrap gap-1.5">
            {service.features.map((f, fi) => (
              <motion.span
                key={f}
                animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                transition={{ delay: fi * 0.04 }}
                className="text-[10px] px-2.5 py-1 rounded-full font-medium transition-all duration-300"
                style={{
                  background: isHovered ? `${service.color}25` : `${service.color}12`,
                  color: service.color,
                  border: `1px solid ${isHovered ? service.color + "50" : service.color + "25"}`,
                  boxShadow: isHovered ? `0 0 8px ${service.color}30` : "none",
                }}
              >
                {f}
              </motion.span>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            animate={isHovered ? { x: 0, opacity: 1 } : { x: -4, opacity: 0.7 }}
            whileHover={{ x: 6 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-2 text-sm font-bold mt-1 w-fit group/btn"
            style={{ color: service.color }}
            onClick={(e) => {
              e.stopPropagation();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Avail Service
            <motion.span
              animate={isHovered ? { x: [0, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
            >
              <ArrowRight size={15} />
            </motion.span>
          </motion.button>
        </div>
      </div>

      {/* Shadow cast (fake 3D floor shadow) */}
      <div
        className="absolute -bottom-3 left-4 right-4 h-6 rounded-full pointer-events-none transition-all duration-500"
        style={{
          background: `radial-gradient(ellipse, ${service.color}30, transparent 70%)`,
          filter: "blur(8px)",
          opacity: isHovered ? 1 : 0,
          transform: "translateZ(-10px)",
        }}
      />
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" ref={ref} className="relative py-24 px-6 md:px-12 overflow-hidden">
      {/* Background glows */}
      <div
        className="absolute right-0 top-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,100,200,0.07), transparent)", filter: "blur(100px)" }}
      />
      <div
        className="absolute left-0 bottom-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,60,140,0.06), transparent)", filter: "blur(80px)" }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <span className="tagline-chip">What We Do</span>
            <h2 className="section-title mt-4">Our Services</h2>
          </div>
          <p className="text-sm max-w-xs" style={{ color: "hsl(215,20%,50%)" }}>
            Hover each card to experience the full effect. Comprehensive solutions that accelerate growth.
          </p>
        </motion.div>

        {/* Cards grid — perspective container */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: "2000px" }}
        >
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
