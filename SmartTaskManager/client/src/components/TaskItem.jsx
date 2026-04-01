import React from 'react';

const TaskItem = ({ task, onDelete }) => {
  return (
    <div className="task-card">
      <div style={{ paddingBottom: '3.5rem' }}>
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          {new Date(task.createdAt).toLocaleString()}
        </div>
      </div>
      
      <div className="task-actions" style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem' }}>
        <button 
          onClick={() => onDelete(task._id)} 
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
