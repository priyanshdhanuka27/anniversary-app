import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CONFIG } from "../config";

function useCountdown(target) {
  const [diff, setDiff] = useState(target - new Date());
  useEffect(() => {
    const id = setInterval(() => setDiff(target - new Date()), 1000);
    return () => clearInterval(id);
  }, [target]);
  const f = n => String(Math.max(0, n)).padStart(2, "0");
  const d = Math.floor(diff / 86400000);
  const h = f(Math.floor(diff % 86400000 / 3600000));
  const m = f(Math.floor(diff % 3600000 / 60000));
  const s = f(Math.floor(diff % 60000 / 1000));
  return { d, h, m, s };
}

export default function Closing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { d, h, m, s } = useCountdown(CONFIG.anniversary25);

  return (
    <section style={styles.section} ref={ref}>
      <div style={styles.inner}>
        {/* Giant outlined 24 */}
        <motion.div
          style={styles.bigNum}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          aria-hidden="true"
        >
          24
        </motion.div>

        <motion.p
          style={styles.mainText}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          24 years built a lifetime.<br />
          <em style={{ fontStyle: "italic", color: "#b03030" }}>
            Can't wait to celebrate your 25th
          </em>
          <br />with an absolute bang.
        </motion.p>

        <motion.div
          style={styles.rule}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        />

        <motion.p
          style={styles.teaser}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        >
          Counting down to
        </motion.p>

        <motion.p
          style={styles.jubilee}
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          The Silver Jubilee — 2027
        </motion.p>

        {/* Countdown */}
        <motion.div
          style={styles.cd}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.1 }}
          aria-label="Countdown to 25th anniversary"
        >
          {[["Days", d], ["Hours", h], ["Min", m], ["Sec", s]].map(([label, val]) => (
            <div key={label} style={styles.cdUnit}>
              <span style={styles.cdN}>{val}</span>
              <span style={styles.cdL}>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: "clamp(5rem,12vw,10rem) clamp(1.5rem,6vw,4rem)",
    background: "#faf6f1", textAlign: "center",
  },
  inner: { maxWidth: 520, marginInline: "auto" },
  bigNum: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(6rem,20vw,11rem)",
    fontWeight: 300, fontStyle: "italic",
    lineHeight: 1, marginBottom: "-1rem",
    letterSpacing: "-0.03em",
    WebkitTextStroke: "1px #c4b5af",
    color: "transparent",
    userSelect: "none",
  },
  mainText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(1.3rem, 3.5vw, 2rem)",
    fontWeight: 300, lineHeight: 1.6,
    color: "#2b2118", position: "relative", zIndex: 1,
    marginBottom: "2.5rem",
  },
  rule: {
    width: 30, height: 1, background: "#b03030",
    margin: "0 auto 2rem",
    transformOrigin: "center",
  },
  teaser: {
    fontSize: ".68rem", letterSpacing: "0.35em",
    textTransform: "uppercase", color: "#b8a898",
    marginBottom: ".6rem",
  },
  jubilee: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
    fontStyle: "italic", color: "#7a6a5e",
    marginBottom: "2.5rem",
  },
  cd: { display: "flex", justifyContent: "center", gap: "clamp(1.5rem,4vw,3rem)", flexWrap: "wrap" },
  cdUnit: { display: "flex", flexDirection: "column", alignItems: "center" },
  cdN: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(2.2rem,7vw,4rem)",
    fontWeight: 300, color: "#2b2118",
    lineHeight: 1, letterSpacing: "-0.02em",
  },
  cdL: { fontSize: ".65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#b8a898", marginTop: ".3rem" },
};
