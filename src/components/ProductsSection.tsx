import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Star, Cpu, Shield, Zap, Users } from "lucide-react";

const products = [
  {
    id: 1,
    title: "Hostel Management System",
    tagline: "Smart. Scalable. Seamless.",
    desc: "A comprehensive cloud-based platform for managing hostel operations — from room allocation and fee collection to attendance tracking and real-time notifications. Built for institutions that demand efficiency.",
    features: ["Room Allocation", "Fee Management", "Attendance Tracking", "Parent Portal", "Analytics Dashboard", "Mobile App"],
    version: "v2.1.0",
    status: "Live",
    color: "#00b4d8",
    accentColor: "#00d4ff",
    icons: [Cpu, Shield, Zap, Users],
  },
];

function ProductCard({ product, index, isInView }: { product: typeof products[0]; index: number; isInView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouse({ x, y });
    setTilt({
      x: ((e.clientY - rect.top) / rect.height - 0.5) * -8,
      y: ((e.clientX - rect.left) / rect.width - 0.5) * 8,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    const burst = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5,
    }));
    setParticles(burst);
    setTimeout(() => setParticles([]), 900);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setMouse({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1400px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${isHovered ? "12px" : "0px"})`,
        transition: isHovered ? "transform 0.08s linear" : "transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        zIndex: isHovered ? 10 : 1,
      }}
      className="relative"
    >
      {/* Animated conic border */}
      <motion.div
        className="absolute -inset-px rounded-3xl pointer-events-none"
        style={{
          background: isHovered
            ? `conic-gradient(from var(--border-angle, 0deg), transparent 0%, ${product.color} 20%, ${product.accentColor} 40%, transparent 60%)`
            : "transparent",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
        animate={isHovered ? { "--border-angle": ["0deg", "360deg"] } as Record<string, string[]> : {}}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
      />

      {/* Outer glow */}
      <div
        className="absolute -inset-1 rounded-3xl pointer-events-none transition-all duration-500"
        style={{
          background: isHovered
            ? `radial-gradient(ellipse at 50% 100%, ${product.color}30, transparent 60%)`
            : "transparent",
          filter: "blur(15px)",
        }}
      />

      {/* Card body */}
      <div
        className="relative rounded-3xl p-8 md:p-10 overflow-hidden"
        style={{
          background: isHovered
            ? `linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)`
            : "rgba(255,255,255,0.03)",
          boxShadow: isHovered
            ? `0 30px 70px rgba(0,0,0,0.6), 0 0 0 1px ${product.color}40, 0 0 60px ${product.color}15`
            : "0 0 0 1px rgba(255,255,255,0.07), 0 20px 40px rgba(0,0,0,0.4)",
          backdropFilter: "blur(24px)",
          transition: "background 0.3s, box-shadow 0.3s",
        }}
      >
        {/* Mouse spotlight */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-400"
          style={{
            background: `radial-gradient(350px circle at ${mouse.x}% ${mouse.y}%, ${product.color}14, transparent)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Shimmer scan */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute left-0 right-0 h-px pointer-events-none"
              style={{ background: `linear-gradient(90deg, transparent, ${product.color}90, transparent)` }}
              initial={{ top: 0, opacity: 0 }}
              animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "linear" }}
            />
          )}
        </AnimatePresence>

        {/* Particle burst */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
            style={{ left: `${p.x}%`, top: `${p.y}%`, background: product.color, boxShadow: `0 0 4px ${product.color}` }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 1.5, 0], opacity: [1, 0.5, 0], y: -25 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        ))}

        {/* Floating micro icons */}
        <div className="absolute top-6 right-6 flex gap-2">
          {product.icons.map((IconComp, i) => (
            <motion.div
              key={i}
              animate={isHovered ? { y: [0, -4, 0], opacity: 1 } : { y: 0, opacity: 0.3 }}
              transition={{ delay: i * 0.1, duration: 1.5, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{
                background: `${product.color}15`,
                border: `1px solid ${product.color}25`,
              }}
            >
              <IconComp size={13} style={{ color: product.color }} />
            </motion.div>
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-8">
          {/* Left */}
          <div className="flex-1 flex flex-col gap-5">
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded"
                style={{
                  background: `${product.color}15`,
                  color: product.color,
                  border: `1px solid ${product.color}30`,
                }}
              >
                {product.version}
              </span>
              <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider" style={{ color: "#4ade80" }}>
                <motion.span
                  className="w-1.5 h-1.5 rounded-full"
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ background: "#4ade80", display: "inline-block" }}
                />
                {product.status}
              </span>
            </div>

            <div>
              <motion.h3
                animate={isHovered ? { x: 4 } : { x: 0 }}
                transition={{ duration: 0.3 }}
                className="text-3xl font-black tracking-tight"
                style={{
                  letterSpacing: "-0.03em",
                  background: isHovered
                    ? `linear-gradient(135deg, #fff 20%, ${product.accentColor})`
                    : "linear-gradient(135deg, #fff 40%, hsl(199,89%,68%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textShadow: isHovered ? `0 0 30px ${product.color}40` : "none",
                  transition: "all 0.3s",
                }}
              >
                {product.title}
              </motion.h3>
              <p
                className="text-sm mt-1 tracking-wide"
                style={{ color: product.color, fontStyle: "italic" }}
              >
                {product.tagline}
              </p>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: isHovered ? "hsl(215,20%,70%)" : "hsl(215,20%,58%)" }}>
              {product.desc}
            </p>

            {/* Stars */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={isHovered ? { scale: [1, 1.3, 1], rotate: [0, 10, 0] } : { scale: 1 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Star
                    size={14}
                    fill={i < 4 ? product.color : "transparent"}
                    style={{ color: product.color, filter: isHovered ? `drop-shadow(0 0 4px ${product.color})` : "none" }}
                  />
                </motion.div>
              ))}
              <span className="text-xs ml-2" style={{ color: "hsl(215,20%,55%)" }}>4.9 / 5.0</span>
            </div>

            <div className="flex gap-3 flex-wrap">
              <motion.button
                className="btn-primary flex items-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: `0 0 25px ${product.color}60` }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Request Demo <ExternalLink size={14} />
              </motion.button>
              <motion.button
                className="btn-ghost"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn More
              </motion.button>
            </div>
          </div>

          {/* Right: Features */}
          <div className="flex-shrink-0 w-full md:w-72">
            <p className="text-xs uppercase tracking-widest mb-4 font-medium" style={{ color: "hsl(215,20%,50%)" }}>
              Core Features
            </p>
            <div className="grid grid-cols-2 gap-2">
              {product.features.map((feat, i) => (
                <motion.div
                  key={feat}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  whileHover={{ scale: 1.05, x: 2 }}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium cursor-default"
                  style={{
                    background: isHovered ? `${product.color}12` : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isHovered ? product.color + "30" : "rgba(255,255,255,0.06)"}`,
                    color: isHovered ? "hsl(215,20%,80%)" : "hsl(215,20%,65%)",
                    boxShadow: isHovered ? `0 0 10px ${product.color}15` : "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: product.color }}
                    animate={isHovered ? { scale: [1, 1.5, 1] } : { scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.8, repeat: isHovered ? Infinity : 0 }}
                  />
                  {feat}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floor shadow */}
      <div
        className="absolute -bottom-4 left-8 right-8 h-8 rounded-full pointer-events-none transition-all duration-500"
        style={{
          background: `radial-gradient(ellipse, ${product.color}25, transparent 70%)`,
          filter: "blur(10px)",
          opacity: isHovered ? 1 : 0,
        }}
      />
    </motion.div>
  );
}

export default function ProductsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="products" ref={ref} className="relative py-24 px-6 md:px-12 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,80,180,0.07), transparent)" }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="tagline-chip">What We've Built</span>
          <h2 className="section-title mt-4">Our Products</h2>
          <p className="mt-3 text-sm max-w-lg" style={{ color: "hsl(215,20%,55%)" }}>
            Battle-tested platforms built for scale, designed for impact. Hover to feel the depth.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6" style={{ perspective: "1800px" }}>
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} isInView={isInView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-6 flex items-center justify-center"
        >
          <div
            className="px-6 py-3 rounded-2xl text-sm"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px dashed rgba(0,180,255,0.2)",
              color: "hsl(215,20%,50%)",
            }}
          >
            🚀 More products coming soon — Stay tuned
          </div>
        </motion.div>
      </div>
    </section>
  );
}
