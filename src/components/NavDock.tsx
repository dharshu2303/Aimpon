import { motion } from "framer-motion";
import { Home, Info, Briefcase, Package, Users, Mail } from "lucide-react";

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "about", icon: Info, label: "About" },
  { id: "services", icon: Briefcase, label: "Services" },
  { id: "products", icon: Package, label: "Products" },
  { id: "team", icon: Users, label: "Team" },
  { id: "contact", icon: Mail, label: "Contact" },
];

interface NavDockProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export default function NavDock({ activeSection, onNavigate }: NavDockProps) {
  const scrollToSection = (id: string) => {
    onNavigate(id);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        backdropFilter: "blur(20px)",
        background: "rgba(255,255,255,0.05)",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.4)",
      }}
      className="flex items-center gap-1 px-4 py-2 rounded-2xl"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;

        return (
          <motion.button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl cursor-pointer group"
            whileHover={{ scale: 1.2, y: -5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            style={{
              background: isActive ? "rgba(0,180,255,0.15)" : "transparent",
            }}
          >
            {/* Glow bg on hover */}
            <motion.div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "rgba(0,180,255,0.08)" }}
            />

            <Icon
              size={20}
              style={{
                color: isActive ? "hsl(199, 89%, 68%)" : "hsl(215, 20%, 65%)",
                filter: isActive ? "drop-shadow(0 0 6px hsl(199, 89%, 48%))" : "none",
                transition: "all 0.3s ease",
              }}
              className="group-hover:text-primary relative z-10"
            />
            <span
              className="text-[10px] font-medium relative z-10 transition-all duration-300"
              style={{
                color: isActive ? "hsl(199, 89%, 68%)" : "hsl(215, 20%, 55%)",
              }}
            >
              {item.label}
            </span>

            {/* Active dot */}
            {isActive && (
              <motion.div
                layoutId="nav-active"
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                style={{ background: "hsl(199, 89%, 48%)" }}
              />
            )}
          </motion.button>
        );
      })}
    </motion.nav>
  );
}
