import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SalesGraph = ({ salesData }) => {
  const data = salesData.map((value, index) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index],
    sales: value,
  }));

  return (
    <BarChart width={400} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" style={{color:'black'}} />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="sales" fill="black" />
    </BarChart>
  );
};

export default SalesGraph;
