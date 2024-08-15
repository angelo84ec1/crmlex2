// src/SimpleBarChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, LabelList } from 'recharts';

const data = [
  { name: 'Revision', Cliente: 50, Tareas: 20, Subtareas: 40, color1: '#8E2DE2', color2: '#D9BB41', color3: '#4C02E0' }, 
  { name: 'Curso', Cliente: 30, Tareas: 25, Subtareas: 35, color1: '#8E2DE2', color2: '#D9BB41', color3: '#4C02E0' }, // Blue, Red, Green
  { name: 'Completdo', Cliente: 5, Tareas: 1, Subtareas: 2, color1: '#8E2DE2', color2: '#D9BB41', color3: '#4C02E0' }, // Green, Gold, Slate Blue
  { name: 'Nuevo', Cliente: 35, Tareas: 45, Subtareas: 20, color1: '#8E2DE2', color2: '#D9BB41', color3: '#4C02E0' }, // Gold, Slate Blue, Red
  { name: 'Atrasado', Cliente: 40, Tareas: 35, Subtareas: 45, color1: '#8E2DE2', color2: '#D9BB41', color3: '#4C02E0' }, // Slate Blue, Red, Blue
];

const SimpleBarChart = () => {
  return (
    <div className="box-shadow mt-4 mb-5" style={{ borderRadius: '20px' }}>
      <div
        className='pt-3 px-4 text-white'
        style={{ 
          background: 'linear-gradient(to right, #4C02E0, #8E2DE2)',
          borderRadius: '20px 20px 0 0',
          borderBottom: '4px solid white'
        }}
      >
        <h2>Tareas</h2>
      </div>
      <div
        className='py-4 d-flex justify-content-center'
        style={{ 
          background: 'linear-gradient(to right, #4C02E0, #8E2DE2)',
          borderRadius: '0 0 20px 20px'
        }}
      >
        <BarChart width={800} height={300} data={data} className='bg-white py-4'>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Cliente" barSize={20} fill="#FF6347">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color1} />
            ))}
          </Bar>
          <Bar dataKey="Tareas" barSize={20} fill="#4682B4">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color2} />
            ))}
          </Bar>
          <Bar dataKey="Subtareas" barSize={20} fill="#32CD32">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color3} />
            ))}
          </Bar>
        </BarChart>
      </div>
    </div>
  );
};

export default SimpleBarChart;
