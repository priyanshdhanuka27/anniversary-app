import { motion } from "framer-motion";
import { useState } from "react";

export default function Envelope({ flapped = false }) {
  const [hovered, setHovered] = useState(false);
  const flapOpen = flapped || hovered;

  return (
    <motion.div
      animate={{ y: flapped ? 0 : [0, -18, 0] }}
      transition={
        flapped
          ? { duration: 0.3 }
          : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
      }
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={styles.outer}
      aria-label="Anniversary envelope"
    >
      <div style={styles.body}>
        {/* Flap */}
        <motion.div
          style={styles.flap}
          animate={{ rotateX: flapOpen ? -165 : 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* V-fold */}
        <div style={styles.vfold} />

        {/* Centered inner layer for seal */}
        <div style={styles.bodyInner}>
          <motion.div
            style={styles.sealWrap}
            animate={{ opacity: flapped ? 0 : 1, scale: flapped ? 0.7 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div style={styles.seal}>
              <span style={styles.sealText}>♡</span>
            </div>
          </motion.div>
        </div>
      </div>
      <div style={styles.shadow} />
    </motion.div>
  );
}

const styles = {
  outer: { width: "clamp(200px, 38vw, 270px)", cursor: "pointer", userSelect: "none" },
  body: {
    width: "100%", paddingTop: "63%",
    background: "#f0e8df", borderRadius: 3,
    position: "relative", overflow: "visible",
    boxShadow: "0 2px 8px rgba(43,33,24,.1), 0 14px 45px rgba(43,33,24,.12), inset 0 1px 0 rgba(255,255,255,.55)",
    perspective: 600,
  },
  bodyInner: {
    position: "absolute", inset: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  flap: {
    position: "absolute",
    top: 0, left: 0, right: 0, height: "54%",
    background: "#ede4da",
    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
    borderRadius: "3px 3px 0 0",
    transformOrigin: "top center",
    transformStyle: "preserve-3d",
    zIndex: 2,
    boxShadow: "0 2px 6px rgba(43,33,24,.07)",
  },
  vfold: {
    position: "absolute", inset: 0,
    background: "linear-gradient(135deg, transparent 49.8%, rgba(43,33,24,.05) 50%), linear-gradient(225deg, transparent 49.8%, rgba(43,33,24,.05) 50%)",
    pointerEvents: "none",
  },
  sealWrap: { zIndex: 3 },
  seal: {
    width: "clamp(48px, 11vw, 62px)", height: "clamp(48px, 11vw, 62px)",
    borderRadius: "50%",
    background: "radial-gradient(circle at 35% 35%, #d44, #c0392b, #8a2020)",
    boxShadow: "0 2px 10px rgba(176,48,48,.55), 0 0 0 2px rgba(176,48,48,.18), inset 0 1px 2px rgba(255,255,255,.2)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  sealText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "clamp(16px, 4vw, 22px)",
    color: "rgba(255,255,255,.93)", lineHeight: 1, marginTop: 1,
  },
  shadow: {
    height: 10,
    background: "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(43,33,24,.14), transparent)",
    marginTop: -3, borderRadius: "50%",
  },
};