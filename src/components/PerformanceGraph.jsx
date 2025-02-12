import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, LinearScale, CategoryScale, BarElement, Tooltip, Legend } from 'chart.js';

// Register the required components
Chart.register(LinearScale, CategoryScale, BarElement, Tooltip, Legend);

const PerformanceGraph = ({ chartData, chartOptions }) => {
  return (
    <div className="mt-8 animate-slide-in">
      <h2 className="text-lg font-bold mb-4">Performance Analysis</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default PerformanceGraph;