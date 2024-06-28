import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import * as XLSX from 'xlsx';

const Admin = () => {
  const [complaints, setComplaints] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/complaints`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  useEffect(() => {
    const departmentCounts = {};
    complaints.forEach((complaint) => {
      departmentCounts[complaint.department] = (departmentCounts[complaint.department] || 0) + 1;
    });

    const data = Object.keys(departmentCounts).map((department) => ({
      name: department,
      value: departmentCounts[department],
    }));

    setChartData(data);
  }, [complaints]);

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(complaints);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Complaints');
    XLSX.writeFile(wb, 'complaints.xlsx');
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {chartData.length > 0 && (
        <>
          <PieChart width={400} height={400}>
            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8884d8' : '#82ca9d'} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <BarChart width={600} height={300} data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </>
      )}
      <button onClick={handleExport}>Export to Excel</button>
    </div>
  );
};

export default Admin;
