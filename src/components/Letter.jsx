import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CONFIG } from "../config";

export default function Letter() {
  const ref = useRef(null);

  return (
    <section style={styles.section} ref={ref}>
      {/* Paper lines */}
      <div style={styles.lines} aria-hidden="true" />

      <div style={styles.inner}>
        <motion.p
          style={styles.to}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
        >
          To {CONFIG.name1} &amp; {CONFIG.name2},
        </motion.p>

        <motion.h1
          style={styles.heading}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Twenty-four years<br />
          of <em style={{ fontStyle: "italic", color: "#b03030" }}>real love.</em>
        </motion.h1>

        <motion.div
          style={styles.rule}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.16,1,0.3,1] }}
        />

        <div style={styles.body}>
          {CONFIG.letter.map((para, i) => (
            <motion.p
              key={i}
              style={styles.para}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.18, duration: 0.85 }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        <motion.p
          style={styles.sig}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 + CONFIG.letter.length * 0.18 + 0.3, duration: 1 }}
        >
          — With everything I have ♡
        </motion.p>
      </div>
    </section>
  );
}

const styles = {
  section: {
    minHeight: "100svh",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,6vw,4rem)",
    background: "#faf6f1",
    position: "relative",
  },
  lines: {
    position: "absolute", inset: 0,
    backgroundImage: "repeating-linear-gradient(transparent, transparent 39px, rgba(43,33,24,.04) 40px)",
    pointerEvents: "none",
  },
  inner: { maxWidth: 620, width: "100%", position: "relative", zIndex: 1 },
  to: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic",
    fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
    color: "#7a6a5e",
    marginBottom: "2rem",
    letterSpacing: "0.04em",
  },
  heading: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(2.2rem, 6vw, 4rem)",
    fontWeight: 300,
    lineHeight: 1.15,
    color: "#2b2118",
    marginBottom: "2.5rem",
  },
  rule: {
    width: 40, height: 1,
    background: "#b8a898",
    marginBottom: "2.5rem",
    transformOrigin: "left",
  },
  body: {},
  para: {
    fontSize: "clamp(1rem, 1.8vw, 1.12rem)",
    lineHeight: 2,
    color: "#2b2118",
    marginBottom: "1.4rem",
    fontWeight: 300,
  },
  sig: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic",
    fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
    color: "#b03030",
    marginTop: "2.5rem",
  },
};
