import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = ({ setUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://task-manager-web-app-bge8.onrender.com/api/register', {
        name,
        email,
        password,
      });
      localStorage.setItem('user', JSON.stringify(response.data));
      setUser(response.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto' }}>
      <section className="text-center">
        <h1 className="page-title">Register</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Please create an account</p>
      </section>

      <section className="card">
        {error && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
              required
            />
          </div>
          <button type="submit" className="btn text-center text-white font-bold p-3 my-2 w-full mt-2">
            Submit
          </button>
        </form>
        <p className="text-center mt-2" style={{ color: 'var(--text-secondary)', marginTop: '1.5rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>Login</Link>
        </p>
      </section>
    </div>
  );
};

export default Register;
