"use client";

import { motion } from "framer-motion";

const skills = [
  "JAVA",
  "SPRING BOOT",
  "PYTHON",
  "AI / ML",
  "NEXT.JS",
  "POSTGRESQL",
];

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-container">

        {/* Heading */}
        <motion.div
          className="about-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label">
            <span />
            ABOUT ME
          </div>

          <h2>
            More than
            <br />
            <span>just code.</span>
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="about-layout">

          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <p className="about-lead">
              I&apos;m Ajay Nayak, a CSE (AI & ML) student at
              Vidya Jyothi Institute of Technology who enjoys turning
              ideas into practical software.
            </p>

            <p>
              I&apos;m particularly interested in Java, backend development,
              AI/ML, web technologies and databases. I like understanding
              how things work, building them from scratch, and continuously
              exploring new technologies.
            </p>

            <p>
              Beyond coding, I&apos;ve had the opportunity to work in
              leadership and team coordination through student communities
              and real-world events. These experiences have helped me grow
              not only as a developer, but also as a communicator and
              problem solver.
            </p>
          </motion.div>

          {/* Info Card */}
          <motion.div
            className="about-card"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="about-card-top">
              <span>01</span>
              <span>PROFILE</span>
            </div>

            <div className="profile-mark">
              AN
            </div>

            <div className="profile-details">
              <div>
                <span>NAME</span>
                <strong>AJAY NAYAK</strong>
              </div>

              <div>
                <span>FIELD</span>
                <strong>CSE (AI & ML)</strong>
              </div>

              <div>
                <span>FOCUS</span>
                <strong>SOFTWARE + AI</strong>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Skills */}
        <motion.div
          className="about-skills"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="skills-label">CURRENT TOOLKIT</span>

          <div className="skills-list">
            {skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </motion.div>

        {/* Leadership */}
        <motion.div
          className="leadership-row"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <span>LEADERSHIP</span>
            <strong>ACM STUDENT CHAPTER — VJIT</strong>
          </div>

          <div>
            <span>COMMUNITY</span>
            <strong>STREET CAUSE — VJIT</strong>
          </div>
        </motion.div>

      </div>
    </section>
  );
}