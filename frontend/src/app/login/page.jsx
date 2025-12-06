import { useState } from "react";
import "./Login.css";

const API_BASE_URL = "http://localhost:8000";

function LoginPage({ goToRegister, onLoginSuccess }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    if (!form.email || !form.password) {
      setErrorMsg("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Login failed");
      }

      // Notify parent of successful login
      onLoginSuccess(data.access_token);

    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-left">
          <h1 className="signup-title">Sign In</h1>
          <p className="signup-subtitle">Welcome back 👋</p>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="input-group">
              <span className="input-icon">📧</span>
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {errorMsg && (
              <div className="status-message status-error">{errorMsg}</div>
            )}

            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? "Signing in..." : "SIGN IN"}
            </button>

            <p className="signup-text">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                className="link-button"
                onClick={goToRegister}
              >
                Create account
              </button>
            </p>
          </form>
        </div>

        <div className="signup-right">
          <h2>Welcome to StudyMate</h2>
          <p>
            Log in to access your subjects, study tasks and personalised
            dashboard. Let&apos;s keep learning. ✨
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
