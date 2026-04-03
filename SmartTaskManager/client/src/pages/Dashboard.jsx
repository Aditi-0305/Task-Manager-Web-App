import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from '../components/TaskItem';

const Dashboard = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [taskForm, setTaskForm] = useState({ title: '', description: '' });
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.get('http://localhost:5000/api/tasks', config);
      setTasks(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const onChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!taskForm.title) {
      setError('Please enter a title');
      return;
    }
    setError('');
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.post('https://task-manager-web-app-bge8.onrender.com/api/tasks');
      setTasks([...tasks, response.data]);
      setTaskForm({ title: '', description: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Error occurred');
    }
  };

  const deleteBtn = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, config);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <section className="text-center">
        <h1 className="page-title">Dashboard</h1>
      </section>

      <section className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)', fontSize: '1.25rem' }}>Create New Task</h2>
        {error && <div style={{ color: 'var(--danger-color)', marginBottom: '1rem' }}>{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="title">Task Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={taskForm.title}
              onChange={onChange}
              className="form-control"
              placeholder="e.g. Finish homework"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Task Description</label>
            <input
              type="text"
              name="description"
              id="description"
              value={taskForm.description}
              onChange={onChange}
              className="form-control"
              placeholder="e.g. Math and Science assignments"
            />
          </div>
          <button type="submit" className="btn">Add Task</button>
        </form>
      </section>

      <section>
        {tasks.length > 0 ? (
          <div className="task-grid">
            {tasks.map((task) => (
              <TaskItem key={task._id} task={task} onDelete={deleteBtn} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No tasks yet</h3>
            <p>Create one above to get started!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
