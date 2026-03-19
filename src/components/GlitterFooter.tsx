import { motion } from "framer-motion";

export default function GlitterFooter() {
  return (
    <footer
      className="relative"
      style={{ paddingBottom: "48px" }}
    >
      {/* Main footer content */}
      <div className="relative z-10 px-6 md:px-12 py-12 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span
              className="font-black text-xl tracking-tight"
              style={{
                background: "linear-gradient(135deg, #ffffff, hsl(199,89%,68%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Aimpon Technologies
            </span>
            <span className="text-xs" style={{ color: "hsl(215,20%,45%)" }}>
              Innovate · Ideate · Inspire
            </span>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-xs" style={{ color: "hsl(215,20%,50%)" }}>
            {["Home", "About", "Services", "Products", "Team", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="transition-colors duration-200 hover:text-primary"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(link.toLowerCase());
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  else window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-xs" style={{ color: "hsl(215,20%,40%)" }}>
            © {new Date().getFullYear()} Aimpon Technologies
          </div>
        </div>
      </div>

      {/* Fixed glitter bottom bar */}
      <div
        className="fixed bottom-0 left-0 w-full h-12 pointer-events-none z-50"
        style={{
          background: "transparent",
          boxShadow: "0 -20px 50px -10px hsla(199, 89%, 48%, 0.35)",
        }}
      >
        {/* Noise/glitter texture overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: "100px 100px",
            mixBlendMode: "overlay",
            opacity: 0.6,
          }}
        />

        {/* Scanning line animation */}
        <motion.div
          className="absolute top-0 left-0 w-full h-px"
          style={{
            background: "linear-gradient(90deg, transparent 0%, hsla(199,89%,68%,0.8) 50%, transparent 100%)",
          }}
          animate={{ scaleX: [0.3, 1, 0.3], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Particle dots */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              background: "hsla(199,89%,68%,0.8)",
              boxShadow: "0 0 4px hsla(199,89%,68%,0.8)",
            }}
            animate={{
              y: [0, -6, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2 + i * 0.3,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </footer>
  );
}
