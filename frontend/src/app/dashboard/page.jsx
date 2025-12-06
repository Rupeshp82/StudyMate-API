import "./Dashboard.css";

function DashboardPage({ onLogout }) {
  const token = localStorage.getItem("studymate_token");

  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        <h1>StudyMate Dashboard</h1>
        {token ? (
          <p>You are logged in. Your token is stored safely.</p>
        ) : (
          <p>No token found. Please log in again.</p>
        )}

        <button className="logout-btn" onClick={onLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default DashboardPage;
