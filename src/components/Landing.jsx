import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Envelope from "./Envelope";

export default function Landing({ onOpen }) {
  const [phase, setPhase] = useState("idle"); // idle → opening → done

  function handleClick() {
    if (phase !== "idle") return;
    setPhase("opening");
    // After letter-pull animation completes, unmount landing
    setTimeout(() => onOpen(), 1400);
  }

  return (
    <motion.div
      style={styles.wrap}
      onClick={handleClick}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {phase === "idle" && (
          <motion.p
            key="label"
            style={styles.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ delay: 0.4, duration: 0.9 }}
          >
            A letter for your 24th anniversary
          </motion.p>
        )}
      </AnimatePresence>

      {/* Envelope + letter pull */}
      <div style={styles.envStage}>

        {/* The letter card that slides out from envelope */}
        <AnimatePresence>
          {phase === "opening" && (
            <motion.div
              key="letter-pull"
              style={styles.letterPull}
              initial={{ y: 0, scaleY: 0.15, opacity: 0.7 }}
              animate={{ y: -220, scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={styles.letterCard}>
                <p style={styles.letterCardTo}>To Mom &amp; Dad,</p>
                <p style={styles.letterCardLine}>with love ♡</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Envelope — flap opens on click */}
        <motion.div
          animate={phase === "opening" ? { y: [0, 6, 4] } : {}}
          transition={{ duration: 0.4 }}
        >
          <Envelope flapped={phase === "opening"} />
        </motion.div>
      </div>

      <AnimatePresence>
        {phase === "idle" && (
          <motion.p
            key="hint"
            style={styles.hint}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 1, 0.5] }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.4, duration: 2, repeat: Infinity, repeatType: "mirror" }}
          >
            Click to open
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const styles = {
  wrap: {
    position: "fixed", inset: 0, zIndex: 100,
    background: "#faf6f1",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    gap: "2rem", cursor: "pointer",
  },
  label: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic",
    fontSize: "clamp(1rem, 2vw, 1.25rem)",
    color: "#7a6a5e", letterSpacing: "0.06em",
  },
  envStage: {
    position: "relative",
    display: "flex", flexDirection: "column",
    alignItems: "center",
  },
  letterPull: {
    position: "absolute",
    bottom: "54%",
    left: "50%",
    marginLeft: "-110px",   // ← replace transform: "translateX(-50%)" with this
    transformOrigin: "bottom center",
    zIndex: 2,
    width: "clamp(160px, 32vw, 220px)",
  },
  letterCard: {
    background: "#fff9f6",
    border: "1px solid #e8ddd6",
    borderRadius: 2,
    padding: "1.5rem 1.5rem 2rem",
    boxShadow: "0 4px 24px rgba(43,33,24,.1)",
    textAlign: "center",
  },
  letterCardTo: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic",
    fontSize: "clamp(.9rem, 2vw, 1.1rem)",
    color: "#7a6a5e",
    marginBottom: ".5rem",
  },
  letterCardLine: {
    fontSize: ".7rem",
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: "#b8a898",
  },
  hint: {
    fontSize: "0.7rem",
    letterSpacing: "0.35em",
    textTransform: "uppercase",
    color: "#b8a898",
  },
};
