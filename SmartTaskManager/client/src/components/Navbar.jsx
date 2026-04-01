import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="nav-logo">
          <Link to="/">SmartTask</Link>
        </div>
        <ul className="nav-links">
          {user ? (
            <>
              <li style={{ color: 'var(--text-secondary)' }}>Welcome, {user.name}</li>
              <li>
                <button onClick={onLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
