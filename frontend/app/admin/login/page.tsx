"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const cleanUsername = username.trim();

      if (!cleanUsername || !password) {
        setError("Please enter username and password.");
        return;
      }

      const credentials = btoa(`${cleanUsername}:${password}`);

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "GET",
        headers: {
          Authorization: `Basic ${credentials}`,
          Accept: "application/json",
        },
        cache: "no-store",
      });

      if (response.status === 401) {
        setError("Invalid username or password.");
        return;
      }

      if (response.status === 403) {
        setError("You do not have administrator access.");
        return;
      }

      if (!response.ok) {
        setError(`Login failed. Server returned ${response.status}.`);
        return;
      }

      // Store authentication for this browser session
      sessionStorage.setItem("adminAuth", `Basic ${credentials}`);

      router.replace("/admin");
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#050505",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          border: "1px solid #222",
          borderRadius: "20px",
          padding: "40px",
          background: "#0b0b0b",
        }}
      >
        <p
          style={{
            color: "#777",
            letterSpacing: "4px",
            fontSize: "11px",
          }}
        >
          PRIVATE AREA
        </p>

        <h1
          style={{
            fontSize: "42px",
            margin: "15px 0 10px",
          }}
        >
          Admin<span style={{ color: "#777" }}>.</span>
        </h1>

        <p
          style={{
            color: "#888",
            marginBottom: "35px",
          }}
        >
          Sign in to manage portfolio messages.
        </p>

        <form onSubmit={handleLogin}>
          <label
            style={{
              display: "block",
              color: "#777",
              fontSize: "11px",
              letterSpacing: "2px",
              marginBottom: "10px",
            }}
          >
            USERNAME
          </label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            autoComplete="username"
            required
            style={{
              width: "100%",
              boxSizing: "border-box",
              background: "#111",
              border: "1px solid #292929",
              color: "#fff",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "22px",
              outline: "none",
            }}
          />

          <label
            style={{
              display: "block",
              color: "#777",
              fontSize: "11px",
              letterSpacing: "2px",
              marginBottom: "10px",
            }}
          >
            PASSWORD
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            autoComplete="current-password"
            required
            style={{
              width: "100%",
              boxSizing: "border-box",
              background: "#111",
              border: "1px solid #292929",
              color: "#fff",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "25px",
              outline: "none",
            }}
          />

          {error && (
            <p
              style={{
                color: "#ff7777",
                fontSize: "14px",
                marginBottom: "20px",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              border: "none",
              borderRadius: "30px",
              padding: "15px",
              background: "#fff",
              color: "#000",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Signing in..." : "Sign In ↗"}
          </button>
        </form>
      </div>
    </main>
  );
}