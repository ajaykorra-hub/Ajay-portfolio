"use client";

import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export default function Hero() {
  return (
    <section className="hero">
      {/* Background */}
      <div className="hero-grid" />

      {/* Animated Glow */}
      <motion.div
        className="hero-glow hero-glow-one"
        animate={{
          x: [0, 35, 0],
          y: [0, -25, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="hero-glow hero-glow-two"
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main Content */}
      <div className="hero-content">

        {/* LEFT SIDE */}
        <div className="hero-text">

          <motion.div
            className="availability"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <span className="status-dot" />
            AVAILABLE FOR OPPORTUNITIES
          </motion.div>

          <motion.p
            className="hero-intro"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.15 }}
          >
            HELLO, I&apos;M
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.25 }}
          >
            AJAY
            <br />
            <span>NAYAK</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            I build practical software, explore AI, and turn ideas into
            products.
            <br />
            <strong>
              CSE (AI & ML) student focused on Java, backend development,
              AI/ML and modern web technologies.
            </strong>
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="hero-actions"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.55 }}
          >
            <a href="#work" className="primary-button">
              View My Work
              <span>↗</span>
            </a>

            <a href="#contact" className="secondary-button">
              Let&apos;s Connect
            </a>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            className="hero-stack"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7 }}
          >
            <span>JAVA</span>
            <i />
            <span>SPRING BOOT</span>
            <i />
            <span>NEXT.JS</span>
            <i />
            <span>AI / ML</span>
          </motion.div>

        </div>

        {/* RIGHT SIDE - PHOTO */}
        <motion.div
          className="hero-photo-wrapper"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.3,
            ease: "easeOut",
          }}
        >
          <div className="hero-photo-glow" />

          <div className="hero-image-wrapper">
  <img
    src="/Ajay_portfolio_profile.jpg"
    alt="Ajay Nayak"
    className="hero-profile-image"
  />
</div>
          {/* Decorative Elements */}
          <div className="photo-decoration photo-decoration-one" />
          <div className="photo-decoration photo-decoration-two" />
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.2,
          duration: 1,
          ease: "easeOut",
        }}
      >
        <span>SCROLL TO EXPLORE</span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  );
}