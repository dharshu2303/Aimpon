import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Linkedin, Twitter, Code, Sparkles } from "lucide-react";

const codeLines = [
  "const build = async () => {",
  "  const dream = await ideate();",
  "  const code = transform(dream);",
  "  return deploy(code);",
  "};",
  "",
  "function innovate(idea) {",
  "  return idea.map(i =>",
  "    engineer(i).then(ship)",
  "  );",
  "}",
  "",
  "// Aimpon Technologies",
  "class Developer extends Human {",
  "  solve(problem) {",
  "    return this.think()",
  "      .code().deploy();",
  "  }",
  "}",
  "",
  "const future = build();",
  "future.then(success => {",
  "  celebrate(success);",
  "});",
  "",
  "// v2.0 — Next Dimension",
  "export { Aimpon };",
];

const team = [
  {
    name: "Arjun Patel",
    role: "Founder & CEO",
    bio: "Visionary leader driving Aimpon's mission to revolutionize digital solutions.",
    initials: "AP",
    color: "#00b4d8",
    links: { github: "#", linkedin: "#", twitter: "#" },
    skill: "Strategy",
  },
  {
    name: "Sneha Sharma",
    role: "CTO & Lead Dev",
    bio: "Full-stack architect with expertise in scalable systems and cloud infrastructure.",
    initials: "SS",
    color: "#0096c7",
    links: { github: "#", linkedin: "#", twitter: "#" },
    skill: "Architecture",
  },
  {
    name: "Ravi Kumar",
    role: "UI/UX Lead",
    bio: "Creative designer crafting pixel-perfect interfaces with outstanding user experience.",
    initials: "RK",
    color: "#48cae4",
    links: { github: "#", linkedin: "#", twitter: "#" },
    skill: "Design",
  },
  {
    name: "Priya Nair",
    role: "Marketing Director",
    bio: "Digital marketing strategist growing brands with data-driven, creative campaigns.",
    initials: "PN",
    color: "#90e0ef",
    links: { github: "#", linkedin: "#", twitter: "#" },
    skill: "Growth",
  },
  {
    name: "Vikram Reddy",
    role: "Backend Engineer",
    bio: "Systems engineer building robust APIs, databases, and server architectures.",
    initials: "VR",
    color: "#00d4ff",
    links: { github: "#", linkedin: "#", twitter: "#" },
    skill: "Backend",
  },
];

interface TeamCardProps {
  member: (typeof team)[0];
  index: number;
  isInView: boolean;
}

function TeamCard({ member, index, isInView }: TeamCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number }[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouse({ x, y });
    setTilt({
      x: ((e.clientY - rect.top) / rect.height - 0.5) * -18,
      y: ((e.clientX - rect.left) / rect.width - 0.5) * 18,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      size: Math.random() * 3 + 1,
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 800);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setMouse({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.88 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="team-card relative cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${isHovered ? "8px" : "0px"})`,
        transition: isHovered ? "transform 0.08s linear" : "transform 0.55s cubic-bezier(0.16,1,0.3,1)",
        zIndex: isHovered ? 10 : 1,
      }}
    >
      {/* Glow border ring */}
      <motion.div
        className="absolute -inset-px rounded-2xl pointer-events-none"
        animate={
          isHovered
            ? {
                background: [
                  `linear-gradient(0deg, ${member.color}90, transparent 60%)`,
                  `linear-gradient(90deg, ${member.color}90, transparent 60%)`,
                  `linear-gradient(180deg, ${member.color}90, transparent 60%)`,
                  `linear-gradient(270deg, ${member.color}90, transparent 60%)`,
                  `linear-gradient(360deg, ${member.color}90, transparent 60%)`,
                ],
              }
            : { background: "transparent" }
        }
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        style={{ borderRadius: "17px" }}
      />

      {/* Card */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: isHovered
            ? `linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`
            : "rgba(255,255,255,0.025)",
          boxShadow: isHovered
            ? `0 20px 50px rgba(0,0,0,0.6), 0 0 0 1px ${member.color}50, 0 0 40px ${member.color}20`
            : "0 0 0 1px rgba(255,255,255,0.07), 0 8px 20px rgba(0,0,0,0.35)",
          backdropFilter: "blur(16px)",
          transition: "background 0.3s, box-shadow 0.3s",
        }}
      >
        {/* Code watermark */}
        <div
          className="absolute inset-0 p-3 overflow-hidden pointer-events-none select-none"
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "9px",
            lineHeight: "1.5",
            whiteSpace: "pre",
            color: isHovered ? `${member.color}22` : `${member.color}06`,
            transition: "color 0.5s ease",
          }}
        >
          {codeLines.join("\n")}
        </div>

        {/* Mouse-follow glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(200px circle at ${mouse.x}% ${mouse.y}%, ${member.color}18, transparent)`,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        />

        {/* Shimmer scan line */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              key="scan"
              className="absolute left-0 right-0 h-px pointer-events-none"
              style={{ background: `linear-gradient(90deg, transparent, ${member.color}70, transparent)` }}
              initial={{ top: 0, opacity: 0 }}
              animate={{ top: "100%", opacity: [0, 1, 0] }}
              transition={{ duration: 0.8 }}
            />
          )}
        </AnimatePresence>

        {/* Particles */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: member.color }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 2, 0], opacity: [1, 0.5, 0], y: -30 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 p-6 flex flex-col gap-4">
          {/* Avatar + skill badge */}
          <div className="flex items-start justify-between">
            <motion.div
              animate={isHovered ? { scale: 1.1, y: -4 } : { scale: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Orbit ring */}
              <motion.div
                className="absolute -inset-2 rounded-full"
                style={{ border: `1px solid ${member.color}30` }}
                animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -inset-2 rounded-full"
                style={{ border: `1px dashed ${member.color}20` }}
                animate={isHovered ? { rotate: -180 } : { rotate: 0 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />

              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black relative z-10"
                style={{
                  background: isHovered
                    ? `linear-gradient(135deg, ${member.color}50, ${member.color}20)`
                    : `${member.color}18`,
                  boxShadow: isHovered
                    ? `0 0 25px ${member.color}60, 0 0 50px ${member.color}25, inset 0 1px 0 ${member.color}40`
                    : `0 0 0 1px ${member.color}20`,
                  color: member.color,
                  filter: isHovered ? `drop-shadow(0 0 8px ${member.color})` : "none",
                  transition: "all 0.35s ease",
                }}
              >
                {member.initials}
              </div>

              {/* Orbiting dot */}
              {isHovered && (
                <motion.div
                  className="absolute w-2 h-2 rounded-full"
                  style={{ background: member.color, boxShadow: `0 0 6px ${member.color}` }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  initial={{ top: "-4px", left: "50%", translateX: "-50%" }}
                />
              )}

              {/* Status dot */}
              <div
                className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 z-10"
                style={{ background: "#4ade80", borderColor: "hsl(222,47%,4%)" }}
              />
            </motion.div>

            {/* Skill chip */}
            <motion.div
              animate={isHovered ? { scale: 1.1, opacity: 1 } : { scale: 0.95, opacity: 0.5 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider"
              style={{
                background: `${member.color}15`,
                border: `1px solid ${member.color}30`,
                color: member.color,
              }}
            >
              <Code size={8} />
              {member.skill}
            </motion.div>
          </div>

          {/* Name + role */}
          <div>
            <motion.h3
              animate={isHovered ? { x: 3 } : { x: 0 }}
              className="font-bold text-sm tracking-tight"
              style={{
                color: isHovered ? "#fff" : "hsl(210,40%,85%)",
                textShadow: isHovered ? `0 0 15px ${member.color}60` : "none",
                transition: "color 0.3s, text-shadow 0.3s",
              }}
            >
              {member.name}
            </motion.h3>
            <p
              className="text-[11px] mt-0.5 font-medium transition-colors duration-300"
              style={{ color: isHovered ? member.color : "hsl(215,20%,50%)" }}
            >
              {member.role}
            </p>
          </div>

          <p
            className="text-[11px] leading-relaxed transition-colors duration-300"
            style={{ color: isHovered ? "hsl(215,20%,72%)" : "hsl(215,20%,40%)" }}
          >
            {member.bio}
          </p>

          {/* Social links */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.25 }}
            className="flex gap-2"
          >
            {[
              { icon: Github, href: member.links.github },
              { icon: Linkedin, href: member.links.linkedin },
              { icon: Twitter, href: member.links.twitter },
            ].map(({ icon: SIcon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: `${member.color}18`,
                  border: `1px solid ${member.color}35`,
                  color: member.color,
                  boxShadow: `0 0 8px ${member.color}20`,
                }}
              >
                <SIcon size={12} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Bottom glow bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5"
          animate={
            isHovered
              ? { background: `linear-gradient(90deg, transparent, ${member.color}, transparent)`, scaleX: 1 }
              : { scaleX: 0 }
          }
          transition={{ duration: 0.35 }}
        />
      </div>

      {/* Floor shadow */}
      <div
        className="absolute -bottom-3 left-4 right-4 h-6 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(ellipse, ${member.color}25, transparent 70%)`,
          filter: "blur(6px)",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.4s",
        }}
      />
    </motion.div>
  );
}

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" ref={ref} className="relative py-24 px-6 md:px-12 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,80,180,0.07), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="tagline-chip">The Minds Behind It</span>
          <h2 className="section-title mt-4">Meet the Team</h2>
          <p className="mt-3 text-sm max-w-lg" style={{ color: "hsl(215,20%,55%)" }}>
            Hover cards to reveal the code that powers our team. Passionate builders, thinkers, and creators.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
          style={{ perspective: "1500px" }}
        >
          {team.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
