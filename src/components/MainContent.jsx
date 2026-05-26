import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Letter from "./Letter";
import Timeline from "./Timeline";
import Closing from "./Closing";

export default function MainContent({ visible }) {
  useEffect(() => {
    if (!visible) return;
    const SPEED = 0.6;
    const RESUME_AFTER = 1200; // ms after user scroll stops
    let raf;
    let lastUser = 0;
    let userTouched = false;

    const onUser = () => { lastUser = Date.now(); userTouched = true; };
    window.addEventListener("wheel", onUser, { passive: true });
    window.addEventListener("touchmove", onUser, { passive: true });
    window.addEventListener("keydown", onUser);

    const step = () => {
      const paused = userTouched && Date.now() - lastUser < RESUME_AFTER;
      const atBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 2;
      if (!paused && !atBottom) window.scrollBy(0, SPEED);
      if (!atBottom) raf = requestAnimationFrame(step);
    };

    const t = setTimeout(() => { raf = requestAnimationFrame(step); }, 500);

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onUser);
      window.removeEventListener("touchmove", onUser);
      window.removeEventListener("keydown", onUser);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Letter />
          <SectionDivider label="The Story So Far" />
          <Timeline />
          <SectionDivider label="And What Comes Next" />
          <Closing />
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SectionDivider({ label }) {
  return (
    <div style={styles.div}>
      <div style={styles.line} />
      <p style={styles.label}>{label}</p>
      <div style={styles.line} />
    </div>
  );
}

function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.footerText}>Made with love by your child ♡</p>
      <p style={styles.footerText}>
        PS — thank you for giving me a childhood full of love. I notice every single thing.
      </p>
      <p style={styles.footerText}>
        
      </p>
      <p style={styles.footerText}>
         - PriyanShirom
      </p>
    </footer>
  );
}

const styles = {
  div: { display: "flex", flexDirection: "column", alignItems: "center", padding: "3rem 0", gap: "1rem", background: "#faf6f1" },
  line: { width: 1, height: 56, background: "linear-gradient(to bottom, transparent, #b8a898, transparent)" },
  label: { fontSize: ".68rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#b8a898" },
  footer: { padding: "2.5rem 2rem", textAlign: "center", borderTop: "1px solid rgba(43,33,24,.07)", background: "#faf6f1" },
  footerText: { fontSize: ".7rem", letterSpacing: "0.12em", color: "#b8a898", marginTop: ".4rem" },
};
