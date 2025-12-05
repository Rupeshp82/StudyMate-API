import { useState } from "react";
import "./Register.css";

const API_BASE_URL = "http://localhost:8000";

function RegisterPage({ goToLogin }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    agreed: false,
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    // Debug to see what name/value are
    console.log("CHANGE:", name, value, type, checked);

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!form.agreed) {
      setErrorMsg("Please agree to the Terms & Conditions.");
      return;
    }

    if (!form.name || !form.email || !form.password) {
      setErrorMsg("All fields are required.");
      return;
    }

    if (form.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.name,   // backend expects "username"
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Registration failed");
      }

      setSuccessMsg("Account created successfully!");
      setForm({
        name: "",
        email: "",
        password: "",
        agreed: false,
      });
    } catch (error) {
      console.error("Register error:", error);
      setErrorMsg(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-card">
        {/* LEFT SIDE */}
        <div className="signup-left">
          <h1 className="signup-title">Sign Up</h1>
          <p className="signup-subtitle">Hello, friend!</p>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="input-group">
              <span className="input-icon">👤</span>
              <input
                type="text"
                name="name"                // MUST match form.name
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <span className="input-icon">📧</span>
              <input
                type="email"
                name="email"              // MUST match form.email
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
                name="password"           // MUST match form.password
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

              <p className="signin-text">
                Already have an account?{" "}
                <button
                  type="button"
                  className="link-button"
                  onClick={goToLogin}
                >
                  Sign in
                </button>
              </p>

            <label className="checkbox-row">
              <input
                type="checkbox"
                name="agreed"            // MUST match form.agreed
                checked={form.agreed}
                onChange={handleChange}
              />
              <span>
                I&apos;ve read and agree to the Terms &amp; Conditions.
              </span>
            </label>

            {errorMsg && (
              <div className="status-message status-error">{errorMsg}</div>
            )}
            {successMsg && (
              <div className="status-message status-success">{successMsg}</div>
            )}

            <button type="submit" className="primary-btn" disabled={loading}>
              {loading ? "Creating..." : "CREATE ACCOUNT"}
            </button>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="signup-right">
          <h2>Glad to see You!</h2>
          <p>
            StudyMate helps you organise your subjects, tasks and deadlines in
            one place. Stay focused and keep learning every day. ✨
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
