import { useState } from "react";
import "./Register.css";

function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    agreed: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.agreed) {
      alert("Please agree to the Terms & Conditions.");
      return;
    }
    console.log("Register form:", form);
    alert("Sign up clicked! (We’ll connect backend later)");
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
                name="name"
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

            <label className="checkbox-row">
              <input
                type="checkbox"
                name="agreed"
                checked={form.agreed}
                onChange={handleChange}
              />
              <span>
                I&apos;ve read and agree to{" "}
                <button
                  type="button"
                  className="link-button"
                  onClick={() => alert("Terms modal later")}
                >
                  Terms &amp; Conditions
                </button>
              </span>
            </label>

            <button type="submit" className="primary-btn">
              CREATE ACCOUNT
            </button>

            <p className="signin-text">
              Already have an account?{" "}
              <button
                type="button"
                className="link-button"
                onClick={() => alert("Switch to Sign In later")}
              >
                Sign in
              </button>
            </p>
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
