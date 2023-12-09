import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:8000/api/register/', { username, email, password });
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error.response.data);
    }
  };

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/employees/');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
      <div className="app-container">
        <h1>Employee Registration</h1>
        <form className="registration-form">
          <div className="form-group">
            <label>Username:</label>
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="button" onClick={handleRegister}>Register</button>
        </form>

        <h2>Employee List</h2>
        <ul>
          {employees.map((employee) => (
              <li key={employee.id}>{employee.username} - {employee.email}</li>
          ))}
        </ul>
      </div>
  );
};

export default App;
