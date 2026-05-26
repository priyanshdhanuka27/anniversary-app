import { motion, AnimatePresence } from "framer-motion";
import Envelope from "./Envelope";

export default function Landing({ onOpen }) {
  return (
    <motion.div
      key="landing"
      style={styles.wrap}
      onClick={onOpen}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.p
        style={styles.label}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        A letter for your 24th anniversary
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <Envelope />
      </motion.div>

      <motion.p
        style={styles.hint}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 1, 0.5] }}
        transition={{ delay: 1.4, duration: 2, repeat: Infinity, repeatType: "mirror" }}
      >
        Click to open
      </motion.p>
    </motion.div>
  );
}

const styles = {
  wrap: {
    position: "fixed", inset: 0, zIndex: 100,
    background: "#faf6f1",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    gap: "2.5rem", cursor: "pointer",
  },
  label: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic",
    fontSize: "clamp(1rem, 2vw, 1.25rem)",
    color: "#7a6a5e",
    letterSpacing: "0.06em",
  },
  hint: {
    fontSize: "0.7rem",
    letterSpacing: "0.35em",
    textTransform: "uppercase",
    color: "#b8a898",
  },
};
