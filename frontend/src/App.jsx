import { useEffect, useState } from "react";
import RegisterPage from "./app/register/page";
import LoginPage from "./app/login/page";
import "./App.css";

const API_BASE_URL = "http://localhost:8000";

// Top-level app: choose which page to show
function App() {
  const [currentPage, setCurrentPage] = useState("register");

  if (currentPage === "register") {
    return (
      <RegisterPage 
        goToLogin={() => setCurrentPage("login")} 
      />
    );
  }

  if (currentPage === "login") {
    return (
      <LoginPage 
        goToRegister={() => setCurrentPage("register")} 
      />
    );
  }

  return null; // fallback (not used now)
}

// Your old subjects UI moved here
function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({ name: "", description: "" });

  const [editingSubjectName, setEditingSubjectName] = useState(null);
  const [editedSubject, setEditedSubject] = useState({
    name: "",
    description: "",
  });

  async function fetchSubjects() {
    try {
      const response = await fetch(`${API_BASE_URL}/subjects`);
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  }

  useEffect(() => {
    fetchSubjects();
  }, []);

  async function handleAddSubject(e) {
    e.preventDefault();

    await fetch(`${API_BASE_URL}/subjects/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSubject),
    });

    setNewSubject({ name: "", description: "" });
    fetchSubjects();
  }

  function startEditing(name) {
    setEditingSubjectName(name);
    const subject = subjects.find((subj) => subj.name === name);
    if (subject) {
      setEditedSubject({
        name: subject.name,
        description: subject.description,
      });
    }
  }

  async function handleUpdateSubject(e, originalName) {
    e.preventDefault();
    await fetch(`${API_BASE_URL}/subjects/${originalName}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedSubject),
    });

    setEditingSubjectName(null);
    setEditedSubject({ name: "", description: "" });
    fetchSubjects();
  }

  async function handleDeleteSubject(name) {
    const ok = window.confirm(
      `Are you sure you want to delete the subject "${name}"?`
    );
    if (!ok) return;

    await fetch(`${API_BASE_URL}/subjects/${name}`, {
      method: "DELETE",
    });

    fetchSubjects();
  }

  return (
    <div className="App">
      <h1>StudyMate</h1>

      {/* Add new subject */}
      <form onSubmit={handleAddSubject}>
        <input
          type="text"
          placeholder="Subject Name"
          value={newSubject.name}
          onChange={(e) =>
            setNewSubject({ ...newSubject, name: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="Description"
          value={newSubject.description}
          onChange={(e) =>
            setNewSubject({ ...newSubject, description: e.target.value })
          }
          style={{ display: "block", marginBottom: "0.5rem", width: "100%" }}
        />
        <button type="submit">Add Subject</button>
      </form>

      {/* List of subjects */}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {subjects.map((subject) => (
          <li
            key={subject.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem",
              borderRadius: "5px",
            }}
          >
            {editingSubjectName === subject.name ? (
              // Edit mode
              <form
                onSubmit={(e) => handleUpdateSubject(e, subject.name)}
                style={{ marginBottom: "0.5rem" }}
              >
                <input
                  type="text"
                  value={editedSubject.name}
                  onChange={(e) =>
                    setEditedSubject({
                      ...editedSubject,
                      name: e.target.value,
                    })
                  }
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    width: "100%",
                  }}
                  required
                />
                <input
                  type="text"
                  value={editedSubject.description}
                  onChange={(e) =>
                    setEditedSubject({
                      ...editedSubject,
                      description: e.target.value,
                    })
                  }
                  style={{
                    display: "block",
                    marginBottom: "0.5rem",
                    width: "100%",
                  }}
                />
                <button type="submit" style={{ marginRight: "0.5rem" }}>
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingSubjectName(null)}
                >
                  Cancel
                </button>
              </form>
            ) : (
              // Display mode
              <>
                <h2>{subject.name}</h2>
                <p>{subject.description}</p>
                <button
                  onClick={() => startEditing(subject.name)}
                  style={{ marginRight: "0.5rem" }}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteSubject(subject.name)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      <h2>All Subjects</h2>
      <ul>
        {subjects.map((subject) => (
          <li key={subject.id}>
            <h2>{subject.name}</h2>
            <p>{subject.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
