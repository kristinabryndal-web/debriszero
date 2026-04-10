import { useState, useEffect, useRef } from "react";

const SECTIONS = ["home", "about", "problem", "methods", "solution", "team", "contact"];

function useInView(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function StarField() {
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.3 + 0.1,
    dur: Math.random() * 6 + 4,
    delay: Math.random() * 6,
  }));
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: "#fff",
            opacity: s.opacity,
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

const methodsData = [
  {
    title: "Robotic Arm Capture",
    icon: "🦾",
    desc: "Specialized spacecraft equipped with articulated robotic arms grapple and stabilize tumbling debris. Once captured, the object is guided into a controlled de-orbit trajectory for safe atmospheric re-entry. This approach offers precision handling for large, high-value targets like defunct satellites.",
  },
  {
    title: "Net Enclosure",
    icon: "🕸️",
    desc: "A deployable net is launched at a debris object, enveloping it regardless of shape, spin rate, or surface condition. Once enclosed, a tether connects the debris to the capture spacecraft for controlled de-orbit. Successfully demonstrated by the RemoveDEBRIS mission in 2018.",
  },
  {
    title: "Magnetic Docking",
    icon: "🧲",
    desc: "Magnetic plates installed on future satellites enable end-of-life capture via magnetic docking systems. A servicing spacecraft approaches and locks onto the target magnetically, then guides it to a safe disposal orbit. Astroscale's ELSA-d mission has demonstrated this approach in orbit.",
  },
];

const pillars = [
  {
    num: "01",
    title: "Active Debris Removal",
    text: "Specialized spacecraft designed to capture, stabilize, and de-orbit dangerous debris. The priority: target the 50 largest objects in low Earth orbit — defunct rocket stages and satellites that pose the greatest collision risk. The goal is funding at least five dedicated ADR missions per year, removing the 100 highest-risk objects by 2035.",
    color: "#00d4ff",
  },
  {
    num: "02",
    title: "Preventive Design Standards",
    text: "New satellites must leave no lasting footprint. Enhanced mandates should require built-in propulsion for de-orbit within 5 years of mission completion — a sharp tightening of the current voluntary 25-year guideline. These requirements must apply to all operators seeking launch licenses, eliminating the race-to-the-bottom dynamic.",
    color: "#7b61ff",
  },
  {
    num: "03",
    title: "Binding International Governance",
    text: "The voluntary framework has failed. The UN Office for Outer Space Affairs should develop a binding treaty with enforceable debris mitigation requirements, a global tracking regime, and a liability fund financed by launch operators proportional to their orbital footprint. AI-driven predictive modeling should become shared international infrastructure.",
    color: "#ff6b6b",
  },
];

const stats = [
  { value: "36,000+", label: "Tracked objects > 10cm" },
  { value: "1M+", label: "Fragments 1–10cm" },
  { value: "130M+", label: "Particles < 1cm" },
  { value: "28,000", label: "km/h orbital velocity" },
];

export default function DebrisZero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const [formStatus, setFormStatus] = useState("idle"); // idle, sending, sent, error

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      for (const id of [...SECTIONS].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{
      fontFamily: "'Outfit', sans-serif",
      background: "#050a14",
      color: "#e0e6f0",
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        @keyframes twinkle {
          0% { opacity: 0.1; }
          100% { opacity: 0.35; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(0,212,255,0.15); }
          50% { box-shadow: 0 0 40px rgba(0,212,255,0.3); }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes orbit-line {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .nav-link {
          color: rgba(224,230,240,0.6);
          text-decoration: none;
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.3s;
          padding: 4px 0;
          border: none;
          background: none;
        }
        .nav-link:hover, .nav-link.active {
          color: #00d4ff;
        }

        .cta-btn {
          display: inline-block;
          padding: 16px 40px;
          background: linear-gradient(135deg, #00d4ff, #7b61ff);
          color: #fff;
          border: none;
          border-radius: 50px;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
          text-decoration: none;
        }
        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(0,212,255,0.3);
        }

        .cta-btn-outline {
          display: inline-block;
          padding: 14px 36px;
          background: transparent;
          color: #00d4ff;
          border: 1.5px solid rgba(0,212,255,0.4);
          border-radius: 50px;
          font-family: 'Outfit', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
        }
        .cta-btn-outline:hover {
          border-color: #00d4ff;
          background: rgba(0,212,255,0.08);
          box-shadow: 0 0 30px rgba(0,212,255,0.15);
        }

        .stat-card {
          text-align: center;
          padding: 32px 20px;
          border-radius: 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(10px);
          transition: transform 0.3s, border-color 0.3s;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          border-color: rgba(0,212,255,0.2);
        }

        .method-card {
          padding: 40px 32px;
          border-radius: 20px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          transition: all 0.4s;
          cursor: default;
        }
        .method-card:hover {
          border-color: rgba(0,212,255,0.25);
          background: rgba(0,212,255,0.04);
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }

        .pillar-card {
          padding: 48px 40px;
          border-radius: 20px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          transition: all 0.4s;
          position: relative;
          overflow: hidden;
        }
        .pillar-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255,255,255,0.12);
        }
        .pillar-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          border-radius: 20px 20px 0 0;
        }

        .section-label {
          font-family: 'Space Mono', monospace;
          font-size: 12px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #00d4ff;
          margin-bottom: 16px;
          display: block;
        }

        .section-title {
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 24px;
          color: #fff;
        }

        .team-card {
          border-radius: 20px;
          overflow: hidden;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          transition: all 0.4s;
        }
        .team-card:hover {
          transform: translateY(-6px);
          border-color: rgba(0,212,255,0.2);
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }

        .input-field {
          width: 100%;
          padding: 16px 20px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          color: #e0e6f0;
          font-family: 'Outfit', sans-serif;
          font-size: 15px;
          transition: border-color 0.3s;
          outline: none;
        }
        .input-field:focus {
          border-color: #00d4ff;
        }
        .input-field::placeholder { color: rgba(224,230,240,0.3); }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-toggle { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>

      <StarField />

      {/* Ambient glow effects */}
      <div style={{
        position: "fixed", top: "-30%", right: "-20%", width: "60vw", height: "60vw",
        background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", bottom: "-30%", left: "-20%", width: "50vw", height: "50vw",
        background: "radial-gradient(circle, rgba(123,97,255,0.05) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 40px", height: 72,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrollY > 50 ? "rgba(5,10,20,0.9)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
        borderBottom: scrollY > 50 ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.3s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => scrollTo("home")}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            border: "2px solid #00d4ff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 700, color: "#00d4ff",
            fontFamily: "'Space Mono', monospace",
          }}>DZ</div>
          <span style={{ fontWeight: 700, fontSize: 18, color: "#fff", letterSpacing: 1 }}>DEBRIS ZERO</span>
        </div>

        <div className="desktop-nav" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {[
            ["home", "Home"], ["about", "About"], ["problem", "The Crisis"],
            ["methods", "Methods"], ["solution", "Solution"], ["team", "Team"], ["contact", "Contact"]
          ].map(([id, label]) => (
            <button key={id} className={`nav-link ${activeSection === id ? "active" : ""}`} onClick={() => scrollTo(id)}>
              {label}
            </button>
          ))}
        </div>

        <button
          className="mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none", flexDirection: "column", gap: 5, background: "none",
            border: "none", cursor: "pointer", padding: 8,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div key={i} style={{
              width: 24, height: 2, background: "#e0e6f0",
              transition: "all 0.3s",
              transform: menuOpen
                ? i === 0 ? "rotate(45deg) translateY(10px)" : i === 2 ? "rotate(-45deg) translateY(-10px)" : "scaleX(0)"
                : "none",
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu" style={{
          position: "fixed", inset: 0, zIndex: 99,
          background: "rgba(5,10,20,0.97)", backdropFilter: "blur(20px)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28,
        }}>
          {[
            ["home", "Home"], ["about", "About"], ["problem", "The Crisis"],
            ["methods", "Methods"], ["solution", "Solution"], ["team", "Team"], ["contact", "Contact"]
          ].map(([id, label]) => (
            <button key={id} className="nav-link" onClick={() => scrollTo(id)} style={{ fontSize: 20, letterSpacing: 3 }}>
              {label}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "120px 24px 80px", position: "relative", zIndex: 1,
      }}>
        {/* Orbit ring decoration */}
        <div style={{
          position: "absolute", width: "min(700px, 90vw)", height: "min(700px, 90vw)",
          border: "1px solid rgba(0,212,255,0.07)", borderRadius: "50%",
          animation: "orbit-line 60s linear infinite",
        }}>
          <div style={{
            position: "absolute", top: 0, left: "50%", width: 6, height: 6,
            borderRadius: "50%", background: "#00d4ff", transform: "translate(-50%, -50%)",
            boxShadow: "0 0 12px #00d4ff",
          }} />
        </div>

        <FadeIn>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: 6,
            textTransform: "uppercase", color: "#00d4ff", marginBottom: 28, display: "block",
          }}>
            Debris Zero Foundation
          </span>
        </FadeIn>
        <FadeIn delay={0.15}>
          <h1 style={{
            fontSize: "clamp(40px, 8vw, 88px)", fontWeight: 900, lineHeight: 1.05,
            maxWidth: 900, marginBottom: 28,
            background: "linear-gradient(135deg, #fff 0%, #a8c8e8 50%, #00d4ff 100%)",
            backgroundSize: "200% 200%", animation: "gradient-shift 6s ease infinite",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            Preserving the Final Frontier
          </h1>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p style={{
            fontSize: "clamp(16px, 2.2vw, 20px)", lineHeight: 1.7,
            color: "rgba(224,230,240,0.6)", maxWidth: 620, marginBottom: 44,
            fontWeight: 300,
          }}>
            Promoting a sustainable future in space by addressing the growing threat of orbital debris through awareness, innovation, and global collaboration.
          </p>
        </FadeIn>
        <FadeIn delay={0.45}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <button className="cta-btn" onClick={() => scrollTo("about")}>Our Mission</button>
            <button className="cta-btn-outline" onClick={() => scrollTo("problem")}>Learn More</button>
          </div>
        </FadeIn>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 40, display: "flex", flexDirection: "column",
          alignItems: "center", gap: 8, opacity: 0.4,
        }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 3 }}>SCROLL</span>
          <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, #e0e6f0, transparent)" }} />
        </div>
      </section>

      {/* ABOUT / WHO WE ARE */}
      <section id="about" style={{
        padding: "120px 24px", position: "relative", zIndex: 1,
        maxWidth: 1100, margin: "0 auto",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 60 }}>
          <FadeIn>
            <span className="section-label">Who We Are</span>
            <h2 className="section-title">A Mission to<br />Clear the Skies</h2>
            <p style={{
              fontSize: 18, lineHeight: 1.8, color: "rgba(224,230,240,0.65)",
              maxWidth: 700, fontWeight: 300, marginBottom: 24,
            }}>
              At Debris Zero Foundation, our mission is to promote a sustainable future in space by addressing the growing threat of orbital debris. We are dedicated to raising awareness, supporting innovative technologies, and fostering global collaboration to remove space junk and protect Earth's orbital environment.
            </p>
            <p style={{
              fontSize: 18, lineHeight: 1.8, color: "rgba(224,230,240,0.65)",
              maxWidth: 700, fontWeight: 300,
            }}>
              As humanity expands into space, we believe it's vital to keep our skies clear for future exploration and innovation. Space debris endangers current and future missions, threatens the satellite infrastructure modern civilization depends on, and — left unchecked — could trigger a catastrophic cascade that renders entire orbital bands unusable for generations.
            </p>
          </FadeIn>

          {/* Stats row */}
          <FadeIn delay={0.15}>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 20,
            }}>
              {stats.map((s, i) => (
                <div key={i} className="stat-card">
                  <div style={{
                    fontSize: 36, fontWeight: 800, color: "#00d4ff",
                    fontFamily: "'Space Mono', monospace", marginBottom: 8,
                  }}>{s.value}</div>
                  <div style={{
                    fontSize: 13, color: "rgba(224,230,240,0.5)", letterSpacing: 1,
                    textTransform: "uppercase", fontWeight: 500,
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section id="problem" style={{
        padding: "120px 24px", position: "relative", zIndex: 1,
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          borderRadius: 28, padding: "clamp(40px,6vw,80px)",
          background: "linear-gradient(135deg, rgba(255,107,107,0.06), rgba(123,97,255,0.04))",
          border: "1px solid rgba(255,107,107,0.1)",
        }}>
          <FadeIn>
            <span className="section-label" style={{ color: "#ff6b6b" }}>The Crisis</span>
            <h2 className="section-title">A Growing Threat<br />in Orbit</h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p style={{
              fontSize: 18, lineHeight: 1.8, color: "rgba(224,230,240,0.65)",
              maxWidth: 800, fontWeight: 300, marginBottom: 28,
            }}>
              Space junk includes defunct satellites, spent rocket stages, collision fragments, and other discarded objects orbiting Earth at velocities up to tens of thousands of kilometers per hour. As more nations and private companies launch satellites, the volume of orbital debris grows exponentially — with over 36,000 objects larger than 10 cm tracked today, and millions of smaller untracked fragments.
            </p>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div style={{
              padding: 32, borderRadius: 16,
              background: "rgba(255,107,107,0.06)", border: "1px solid rgba(255,107,107,0.1)",
              marginBottom: 28,
            }}>
              <h3 style={{ color: "#ff6b6b", fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
                ⚠️ Kessler Syndrome
              </h3>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(224,230,240,0.6)", fontWeight: 300 }}>
                First identified by NASA scientists Donald J. Kessler and Burton G. Cour-Palais in 1978, this scenario describes a self-sustaining cascade: each collision creates thousands of new fragments, raising the probability of further collisions. Over time, this runaway cycle could render entire orbital bands unusable for decades or centuries. Once triggered, Kessler Syndrome cannot be reversed.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.35}>
            <p style={{
              fontSize: 18, lineHeight: 1.8, color: "rgba(224,230,240,0.65)",
              maxWidth: 800, fontWeight: 300,
            }}>
              The economic toll is already substantial. Satellite losses and replacement costs run into the billions, collision-avoidance maneuvers strain budgets, and insurance premiums for new launches continue to rise. Even minor disruptions to satellite services can trigger cascading failures in aviation, financial trading, and emergency response. The current response — voluntary guidelines and early technology demos — remains critically insufficient relative to the scale and pace of the problem.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* REMOVAL METHODS */}
      <section id="methods" style={{
        padding: "120px 24px", position: "relative", zIndex: 1,
        maxWidth: 1100, margin: "0 auto",
      }}>
        <FadeIn>
          <span className="section-label">Active Debris Removal</span>
          <h2 className="section-title">Removal Methods</h2>
          <p style={{
            fontSize: 18, lineHeight: 1.7, color: "rgba(224,230,240,0.55)",
            maxWidth: 600, fontWeight: 300, marginBottom: 56,
          }}>
            Active debris removal missions involve specialized spacecraft designed to capture, stabilize, and de-orbit dangerous debris from critical orbits.
          </p>
        </FadeIn>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24,
        }}>
          {methodsData.map((m, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div className="method-card">
                <div style={{ fontSize: 40, marginBottom: 20 }}>{m.icon}</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 14 }}>{m.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(224,230,240,0.55)", fontWeight: 300 }}>
                  {m.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* THREE-PILLAR SOLUTION */}
      <section id="solution" style={{
        padding: "120px 24px", position: "relative", zIndex: 1,
        maxWidth: 1100, margin: "0 auto",
      }}>
        <FadeIn>
          <span className="section-label">The Path Forward</span>
          <h2 className="section-title">A Three-Pillar<br />Solution</h2>
          <p style={{
            fontSize: 18, lineHeight: 1.7, color: "rgba(224,230,240,0.55)",
            maxWidth: 650, fontWeight: 300, marginBottom: 56,
          }}>
            Addressing the space debris crisis requires a sustained, internationally coordinated strategy. Each pillar is necessary — none is sufficient on its own.
          </p>
        </FadeIn>
        <div style={{ display: "grid", gap: 24 }}>
          {pillars.map((p, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div className="pillar-card" style={{ borderTop: `3px solid ${p.color}` }}>
                <div style={{ display: "flex", gap: 28, flexWrap: "wrap", alignItems: "flex-start" }}>
                  <span style={{
                    fontFamily: "'Space Mono', monospace", fontSize: 48, fontWeight: 700,
                    color: p.color, opacity: 0.3, lineHeight: 1,
                  }}>{p.num}</span>
                  <div style={{ flex: 1, minWidth: 260 }}>
                    <h3 style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 14 }}>{p.title}</h3>
                    <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(224,230,240,0.6)", fontWeight: 300 }}>
                      {p.text}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CALL TO ACTION BAND */}
      <section style={{
        padding: "80px 24px", position: "relative", zIndex: 1, textAlign: "center",
      }}>
        <div style={{
          maxWidth: 800, margin: "0 auto", padding: "64px 40px", borderRadius: 28,
          background: "linear-gradient(135deg, rgba(0,212,255,0.08), rgba(123,97,255,0.06))",
          border: "1px solid rgba(0,212,255,0.12)",
          animation: "pulse-glow 4s ease-in-out infinite",
        }}>
          <FadeIn>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: "#fff", marginBottom: 16 }}>
              The Window to Act Is Narrowing
            </h2>
            <p style={{
              fontSize: 17, lineHeight: 1.7, color: "rgba(224,230,240,0.6)",
              maxWidth: 550, margin: "0 auto 32px", fontWeight: 300,
            }}>
              None of these solutions requires technologies that don't yet exist. What they require is political will, coordinated investment, and a shared commitment to treat orbital sustainability as the common responsibility it is.
            </p>
            <button className="cta-btn" onClick={() => scrollTo("contact")}>Get Involved</button>
          </FadeIn>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" style={{
        padding: "120px 24px", position: "relative", zIndex: 1,
        maxWidth: 1100, margin: "0 auto",
      }}>
        <FadeIn>
          <span className="section-label">Our Team</span>
          <h2 className="section-title">The People Behind<br />the Mission</h2>
        </FadeIn>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 32, marginTop: 48,
        }}>
          {[
            {
              name: "Chase Bryndal",
              role: "Founder & Executive Director",
              bio: "Author of the Debris Zero white paper on orbital sustainability. Chase leads the foundation's mission to build awareness and drive coordinated global action on the space debris crisis.",
            },
            {
              name: "Brad Bryndal",
              role: "Co-Founder & Director of Operations",
              bio: "Brad brings strategic expertise to Debris Zero, overseeing operations, partnerships, and outreach efforts to expand the foundation's impact in the space sustainability community.",
            },
          ].map((member, i) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div className="team-card">
                <div style={{
                  height: 280,
                  background: `linear-gradient(135deg, ${i === 0 ? "rgba(0,212,255,0.15)" : "rgba(123,97,255,0.15)"}, rgba(5,10,20,0.8))`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{
                    width: 120, height: 120, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${i === 0 ? "#00d4ff" : "#7b61ff"}, transparent)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 42, fontWeight: 800, color: "#fff",
                    border: "2px solid rgba(255,255,255,0.1)",
                  }}>
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </div>
                </div>
                <div style={{ padding: "28px 32px 36px" }}>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{member.name}</h3>
                  <p style={{
                    fontSize: 13, color: "#00d4ff", letterSpacing: 1.5,
                    textTransform: "uppercase", fontWeight: 500, marginBottom: 16,
                    fontFamily: "'Space Mono', monospace",
                  }}>{member.role}</p>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(224,230,240,0.55)", fontWeight: 300 }}>
                    {member.bio}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* WHITE PAPER */}
      <section style={{
        padding: "80px 24px", position: "relative", zIndex: 1,
        maxWidth: 1100, margin: "0 auto",
      }}>
        <FadeIn>
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center",
            padding: "48px 40px", borderRadius: 20,
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <span className="section-label">Research</span>
              <h3 style={{ fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 12 }}>
                Read the White Paper
              </h3>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(224,230,240,0.55)", fontWeight: 300 }}>
                "Reducing Space Junk: A Necessity for Our Future" — a comprehensive analysis of the orbital debris crisis, current efforts, and the three-pillar solution framework for sustainable space operations.
              </p>
            </div>
            <a href="/Space_Debris_White_Paper.pdf" className="cta-btn-outline" target="_blank" rel="noopener noreferrer">
              Download PDF ↓
            </a>
          </div>
        </FadeIn>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{
        padding: "120px 24px 80px", position: "relative", zIndex: 1,
        maxWidth: 700, margin: "0 auto",
      }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="section-label">Get in Touch</span>
            <h2 className="section-title">Contact Us</h2>
            <p style={{ fontSize: 17, color: "rgba(224,230,240,0.5)", fontWeight: 300 }}>
              Interested in supporting our mission or learning more? Reach out and we'll get back to you.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          {formStatus === "sent" ? (
            <div style={{
              textAlign: "center", padding: "48px 24px",
              borderRadius: 16, background: "rgba(0,212,255,0.06)",
              border: "1px solid rgba(0,212,255,0.15)",
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Message Sent!</h3>
              <p style={{ color: "rgba(224,230,240,0.6)", fontWeight: 300 }}>Thanks for reaching out. We'll get back to you soon.</p>
              <button
                className="cta-btn-outline"
                style={{ marginTop: 24 }}
                onClick={() => setFormStatus("idle")}
              >Send Another</button>
            </div>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setFormStatus("sending");
                try {
                  const res = await fetch("https://formspree.io/f/mqedyydz", {
                    method: "POST",
                    body: new FormData(e.target),
                    headers: { Accept: "application/json" },
                  });
                  if (res.ok) {
                    setFormStatus("sent");
                    e.target.reset();
                  } else {
                    setFormStatus("error");
                  }
                } catch {
                  setFormStatus("error");
                }
              }}
              style={{ display: "grid", gap: 16 }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <input className="input-field" name="firstName" placeholder="First Name" required />
                <input className="input-field" name="lastName" placeholder="Last Name" required />
              </div>
              <input className="input-field" name="email" placeholder="Email Address" type="email" required />
              <input className="input-field" name="subject" placeholder="Subject" required />
              <textarea className="input-field" name="message" placeholder="Your Message" rows={5} style={{ resize: "vertical" }} required />
              {formStatus === "error" && (
                <p style={{ color: "#ff6b6b", fontSize: 14, textAlign: "center" }}>
                  Something went wrong. Please try again or email us directly.
                </p>
              )}
              <button
                className="cta-btn"
                type="submit"
                disabled={formStatus === "sending"}
                style={{ width: "100%", marginTop: 8, opacity: formStatus === "sending" ? 0.6 : 1 }}
              >
                {formStatus === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </FadeIn>
        <FadeIn delay={0.25}>
          <div style={{ textAlign: "center", marginTop: 40, display: "flex", alignItems: "center", justifyContent: "center", gap: 24 }}>
            <a href="mailto:info@debriszero.org" style={{
              color: "#00d4ff", textDecoration: "none", fontSize: 16, fontWeight: 500,
              letterSpacing: 0.5,
            }}>
              info@debriszero.org
            </a>
            <a href="https://x.com/debris_zero" target="_blank" rel="noopener noreferrer" style={{
              color: "rgba(224,230,240,0.5)", transition: "color 0.3s", display: "flex", alignItems: "center",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#00d4ff"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(224,230,240,0.5)"}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "48px 24px 32px", borderTop: "1px solid rgba(255,255,255,0.06)",
        position: "relative", zIndex: 1,
      }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "flex", flexWrap: "wrap", justifyContent: "space-between",
          alignItems: "center", gap: 20,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              border: "1.5px solid #00d4ff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 700, color: "#00d4ff",
              fontFamily: "'Space Mono', monospace",
            }}>DZ</div>
            <span style={{ fontWeight: 600, fontSize: 14, color: "rgba(224,230,240,0.5)" }}>DEBRIS ZERO FOUNDATION</span>
          </div>
          <a href="https://x.com/debris_zero" target="_blank" rel="noopener noreferrer" style={{
            color: "rgba(224,230,240,0.3)", transition: "color 0.3s", display: "flex", alignItems: "center",
          }}
            onMouseEnter={e => e.currentTarget.style.color = "#00d4ff"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(224,230,240,0.3)"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <p style={{
            fontSize: 13, color: "rgba(224,230,240,0.3)",
            fontFamily: "'Space Mono', monospace",
          }}>
            © 2026 Debris Zero Foundation. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
