import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sideImg from "../../assets/Screenshot_130.png";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How long is each time slot?",
      answer:
        "Every booking slot lasts exactly 15 minutes. This keeps scheduling organized and gives both teachers and students a predictable experience.",
      icon: "⏱️",
    },
    {
      question: "Can two slots overlap?",
      answer:
        "No. Our smart conflict checker automatically blocks overlapping schedules so teachers never get double-booked.",
      icon: "🚫",
    },
    {
      question: "Can students book past slots?",
      answer:
        "No. Only future available slots are visible to students. Past slots are automatically hidden for a cleaner experience.",
      icon: "📅",
    },
    {
      question: "What happens after booking?",
      answer:
        "The slot instantly changes to Booked status and disappears from the public list, preventing duplicate reservations.",
      icon: "✅",
    },
    {
      question: "Can teachers delete slots?",
      answer:
        "Yes, teachers can remove available slots anytime. Booked slots stay protected to preserve booking history.",
      icon: "🗑️",
    },
    {
      question: "Is there any slot limit?",
      answer:
        "No limits. Teachers can create as many slots as needed as long as they don’t overlap existing schedules.",
      icon: "∞",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section style={styles.section}>
      <div style={styles.glow1} />
      <div style={styles.glow2} />

      <div style={styles.container}>

        {/* ⭐ TOP PREMIUM BADGE (NEW) */}
        <div style={styles.topBadge}>
          ⚡ ClassSync Scheduler
        </div>

        {/* HEADER */}
        <div style={styles.header}>
          <h2 style={styles.title}>
            Frequently <span style={styles.gradient}>Asked</span>{" "}
            Questions
          </h2>
          <p style={styles.subtitle}>
            Everything you need to know about ClassSync scheduling system.
          </p>
        </div>

        {/* GRID */}
        <div style={styles.grid}>

 {/* RIGHT */}
          <div style={styles.right}>
            <div style={styles.imageWrap}>
              <img src={sideImg} alt="FAQ" style={styles.image} />
              <div style={styles.overlay} />

              <div style={styles.floatBadge1}>⚡ Instant Help</div>
              <div style={styles.floatBadge2}>🔒 Secure System</div>
              <div style={styles.floatBadge3}>📊 Smart Scheduling</div>
            </div>
          </div>

          {/* LEFT */}
          <div style={styles.left}>
            {faqs.map((faq, index) => {
              const active = openIndex === index;

              return (
                <motion.div
                  key={index}
                  layout
                  style={{
                    ...styles.card,
                    ...(active ? styles.cardActive : {}),
                  }}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    style={styles.questionBtn}
                  >
                    <div style={styles.qLeft}>
                      <span style={styles.icon}>{faq.icon}</span>
                      <span style={styles.question}>{faq.question}</span>
                    </div>

                    <span
                      style={{
                        ...styles.arrow,
                        transform: active ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      ▼
                    </span>
                  </button>

                  <AnimatePresence>
                    {active && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={styles.answerWrap}
                      >
                        <p style={styles.answer}>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

         
        </div>
      </div>
    </section>
  );
}

/* ================= UPDATED STYLES ================= */
const styles = {
  section: {
    position: "relative",
    padding: "120px 20px",
    background:
      "linear-gradient(135deg, #05070d 0%, #08141a 50%, #05070d 100%)",
    overflow: "hidden",
  },

  glow1: {
    position: "absolute",
    width: "600px",
    height: "600px",
    background: "rgba(0,212,170,0.08)",
    filter: "blur(140px)",
    top: "-150px",
    left: "-150px",
    borderRadius: "50%",
  },

  glow2: {
    position: "absolute",
    width: "600px",
    height: "600px",
    background: "rgba(236,72,153,0.06)",
    filter: "blur(140px)",
    bottom: "-150px",
    right: "-150px",
    borderRadius: "50%",
  },

  /* ⭐ WIDTH INCREASED */
  container: {
    maxWidth: "1280px", // 👈 WAS 1100px → NOW BIGGER
    margin: "0 auto",
    position: "relative",
    zIndex: 2,
  },

  /* ⭐ NEW TOP BADGE */
  topBadge: {
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "12px",
    letterSpacing: "3px",
    color: "#00d4aa",
    fontWeight: 700,
    padding: "10px 18px",
    display: "inline-block",
    background: "rgba(0,212,170,0.08)",
    border: "1px solid rgba(0,212,170,0.2)",
    borderRadius: "999px",
  },

  header: {
    textAlign: "center",
    marginBottom: "70px",
  },

  title: {
    fontSize: "52px", // slightly bigger
    fontWeight: 800,
    color: "#fff",
    margin: 0,
  },

  gradient: {
    background: "linear-gradient(135deg,#00d4aa,#00b4e6,#7c6df0)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtitle: {
    marginTop: "14px",
    color: "#8aaec2",
    fontSize: "16px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1.3fr 1fr", // slightly better ratio
    gap: "50px",
    alignItems: "stretch",
  },

  left: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  card: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "20px",
    overflow: "hidden",
  },

  cardActive: {
    border: "1px solid rgba(0,212,170,0.3)",
    boxShadow: "0 20px 60px rgba(0,212,170,0.08)",
  },

  questionBtn: {
    width: "100%",
    padding: "22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },

  qLeft: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },

  icon: {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    background: "rgba(0,212,170,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  question: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#eaf6ff",
  },

  arrow: {
    transition: "0.3s",
    color: "#00d4aa",
  },

  answerWrap: {
    padding: "0 22px 18px 74px",
  },

  answer: {
    color: "#8aaec2",
    fontSize: "14px",
    lineHeight: 1.7,
  },

  right: {
    position: "relative",
    height: "100%",
  },

  imageWrap: {
    position: "relative",
    borderRadius: "24px",
    overflow: "hidden",
    minHeight: "540px",
    height: "100%",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
  },

  floatBadge1: { position: "absolute", top: 20, left: 20, color: "#fff" },
  floatBadge2: { position: "absolute", bottom: 20, right: 20, color: "#00d4aa" },
  floatBadge3: { position: "absolute", bottom: 20, left: 20, color: "#fff" },
};

export default FAQ;