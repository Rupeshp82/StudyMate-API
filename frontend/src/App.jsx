import { useState, useEffect } from "react";
import RegisterPage from "./app/register/page";
import LoginPage from "./app/login/page";
import DashboardPage from "./app/dashboard/page";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("loading"); // NEW
  const [token, setToken] = useState(null);

  // Auto login on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("studymate_token");
    if (savedToken) {
      setToken(savedToken);
      setCurrentPage("dashboard");
    } else {
      setCurrentPage("login");
    }
  }, []);

  function handleLoginSuccess(accessToken) {
    localStorage.setItem("studymate_token", accessToken);
    setToken(accessToken);
    setCurrentPage("dashboard");
  }

  function handleLogout() {
    localStorage.removeItem("studymate_token");
    setToken(null);
    setCurrentPage("login");
  }

  // simple loader
  if (currentPage === "loading") {
    return <div style={{ padding: "2rem" }}>Loading...</div>;
  }

  if (currentPage === "register") {
    return (
      <RegisterPage goToLogin={() => setCurrentPage("login")} />
    );
  }

  if (currentPage === "login") {
    return (
      <LoginPage
        goToRegister={() => setCurrentPage("register")}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  if (currentPage === "dashboard") {
    return <DashboardPage onLogout={handleLogout} />;
  }

  return null;
}

export default App;
