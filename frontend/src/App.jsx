import { useState } from 'react';
import ChatRoom from './components/ChatRoom';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [usernameInput, setUsernameInput] = useState('');

  // Simple pseudo-login to identify the user
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!usernameInput.trim()) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }
      
      setCurrentUser(data); // Stores { _id, username }
    } catch (error) {
      console.error("Login failed", error);
      alert("Network error. Is the server running?");
    }
  };

  return (
    <div className="app-container">
      {!currentUser ? (
        <div className="glass-panel login-container">
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Enter your username to join the chat</p>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
            />
            <button type="submit">
              Join Chat
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
          </form>
        </div>
      ) : (
        <ChatRoom currentUser={currentUser} />
      )}
    </div>
  );
}

export default App;
