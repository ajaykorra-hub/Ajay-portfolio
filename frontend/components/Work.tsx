"use client";

import { motion } from "framer-motion";

const projects = [
  {
    number: "01",
    title: "Hospital Bed Finder",
    description:
      "A real-time platform designed to help users find available hospital beds in nearby hospitals.",
    tags: ["Java", "Spring Boot", "PostgreSQL", "REST API"],
    type: "FULL STACK",
  },
  {
    number: "02",
    title: "Power Consumption Monitor",
    description:
      "An intelligent system that analyzes power consumption and provides recommendations for energy-efficient usage.",
    tags: ["Python", "Machine Learning", "Data Analysis"],
    type: "AI / ML",
  },
  {
    number: "03",
    title: "Traffic & Accident Detection",
    description:
      "A computer vision based system designed to detect traffic incidents and accidents in real time.",
    tags: ["Python", "YOLO", "OpenCV", "AI"],
    type: "COMPUTER VISION",
  },
];

export default function Work() {
  return (
    <section id="work" className="work-section">
      <div className="work-container">

        {/* Section Heading */}
        <motion.div
          className="work-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label">
            <span />
            SELECTED WORK
          </div>

          <h2>
            Things I&apos;ve
            <br />
            <span>built.</span>
          </h2>

          <p>
            A collection of projects where I&apos;ve explored software
            development, AI, machine learning and real-world problem solving.
          </p>
        </motion.div>

        {/* Projects */}
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.article
              key={project.number}
              className="project-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
              }}
            >
              {/* Project top */}
              <div className="project-top">
                <span className="project-number">
                  {project.number}
                </span>

                <span className="project-type">
                  {project.type}
                </span>
              </div>

              {/* Visual */}
              <div className="project-visual">
                <div className="visual-grid" />

                <div className="visual-content">
                  <span>{project.number}</span>
                </div>

                <div className="project-arrow">
                  ↗
                </div>
              </div>

              {/* Content */}
              <div className="project-content">
                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom */}
        <motion.div
          className="work-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span>MORE PROJECTS COMING SOON</span>

          <div className="footer-line" />
        </motion.div>

      </div>
    </section>
  );
}