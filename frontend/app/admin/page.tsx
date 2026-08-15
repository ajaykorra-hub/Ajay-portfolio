"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function AdminPage() {
  const router = useRouter();

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // FETCH CONTACT MESSAGES
  // =========================
  const fetchContacts = async () => {
    setLoading(true);
    setError("");

    try {
      const auth = sessionStorage.getItem("adminAuth");

      // No authentication → go back to login
      if (!auth) {
        router.push("/admin/login");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
        {
          method: "GET",
          headers: {
            Authorization: auth,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      // Authentication expired / invalid
      if (response.status === 401 || response.status === 403) {
        sessionStorage.removeItem("adminAuth");
        router.push("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }

      const data = await response.json();

      setContacts(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      setError("Unable to load messages.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE CONTACT
  // =========================
  const deleteContact = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) return;

    try {
      const auth = sessionStorage.getItem("adminAuth");

      if (!auth) {
        router.push("/admin/login");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: auth,
          },
        }
      );

      if (response.status === 401 || response.status === 403) {
        sessionStorage.removeItem("adminAuth");
        router.push("/admin/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to delete message");
      }

      // Remove deleted message immediately from UI
      setContacts((current) =>
        current.filter((contact) => contact.id !== id)
      );
    } catch (error) {
      console.error("Delete error:", error);
      setError("Unable to delete message.");
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    sessionStorage.removeItem("adminAuth");
    router.push("/admin/login");
  };

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {
    fetchContacts();
  }, []);

  // =========================
  // UI
  // =========================
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "#fff",
        padding: "70px 7%",
        boxSizing: "border-box",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "30px",
          marginBottom: "70px",
        }}
      >
        <div>
          <p
            style={{
              margin: "0 0 18px",
              color: "#777",
              fontSize: "12px",
              letterSpacing: "5px",
            }}
          >
            ADMIN PANEL
          </p>

          <h1
            style={{
              margin: 0,
              fontSize: "clamp(60px, 8vw, 110px)",
              lineHeight: "0.9",
              fontWeight: 700,
              letterSpacing: "-5px",
            }}
          >
            Messages
            <span style={{ color: "#777" }}>.</span>
          </h1>

          <p
            style={{
              marginTop: "28px",
              color: "#888",
              fontSize: "18px",
            }}
          >
            Manage messages received through your portfolio.
          </p>
        </div>

        {/* ACTION BUTTONS */}
        <div
          style={{
            display: "flex",
            gap: "14px",
            flexShrink: 0,
          }}
        >
          <button
            onClick={fetchContacts}
            disabled={loading}
            style={{
              border: "none",
              borderRadius: "40px",
              padding: "17px 30px",
              background: "#fff",
              color: "#000",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
              fontSize: "15px",
            }}
          >
            ↻ Refresh
          </button>

          <button
            onClick={logout}
            style={{
              border: "1px solid #333",
              borderRadius: "40px",
              padding: "17px 30px",
              background: "transparent",
              color: "#fff",
              fontWeight: 500,
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* STATISTICS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
          marginBottom: "60px",
        }}
      >
        <div
          style={{
            border: "1px solid #222",
            borderRadius: "20px",
            padding: "32px",
            background: "#090909",
          }}
        >
          <p
            style={{
              margin: "0 0 20px",
              color: "#777",
              fontSize: "14px",
              letterSpacing: "1px",
            }}
          >
            TOTAL MESSAGES
          </p>

          <h2
            style={{
              margin: 0,
              fontSize: "52px",
            }}
          >
            {contacts.length}
          </h2>
        </div>

        <div
          style={{
            border: "1px solid #222",
            borderRadius: "20px",
            padding: "32px",
            background: "#090909",
          }}
        >
          <p
            style={{
              margin: "0 0 20px",
              color: "#777",
              fontSize: "14px",
              letterSpacing: "1px",
            }}
          >
            DATABASE
          </p>

          <h2
            style={{
              margin: 0,
              fontSize: "30px",
            }}
          >
            PostgreSQL
          </h2>
        </div>

        <div
          style={{
            border: "1px solid #222",
            borderRadius: "20px",
            padding: "32px",
            background: "#090909",
          }}
        >
          <p
            style={{
              margin: "0 0 20px",
              color: "#777",
              fontSize: "14px",
              letterSpacing: "1px",
            }}
          >
            BACKEND
          </p>

          <h2
            style={{
              margin: 0,
              fontSize: "30px",
            }}
          >
            Spring Boot
          </h2>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div
          style={{
            border: "1px solid #642222",
            background: "#190707",
            color: "#ff7777",
            borderRadius: "16px",
            padding: "20px 24px",
            marginBottom: "30px",
          }}
        >
          {error}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div
          style={{
            border: "1px solid #222",
            borderRadius: "20px",
            padding: "60px",
            textAlign: "center",
            color: "#777",
          }}
        >
          Loading messages...
        </div>
      )}

      {/* NO MESSAGES */}
      {!loading && !error && contacts.length === 0 && (
        <div
          style={{
            border: "1px solid #222",
            borderRadius: "20px",
            padding: "80px 30px",
            textAlign: "center",
            color: "#777",
          }}
        >
          No messages yet.
        </div>
      )}

      {/* CONTACT MESSAGES */}
      {!loading && contacts.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          {contacts.map((contact, index) => (
            <article
              key={contact.id}
              style={{
                border: "1px solid #222",
                borderRadius: "20px",
                padding: "34px",
                background: "#090909",
              }}
            >
              {/* MESSAGE HEADER */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "20px",
                }}
              >
                <div>
                  <p
                    style={{
                      margin: "0 0 12px",
                      color: "#777",
                      fontSize: "12px",
                      letterSpacing: "3px",
                    }}
                  >
                    MESSAGE #{index + 1}
                  </p>

                  <h2
                    style={{
                      margin: "0 0 8px",
                      fontSize: "30px",
                    }}
                  >
                    {contact.name}
                  </h2>

                  <a
                    href={`mailto:${contact.email}`}
                    style={{
                      color: "#999",
                      textDecoration: "none",
                      fontSize: "16px",
                    }}
                  >
                    {contact.email}
                  </a>
                </div>

                {/* DELETE */}
                <button
                  onClick={() => deleteContact(contact.id)}
                  style={{
                    border: "1px solid #333",
                    background: "transparent",
                    color: "#fff",
                    padding: "12px 20px",
                    borderRadius: "12px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>

              {/* DIVIDER */}
              <div
                style={{
                  height: "1px",
                  background: "#222",
                  margin: "30px 0",
                }}
              />

              {/* SUBJECT */}
              <div style={{ marginBottom: "28px" }}>
                <p
                  style={{
                    margin: "0 0 10px",
                    color: "#777",
                    fontSize: "12px",
                    letterSpacing: "3px",
                  }}
                >
                  SUBJECT
                </p>

                <h3
                  style={{
                    margin: 0,
                    fontSize: "22px",
                    fontWeight: 500,
                  }}
                >
                  {contact.subject}
                </h3>
              </div>

              {/* MESSAGE */}
              <div>
                <p
                  style={{
                    margin: "0 0 10px",
                    color: "#777",
                    fontSize: "12px",
                    letterSpacing: "3px",
                  }}
                >
                  MESSAGE
                </p>

                <p
                  style={{
                    margin: 0,
                    color: "#aaa",
                    fontSize: "17px",
                    lineHeight: 1.7,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {contact.message}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}