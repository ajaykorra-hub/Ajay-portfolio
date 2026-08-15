"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [id]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setStatus("sending");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("success");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">

        {/* Heading */}
        <motion.div
          className="contact-heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="section-label">
            <span />
            GET IN TOUCH
          </div>

          <h2>
            Let&apos;s build
            <br />
            <span>something.</span>
          </h2>

          <p>
            Have an idea, opportunity, or just want to connect?
            I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="contact-layout">

          {/* Contact information */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div className="contact-item">
              <span>EMAIL</span>

              <a href="mailto:ajaykorra06@gmail.com">
                ajaykorra06@gmail.com
              </a>
            </div>

            <div className="contact-item">
              <span>LINKEDIN</span>

              <a
                href="https://www.linkedin.com/in/ajay-nayak-korra"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>

            <div className="contact-item">
              <span>GITHUB</span>

              <a
                href="https://github.com/ajaykorra-hub"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
            </div>

            <div className="contact-item">
              <span>LOCATION</span>

              <strong>HYDERABAD, INDIA</strong>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >

            <div className="form-row">

              <div className="form-group">
                <label htmlFor="name">NAME</label>

                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">EMAIL</label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <div className="form-group">
              <label htmlFor="subject">SUBJECT</label>

              <input
                id="subject"
                type="text"
                placeholder="What would you like to talk about?"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">MESSAGE</label>

              <textarea
                id="message"
                rows={6}
                placeholder="Tell me about it..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="contact-submit"
              disabled={status === "sending"}
            >
              {status === "sending"
                ? "Sending..."
                : status === "success"
                ? "Message Sent ✓"
                : "Send Message"}

              <span>↗</span>
            </button>

            {status === "success" && (
              <p className="form-success">
                Thanks! Your message has been received.
              </p>
            )}

            {status === "error" && (
              <p className="form-error">
                Something went wrong. Please try again.
              </p>
            )}

          </motion.form>
        </div>
      </div>
    </section>
  );
}