import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [nature, setNature] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('department', department);
    formData.append('nature', nature);
    formData.append('image', image);
    await axios.post(`${process.env.REACT_APP_API_URL}/complaints`, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="Department" required />
      <input type="text" value={nature} onChange={(e) => setNature(e.target.value)} placeholder="Nature" required />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
      <button type="submit">Submit Complaint</button>
    </form>
  );
};

export default Dashboard;
