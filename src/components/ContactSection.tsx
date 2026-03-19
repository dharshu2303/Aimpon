import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, Phone, MapPin, MessageCircle, CheckCircle } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@aimpon.tech",
    color: "#00b4d8",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
    color: "#48cae4",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "India, Remote Worldwide",
    color: "#90e0ef",
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", service: "", message: "" });
  };

  const inputStyle = (field: string) => ({
    background: focused === field ? "rgba(0,180,255,0.06)" : "rgba(255,255,255,0.03)",
    border: `1px solid ${focused === field ? "rgba(0,180,255,0.4)" : "rgba(255,255,255,0.08)"}`,
    boxShadow: focused === field ? "0 0 20px rgba(0,180,255,0.08)" : "none",
    color: "hsl(210,40%,95%)",
    outline: "none",
    transition: "all 0.3s ease",
    borderRadius: "12px",
    padding: "12px 16px",
    width: "100%",
    fontSize: "14px",
    backdropFilter: "blur(8px)",
  });

  return (
    <section id="contact" ref={ref} className="relative py-24 px-6 md:px-12">
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(0,100,200,0.12), transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="tagline-chip">Let's Talk</span>
          <h2 className="section-title mt-4">Get In Touch</h2>
          <p className="mt-3 text-sm max-w-lg" style={{ color: "hsl(215,20%,55%)" }}>
            Have a project in mind? We'd love to hear about it. Drop us a message and we'll get back within 24 hours.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left: Info + flair */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8"
          >
            {/* Big quote */}
            <div
              className="rounded-3xl p-8"
              style={{
                background: "rgba(255,255,255,0.03)",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.07), 0 20px 40px rgba(0,0,0,0.3)",
                backdropFilter: "blur(12px)",
              }}
            >
              <MessageCircle size={32} style={{ color: "hsl(199,89%,48%)" }} className="mb-4" />
              <p className="text-xl font-semibold leading-relaxed" style={{ color: "hsl(210,40%,90%)" }}>
                "Your next breakthrough project starts with a conversation."
              </p>
              <p className="mt-3 text-sm" style={{ color: "hsl(215,20%,55%)" }}>
                Whether you need a landing page, full-stack platform, or a complete digital identity — we're
                ready to make it happen.
              </p>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-4">
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center gap-4 px-5 py-4 rounded-2xl group cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${item.color}15` }}
                    >
                      <Icon size={18} style={{ color: item.color }} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider" style={{ color: "hsl(215,20%,50%)" }}>
                        {item.label}
                      </div>
                      <div className="text-sm font-medium mt-0.5" style={{ color: "hsl(210,40%,85%)" }}>
                        {item.value}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div
              className="rounded-3xl p-8"
              style={{
                background: "rgba(255,255,255,0.03)",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.08), 0 20px 40px rgba(0,0,0,0.4)",
                backdropFilter: "blur(16px)",
              }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-4 py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <CheckCircle size={56} style={{ color: "#4ade80" }} />
                  </motion.div>
                  <h3 className="text-xl font-bold" style={{ color: "hsl(210,40%,95%)" }}>
                    Message Sent!
                  </h3>
                  <p className="text-sm text-center" style={{ color: "hsl(215,20%,60%)" }}>
                    We'll get back to you within 24 hours. Stay tuned!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <h3 className="text-xl font-bold mb-2" style={{ color: "hsl(210,40%,95%)" }}>
                    Start a Project
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs uppercase tracking-wider" style={{ color: "hsl(215,20%,55%)" }}>
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={form.name}
                        required
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        style={inputStyle("name")}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs uppercase tracking-wider" style={{ color: "hsl(215,20%,55%)" }}>
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        required
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        style={inputStyle("email")}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-wider" style={{ color: "hsl(215,20%,55%)" }}>
                      Service Interested In
                    </label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      onFocus={() => setFocused("service")}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle("service"), appearance: "none" }}
                    >
                      <option value="" style={{ background: "hsl(222,47%,7%)" }}>Select a service</option>
                      <option value="mobile" style={{ background: "hsl(222,47%,7%)" }}>Mobile App Development</option>
                      <option value="landing" style={{ background: "hsl(222,47%,7%)" }}>Landing Page</option>
                      <option value="fullstack" style={{ background: "hsl(222,47%,7%)" }}>Full-Stack Web Development</option>
                      <option value="marketing" style={{ background: "hsl(222,47%,7%)" }}>Social Media Marketing</option>
                      <option value="design" style={{ background: "hsl(222,47%,7%)" }}>Poster Designing</option>
                      <option value="product" style={{ background: "hsl(222,47%,7%)" }}>Hostel Management System</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-wider" style={{ color: "hsl(215,20%,55%)" }}>
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your project, goals, and timeline..."
                      value={form.message}
                      required
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle("message"), resize: "none" }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="btn-primary flex items-center justify-center gap-2 w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Send Message <Send size={15} />
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
