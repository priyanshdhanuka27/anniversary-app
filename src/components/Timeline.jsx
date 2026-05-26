import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CONFIG } from "../config";

function TLItem({ milestone, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.li
      ref={ref}
      style={styles.item}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.04, ease: [0.16,1,0.3,1] }}
    >
      {/* Dot */}
      <motion.div
        style={{ ...styles.dot, ...(inView ? styles.dotActive : {}) }}
        animate={inView ? { scale: [0.6, 1.2, 1] } : {}}
        transition={{ duration: 0.5, delay: index * 0.04 + 0.1 }}
      />

      <div style={styles.text}>
        <p style={styles.year}>{milestone.year}</p>
        <h3 style={styles.event}>{milestone.event}</h3>
        <p style={styles.desc}>{milestone.desc}</p>
      </div>
    </motion.li>
  );
}

export default function Timeline() {
  return (
    <section style={styles.section}>
      <div style={styles.header}>
        <p style={styles.headerLabel}>Twenty-four chapters</p>
        <h2 style={styles.headerTitle}>
          Everything you've been through, together
        </h2>
      </div>

      <ul style={styles.list} aria-label="Relationship timeline">
        {/* Spine */}
        <div style={styles.spine} aria-hidden="true" />
        {CONFIG.milestones.map((m, i) => (
          <TLItem key={i} milestone={m} index={i} />
        ))}
      </ul>
    </section>
  );
}

const styles = {
  section: {
    padding: "clamp(3rem,8vw,7rem) clamp(1.5rem,6vw,4rem)",
    background: "#faf6f1",
  },
  header: { textAlign: "center", marginBottom: "clamp(3rem,8vw,6rem)" },
  headerLabel: {
    fontSize: ".68rem", letterSpacing: "0.4em",
    textTransform: "uppercase", color: "#b8a898", marginBottom: ".6rem",
  },
  headerTitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(1.8rem, 5vw, 3rem)",
    fontWeight: 300, fontStyle: "italic", color: "#2b2118",
  },
  list: {
    maxWidth: 660, marginInline: "auto",
    listStyle: "none",
    position: "relative",
    paddingLeft: "2.5rem",
  },
  spine: {
    position: "absolute",
    left: 7, top: 8, bottom: 8, width: 1,
    background: "linear-gradient(to bottom, transparent, #b8a898 5%, #b8a898 95%, transparent)",
  },
  item: {
    position: "relative",
    paddingBottom: "clamp(2rem,5vw,3.5rem)",
    paddingLeft: "0.5rem",
  },
  dot: {
    position: "absolute",
    left: "-2.1rem", top: 7,
    width: 9, height: 9,
    borderRadius: "50%",
    background: "#faf6f1",
    border: "1.5px solid #b8a898",
    transition: "background .3s, border-color .3s, box-shadow .3s",
  },
  dotActive: {
    background: "#b03030",
    borderColor: "#b03030",
    boxShadow: "0 0 0 3px rgba(176,48,48,.13)",
  },
  text: {},
  year: {
    fontSize: ".68rem", letterSpacing: "0.22em",
    textTransform: "uppercase", color: "#b03030",
    marginBottom: ".3rem", fontWeight: 400,
  },
  event: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
    fontWeight: 400, color: "#2b2118",
    lineHeight: 1.3, marginBottom: ".45rem",
  },
  desc: {
    fontSize: "clamp(.85rem,1.6vw,.95rem)",
    color: "#7a6a5e", lineHeight: 1.75, maxWidth: "52ch",
  },
};
