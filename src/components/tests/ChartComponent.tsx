import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement);

const ChartComponent: React.FC<{ data: any[] }> = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [{
      label: 'Prix',
      data: data.map((d) => d.kpis.price),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
    }],
  };

  return <Bar data={chartData} />;
};

export default ChartComponent;