import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <div className="container">
        <Routes>
          <Route 
            path="/" 
            element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/register" 
            element={!user ? <Register setUser={setUser} /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
